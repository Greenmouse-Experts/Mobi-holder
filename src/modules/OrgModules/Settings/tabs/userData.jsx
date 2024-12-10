import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../components/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setOrg } from "../../../../reducers/organisationSlice";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";

export default function UserData() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.orgData.orgData);
    const token = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const { mutate } = useApiMutation();


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
            companyEmail: data.email,
            phoneNumber: data.phoneNumber,
            natureOfOrganization: payload?.natureOfOrganization
        }

        setIsLoading(true)
        mutate({
            url: "/api/users/profile/update/organization",
            method: "PUT",
            data: payloadData,
            headers: {
                Authorization: `Bearer ${token}`, // Add the token dynamically
                "Content-Type": "application/json",  // Optional: Specify the content type
            },
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
                           User Phone Number
                        </p>
                        <Input name="phoneNumber" value={user.phoneNumber} register={register}
                            rules={{ required: 'Phone Number is required' }} errors={errors} type="text" placeholder="Phone Number" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                           User Email
                        </p>
                        <Input type="text" name="email" value={user.email} register={register}
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