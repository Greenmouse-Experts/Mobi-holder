import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DropZone from "../../../../components/DropZone";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useEffect, useRef, useState } from "react";
import SelectField from "../../../../components/SelectField";
import { toast } from "react-toastify";
import MultipleSelect from "../../../../components/MultipleSelect";
import { setOrg } from "../../../../reducers/organisationSlice";
import Loader from "../../../../components/Loader";
import useFileUpload from "../../../../api/hooks/useFileUpload";

export default function OrganisationData() {
    let user = useSelector((state) => state.orgData.orgData);

    const { register, handleSubmit, setValue, watch, formState: { errors } } =
        useForm({
            defaultValues: {
                companyName: user.companyName,
                phoneNumber: user.phoneNumber,
                companyEmail: user.companyEmail,
                address: typeof user.companyAddress === "string" ? JSON.parse(user.companyAddress).street : user.companyAddress.street,
                country: typeof user.companyAddress === "string" ? JSON.parse(user.companyAddress).country : user.companyAddress.country,
                state: typeof user.companyAddress === "string" ? JSON.parse(user.companyAddress).state : user.companyAddress.state,
            },
        });
    const { register: registerUpload, setValue: setValueUpload, handleSubmit: handleSubmitUpload, formState: { errors: errorsUpload } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const { uploadFiles, isLoadingUpload } = useFileUpload();
    const [pageLoader, setLoader] = useState(true);
    const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
    const [files, setFiles] = useState([]);
    const [documentSelected, setSelectedDocument] = useState(null);
    const [customError, setCustomError] = useState(false);
    const dispatch = useDispatch();
    const { mutate } = useApiMutation();
    const [payload, setPayload] = useState({ natureOfOrganization: user.natureOfOrganization });
    const [errorAccess, setErrorAccess] = useState(false);
    const [uploadedIDData, setUploadedIDData] = useState(null);


    let userCopy = { ...user };
    if (typeof userCopy.companyAddress === "string") {
        const companyAddress = JSON.parse(userCopy.companyAddress);
        userCopy.companyAddress = companyAddress;
    }
    user = userCopy;

    const documentOptions = [
        {
            name: 'Company Registration Document'
        },
    ];


    useEffect(() => {
        getUploadedIDCards()
    }, []);


    const handleSelectedDocument = (data) => {
        setSelectedDocument(data)
    }

    const handleDrop = (data) => {
        setFiles((prevFiles) => [data]);
    }


    const changeProfile = (data) => {
        const { natureOfOrganization, companyAddress, companyName, companyEmail, phoneNumber, ...rest } = user;
        const payloadData = {
            ...rest,
            companyAddress: {
                country: data.country,
                state: data.state,
                street: data.address
            },
            companyName: data.companyName,
            companyEmail: data.companyEmail,
            phoneNumber: data.phoneNumber,
            natureOfOrganization: payload?.natureOfOrganization
        }

        setIsLoading(true)
        mutate({
            url: "/api/users/profile/update/organization",
            method: "PUT",
            data: payloadData,
            headers: true,
            onSuccess: (response) => {
                dispatch(setOrg(response.data.data));
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        });
    };


    const updateDocuments = (data) => {
        if (files.length > 0) {
            if (!documentSelected) {
                setCustomError(true);
                return;
            }
            setIsLoadingDocuments(true);
            const payload = {
                name: documentSelected,
                documentUrl: files[0],
                ...data
            }
            mutate({
                url: "/api/users/business-document",
                method: "POST",
                data: payload,
                headers: true,
                onSuccess: (response) => {
                    setIsLoadingDocuments(false);
                    getUploadedIDCards();
                },
                onError: () => {
                    setIsLoadingDocuments(false);
                }
            });
        }
        else {
            toast.error('No file(s) selected')
        }
    }

    const getUploadedIDCards = () => {
        mutate({
            url: "/api/users/get/business-document",
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const data = response.data.data;
                if (data) {
                    setUploadedIDData(data);
                    setSelectedDocument(uploadedIDData.name)
                    setFiles([data.documentUrl]);
                    setLoader(false)
                }
                else {
                    setLoader(false)
                }
            },
            onError: () => {
                setLoader(false)
            }
        });
    }



    const handleAccessType = (data) => {
        setPayload(() => ({
            natureOfOrganization: data,
        }));
    }





    const handleButtonClick = () => {
        // Simulate a click on the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            await uploadFiles(files, (uploadedUrl) => {
                changeProfilePhoto(uploadedUrl)
            });
        }
    };



    const changeProfilePhoto = (uploadedUrl) => {
        const payload = {
            photo: uploadedUrl
        };
        mutate({
            url: "/api/users/profile/photo/upload",
            method: "PUT",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                dispatch(setOrg(response.data.data));
            },
        });
    }









    if (pageLoader) {
        return (
            <>
                <div className="w-full h-full">
                    <Loader size={20} />
                </div>
            </>
        )
    }



    return (
        <>
            <form onSubmit={handleSubmit(changeProfile)}>
                <div className="mb-1 flex flex-col gap-5">
                    <div className="w-full flex justify-end items-center">
                        <Button disabled className={uploadedIDData ? uploadedIDData.isVerified ? 'bg-green-500' : 'bg-yellow-500 text-black' : 'bg-red-500'}>
                            {uploadedIDData ? uploadedIDData.isVerified ? 'Verified' : 'Verification is under review' : 'Unverified'}
                        </Button>
                    </div>

                    <div className="flex md:flex-row flex-col gap-3">
                        {user.photo ?
                            <div className="flex w-32 h-32">
                                <img src={`${user.photo}`} className="w-full h-full object-cover rounded-full" />
                            </div>
                            :
                            <AvatarInitials name={`${user.companyName}`} size="32" />
                        }
                        <div className="flex flex-col justify-center md:mx-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                multiple
                            />
                            <Button className="bg-transparent px-7 rounded-full chartColor border-[0.5px] border-gray-700"
                                onClick={handleButtonClick}
                                disabled={isLoadingUpload}
                            >
                                {isLoadingUpload ? 'Changing Picture' : 'Change Picture'}
                            </Button>
                        </div>
                    </div>


                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Company Name
                        </p>
                        <Input type="text" name="companyName" register={register}
                            watch={watch}
                            setValue={setValue}
                            rules={{ required: 'Company Name is required' }} errors={errors} placeholder="Company Name" />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Phone Number
                            </p>
                            <Input type="text"
                                watch={watch}
                                setValue={setValue}
                                name="phoneNumber" register={register}
                                rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Phone Number" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Email
                            </p>
                            <Input type="text" name="companyEmail"
                                watch={watch}
                                setValue={setValue}
                                register={register}
                                rules={{ required: 'Company Email is required' }} errors={errors} placeholder="Email" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Address
                            </p>
                            <Input type="text" name="address"
                                watch={watch}
                                setValue={setValue}
                                register={register}
                                rules={{ required: 'Company Address is required' }} errors={errors} placeholder="Enter your address" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex md:w-1/2 flex-col gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Country
                            </p>
                            <Input icon="human.svg" type="text"
                                watch={watch}
                                setValue={setValue}
                                name="country" register={register}
                                rules={{ required: 'Country is required' }} errors={errors} placeholder="Choose your country" />
                        </div>

                        <div className="flex md:w-1/2 flex-col gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                State
                            </p>
                            <Input icon="human.svg" type="text" name="state"
                                watch={watch}
                                setValue={setValue} register={register}
                                rules={{ required: 'State is required' }} errors={errors} placeholder="Choose your state" />
                        </div>
                    </div>


                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Access Type
                        </p>
                        <MultipleSelect accessType={handleAccessType} selectedData={user.natureOfOrganization} />
                        {errorAccess &&
                            <p className="-mt-3" style={{ color: 'red' }}>
                                Select Organisation Access Type
                            </p>
                        }
                    </div>

                    <div className="flex">
                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            {isLoading ? 'Updating...' : 'Update Info'}
                        </Button>
                    </div>
                </div>
            </form>


            <form onSubmit={handleSubmitUpload(updateDocuments)}>
                <div className="mb-1 flex flex-col gap-5 mt-6">
                    <p className="mt-6 text-mobiFormGray">Verification Documents</p>

                    <div className="w-full flex flex-col gap-8 border-2 rounded-xl border-gray-900 border-dashed p-8">

                        <div className="w-full flex flex-col gap-6">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Select Card/Document to Upload
                                </p>
                                <SelectField value={uploadedIDData?.name} options={documentOptions} label="Document" errors={customError} selectedOption={handleSelectedDocument} />
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Card/Document Number
                            </p>
                            <Input type="text" name="registrationNumber"
                                value={uploadedIDData?.registrationNumber} register={registerUpload} errors={errorsUpload} rules={{ required: 'Document Number is required' }} placeholder="Enter card Number" />
                        </div>


                        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Company Registration Date
                                </p>
                                <Input name="registrationDate" value={uploadedIDData?.registrationDate} register={registerUpload} errors={errorsUpload} rules={{ required: 'Issue Date is required' }} type="date" placeholder="Choose the issue date" />
                            </div>
                        </div>


                        <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Upload Company Registration Document(s)
                                </p>
                                <DropZone onUpload={handleDrop} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {(files.length > 0 ? files : (uploadedIDData?.documentUrl ? [uploadedIDData.documentUrl] : [])).map((fileObj, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={fileObj}
                                            alt="preview"
                                            className="w-full h-24 object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <Button type="submit" disabled={isLoadingDocuments} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                            {isLoadingDocuments ? 'Updating...' : 'Update Documents'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}