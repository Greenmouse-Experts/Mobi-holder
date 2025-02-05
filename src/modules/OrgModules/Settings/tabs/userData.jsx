import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setOrg } from "../../../../reducers/organisationSlice";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";

export default function UserData() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register, handleSubmit, setValue, watch, formState: { errors } } =
        useForm({
            defaultValues: {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
            },
        });
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { mutate } = useApiMutation();


    const changeProfile = (data) => {
        const { companyAddress, phoneNumber, ...rest } = user;
        const payloadData = {
            ...rest,
            companyAddress: typeof companyAddress === "string"
                ? JSON.parse(companyAddress)
                : companyAddress,
            phoneNumber: data.phoneNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
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
        });
    };




    return (
        <form onSubmit={handleSubmit(changeProfile)}>
            <div className="mb-1 flex flex-col gap-5">
                <div className="w-full flex lg:flex-row md:flex-row flex-col mt-6 gap-6">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            First Name
                        </p>
                        <Input type="text" name="firstName" register={register}
                            watch={watch}
                            setValue={setValue}
                            rules={{ required: 'firstName is required' }} errors={errors} placeholder="First Name" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Last Name
                        </p>
                        <Input type="text" name="lastName" register={register}
                            watch={watch}
                            setValue={setValue}
                            rules={{ required: 'Last Name is required' }} errors={errors} placeholder="Last Name" />
                    </div>
                </div>

                <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            User Phone Number
                        </p>
                        <Input name="phoneNumber" register={register}
                            watch={watch}
                            setValue={setValue}
                            rules={{ required: 'Phone Number is required' }} errors={errors} type="text" placeholder="Phone Number" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            User Email
                        </p>
                        <Input type="text" name="email" register={register}
                            watch={watch}
                            setValue={setValue}
                            rules={{ required: 'Email is required' }} errors={errors} placeholder="Email" />
                    </div>
                </div>
                <div className="flex">
                    <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                        {isLoading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </div>
            </div>
        </form>
    )
}