import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { setUser } from "../../../../reducers/userSlice";

export default function AccountInfo() {
    const user = useSelector((state) => state.userData.data);
    const { register, handleSubmit, setValue, watch, formState: { errors } } =
        useForm();

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { mutate } = useApiMutation();


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