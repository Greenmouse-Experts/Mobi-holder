import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { setOrg } from "../../../../reducers/organisationSlice";
import { useNavigate } from "react-router-dom";

export default function Security() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const changePassword = (data) => {
        setIsLoading(true)
        mutate({
            url: "/api/users/profile/update/password",
            method: "PUT",
            data: data,
            headers: true,
            navigateTo: "/login",
            onSuccess: (response) => {
                dispatch(setOrg(null));
                navigate('/login');
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(changePassword)}>
            <div className="mb-1 flex flex-col gap-5 mt-5">
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Old Password
                        </p>
                        <Input type="text" name="oldPassword"
                            rules={{ required: 'Old Password is required' }} errors={errors} register={register}
                            placeholder="" />
                    </div>
                </div>

                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            New Password
                        </p>
                        <Input name="newPassword"
                            rules={{ required: 'New Password is required' }} errors={errors} register={register}
                            type="text" placeholder="" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Re-Enter New Password
                        </p>
                        <Input name="confirmNewPassword"
                            rules={{ required: 'Re-Enter New Password' }} errors={errors} register={register}
                            type="text" placeholder="" />
                    </div>
                </div>
                <div className="flex">
                    <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-auto w-full py-3 px-7 rounded-full">
                        {isLoading ? 'Updating Password...' : 'Update Password'}
                    </Button>
                </div>
            </div>
        </form>
    )
}