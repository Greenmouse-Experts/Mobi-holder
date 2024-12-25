import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DropZone from "../../../../components/DropZone";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { setUser } from "../../../../reducers/userSlice";
import { useEffect, useRef, useState } from "react";
import AvatarInitials from "../../../../components/AvatarInitials";
import SelectField from "../../../../components/SelectField";
import { toast } from "react-toastify";
import useFileUpload from "../../../../api/hooks/useFileUpload";

export default function ProfileInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUpload, handleSubmit: handleSubmitUpload, formState: { errors: errorsUpload } } = useForm();
    const fileInputRef = useRef(null);
    const { uploadFiles, isLoadingUpload } = useFileUpload();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
    const [files, setFiles] = useState([]);
    const [documentSelected, setSelectedDocument] = useState(null);
    const [customError, setCustomError] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.data);
    const { mutate } = useApiMutation();
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
                dispatch(setUser(response.data.data));
            },
        });
    }


    const changeProfile = (data) => {
        setIsLoading(true)
        mutate({
            url: "/api/users/profile/update/individual",
            method: "PUT",
            data: data,
            headers: true,
            onSuccess: (response) => {
                dispatch(setUser(response.data.data));
                setIsLoading(false)
            },
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
                url: "/api/users/upload/verified/IDCard",
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
            url: "/api/users/upload/verified/IDCard",
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

    return (
        <>
            <form onSubmit={handleSubmit(changeProfile)}>
                <div className="mb-1 flex flex-col gap-5 mt-5">
                    <div className="flex md:flex-row flex-col gap-3">
                        {user.photo ?
                            <div className="flex w-32 h-32">
                                <img src={`${user.photo}`} className="w-full h-full object-cover rounded-full" />
                            </div>
                            :
                            <AvatarInitials name={`${user.firstName}${user.lastName}`} size="32" />
                        }
                        <div className="flex flex-col justify-center md:mx-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                multiple
                            />
                            <Button className="bg-transparent px-7 rounded-full border-[0.5px] border-gray-700"
                                onClick={handleButtonClick}
                                disabled={isLoadingUpload}
                            >
                                {isLoadingUpload ? 'Changing Picture' : 'Change Picture'}
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex lg:flex-row md:flex-row flex-col mt-6 gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                First Name
                            </p>
                            <Input type="text" value={user.firstName} name="firstName" register={register}
                                rules={{ required: 'firstName is required' }} errors={errors} placeholder="First Name" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Last Name
                            </p>
                            <Input type="text" value={user.lastName} name="lastName" register={register}
                                rules={{ required: 'Last Name is required' }} errors={errors} placeholder="Last Name" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Phone Number
                            </p>
                            <Input name="phoneNumber" value={user.phoneNumber} register={register}
                                rules={{ required: 'Phone Number is required' }} errors={errors} type="text" placeholder="Phone Number" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Email
                            </p>
                            <Input type="text" name="email" value={user.email} register={register}
                                rules={{ required: 'Email is required' }} errors={errors} placeholder="Email" />
                        </div>
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col md:w-1/2 gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Date of Birth
                            </p>
                            <Input type="date" name="dateOfBirth" value={user.dateOfBirth} register={register}
                                rules={{ required: 'Date of Birth is required' }} errors={errors} placeholder="Enter your date of birth" />
                        </div>
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