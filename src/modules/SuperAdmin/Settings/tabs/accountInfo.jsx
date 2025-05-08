import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { setUser } from "../../../../reducers/userSlice";
import AvatarInitials from "../../../../components/AvatarInitials";
import useFileUpload from "../../../../api/hooks/useFileUpload";

export default function AccountInfo() {
    const user = useSelector((state) => state.userData.data);
    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } =
        useForm();

    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const { uploadFiles, isLoadingUpload } = useFileUpload();
    const dispatch = useDispatch();
    const { mutate } = useApiMutation();


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
                setProfilePhoto(uploadedUrl);
                const currentValues = getValues(); // Get current form data
                changeInfo({ ...currentValues, photo: uploadedUrl });
            });
        }
    };
    

    const changeInfo = (data) => {
        setIsLoading(true);
        data.name = 'Administrator',
            mutate({
                url: "/api/admins/profile/update",
                method: "PUT",
                data: data,
                headers: true,
                onSuccess: (response) => {
                    dispatch(setUser(response.data.data));
                    setIsLoading(false)
                },
            });
    };


    return (
        <div className="mb-1 flex flex-col gap-5 mt-5">
            <form onSubmit={handleSubmit(changeInfo)} className="flex flex-col gap-5">
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
                        <Button className="bg-transparent px-7 rounded-full chartColor border-[0.5px] border-gray-700"
                            onClick={handleButtonClick}
                            disabled={isLoadingUpload}
                        >
                            {isLoadingUpload ? 'Changing Picture' : 'Change Picture'}
                        </Button>
                    </div>
                </div>

                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Name
                        </p>
                        <Input type="text" value={user.name} register={register} name="name" disabled placeholder="Name" />
                    </div>
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Email
                        </p>
                        <Input name="email" value={user.email} register={register} type="text" placeholder="Email" />
                    </div>
                </div>
                <div className="flex">
                    <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                        {isLoading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </div>
            </form>
        </div>
    )
}