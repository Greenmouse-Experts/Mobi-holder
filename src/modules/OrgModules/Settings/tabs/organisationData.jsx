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

export default function OrganisationData() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUpload, handleSubmit: handleSubmitUpload, formState: { errors: errorsUpload } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
    const [files, setFiles] = useState([]);
    const [documentSelected, setSelectedDocument] = useState(null);
    const [customError, setCustomError] = useState(false);
    const dispatch = useDispatch();
    let user = useSelector((state) => state.orgData.orgData);
    const { mutate } = useApiMutation();
    const [payload, setPayload] = useState({ natureOfOrganization: user.natureOfOrganization });
    const [errorAccess, setErrorAccess] = useState(false);

    let userCopy = { ...user };
    if (typeof userCopy.companyAddress === "string") {
        const companyAddress = JSON.parse(userCopy.companyAddress);
        userCopy.companyAddress = companyAddress;
    }
    user = userCopy;

    const documentOptions = [
        {
            name: 'NIN'
        },
        {
            name: 'Drivers Licence'
        }
    ];


    useEffect(() => {
        getUploadedIDCards()
    }, []);


    const handleSelectedDocument = (data) => {
        setSelectedDocument(data)
    }

    const handleDrop = (data) => {
        setFiles((prevFiles) => [...prevFiles, data]);
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
                front: files[0],
                back: files[1],
                ...data
            }
            mutate({
                url: "/api/users/business-document",
                method: "POST",
                data: payload,
                headers: true,
                onSuccess: (response) => {
                    setIsLoadingDocuments(false)
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
                console.log(response.data)
            },
            onError: () => {
            }
        });
    }



    const handleAccessType = (data) => {
        setPayload(() => ({
            natureOfOrganization: data,
        }));
    }


    return (
        <>
            <form onSubmit={handleSubmit(changeProfile)}>
                <div className="mb-1 flex flex-col gap-5 mt-5">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Company Name
                        </p>
                        <Input type="text" value={user.companyName} name="companyName" register={register}
                            rules={{ required: 'Company Name is required' }} errors={errors} placeholder="Company Name" />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Phone Number
                            </p>
                            <Input type="text" value={user.phoneNumber} name="phoneNumber" register={register}
                                rules={{ required: 'Phone Number is required' }} errors={errors} placeholder="Phone Number" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Email
                            </p>
                            <Input type="text" name="companyEmail" value={user.companyEmail} register={register}
                                rules={{ required: 'Company Email is required' }} errors={errors} placeholder="Email" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Company Address
                            </p>
                            <Input type="text" name="address" value={user.companyAddress.street} register={register}
                                rules={{ required: 'Company Address is required' }} errors={errors} placeholder="Enter your address" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex md:w-1/2 flex-col gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Country
                            </p>
                            <Input icon="human.svg" type="text" value={user.companyAddress.country} name="country" register={register}
                                rules={{ required: 'Country is required' }} errors={errors} placeholder="Choose your country" />
                        </div>

                        <div className="flex md:w-1/2 flex-col gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                State
                            </p>
                            <Input icon="human.svg" type="text" name="state" value={user.companyAddress.state} register={register}
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
                                <SelectField options={documentOptions} label="Document" errors={customError} selectedOption={handleSelectedDocument} />
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Card/Document Number
                            </p>
                            <Input type="text" name="cardNumber" register={registerUpload} errors={errorsUpload} rules={{ required: 'Document Number is required' }} placeholder="Enter card Number" />
                        </div>


                        <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Issue Date
                                </p>
                                <Input name="issueDate" register={registerUpload} errors={errorsUpload} rules={{ required: 'Issue Date is required' }} type="date" placeholder="Choose the issue date" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Expiry Date
                                </p>
                                <Input name="expiryDate" register={registerUpload} errors={errorsUpload} rules={{ required: 'Expiry Date is required' }} type="date" placeholder="Choose the expiry date" />
                            </div>
                        </div>


                        <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-col md:w-1/2 w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Upload Documents
                                </p>
                                <DropZone onUpload={handleDrop} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {files.map((fileObj, index) => (
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