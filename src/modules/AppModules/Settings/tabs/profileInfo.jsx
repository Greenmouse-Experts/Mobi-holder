import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DropZone from "../../../../components/DropZone";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { setUser } from "../../../../reducers/userSlice";
import { useState } from "react";

export default function ProfileInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userData.data);
    const token = localStorage.getItem("userToken");

    const { mutate } = useApiMutation();

    const url = `${import.meta.env.VITE_CLOUDINARY_URL}`;
    const formData = new FormData();

    const handleDrop = (acceptedFiles) => {
        setFileLoading(true);
        for (let i = 0; i < acceptedFiles.length; i++) {
            let file = acceptedFiles[i];
            formData.append('file', file);
            formData.append('upload_preset', 'mobil_holder');
            formData.append("folder", "mobiHolder");

            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json(); // Parse the response as JSON
                })
                .then((data) => {
                    setFiles((prevFiles) => [...prevFiles, data.secure_url]);
                    setFileLoading(false);
                })
                .catch((error) => {
                    console.error("Error during upload:", error);
                    setFileLoading(false);
                });
        }
    };

    const changeProfile = (data) => {
        setIsLoading(true)
        mutate({
            url: "/api/users/profile/update/individual",
            method: "PUT",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`, // Add the token dynamically
                "Content-Type": "application/json",  // Optional: Specify the content type
            },
            onSuccess: (response) => {
                dispatch(setUser(response.data.data));
                setIsLoading(false)
            },
        });

        const payload = {
            name: "National ID Card",
            front: files[0],
            back: files[1]
        }
        mutate({
            url: "/api/users/upload/verified/IDCard",
            method: "POST",
            data: payload,
            headers: {
                Authorization: `Bearer ${token}`, // Add the token dynamically
                "Content-Type": "application/json",  // Optional: Specify the content type
            },
            onSuccess: (response) => {
                dispatch(setUser(response.data.data));
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false);
            }
        });

    };

    return (
        <>
            <form onSubmit={handleSubmit(changeProfile)}>
                <div className="mb-1 flex flex-col gap-5 mt-5">
                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
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

                    <div className="w-full flex flex-col gap-2">
                        <div className="flex flex-col md:w-1/2 w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Verification Documents
                            </p>
                            <DropZone onDrop={handleDrop} loading={fileLoading} />
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

                    <div className="flex">
                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            {isLoading ? 'Updating...' : 'Update Info'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}