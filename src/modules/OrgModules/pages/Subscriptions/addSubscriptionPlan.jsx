import { useSelector } from "react-redux";
import Header from "../../../../components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../../../../components/Input";
import TextArea from "../../../../components/TextArea";
import { Button } from "@material-tailwind/react";
import SelectField from "../../../../components/SelectField";
import useApiMutation from "../../../../api/hooks/useApiMutation";

export default function AddSubscriptionPlan() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();

    const validityOptions = [
        {
            name: 'Month(s)'
        },
        {
            name: 'Year(s)'
        }
    ];

    const createSubscription = (data) => {
        setIsLoading(true)
        mutate({
            url: "/api/memberships-subscriptions/subscription/plan/create",
            method: "POST",
            data: data,
            headers: true,
            onSuccess: (response) => {
                navigate(-1)
            },
            onError: (error) => {
                setIsLoading(false);
            }
        });
    }

    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile organisation data={user} />
                    <div className="w-full flex flex-col gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Add Subscription Plan</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(createSubscription)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Plan Name
                                        </p>
                                        <Input type="text" name="name" register={register}
                                            rules={{ required: 'Plan Name is required' }} errors={errors} placeholder="Enter Subscription Plan Name" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Plan description
                                        </p>
                                        <TextArea name="description" rules={{ required: 'Plan Description is required' }} errors={errors} register={register} placeholder="Tell us about this subscription plan" />
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-1">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Plan Validity
                                            </p>
                                            <Input name="validity" rules={{ required: 'Plan Validity is required' }} errors={errors} register={register}
                                                type="text" placeholder="Enter Validity Period" />
                                        </div>

                                        <div className="flex flex-col w-full gap-6">
                                            <p className="mt-[9px]"></p>
                                            <SelectField options={validityOptions} />
                                        </div>
                                    </div>

                                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                                        <div className="flex flex-col w-full gap-6">
                                            <p className="-mb-3 text-mobiFormGray">
                                                Price
                                            </p>
                                            <Input type="text" name="price" rules={{ required: 'Price is required' }} errors={errors} register={register} placeholder="Enter price" />
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                            {isLoading ? 'Adding Plan...' : 'Add Subscription Plan'}
                                        </Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}