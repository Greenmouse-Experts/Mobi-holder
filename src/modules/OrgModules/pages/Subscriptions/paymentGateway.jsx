import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Header from "../../../../components/Header";
import Input from "../../../../components/Input";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function PaymentGateway() {
    const user = useSelector((state) => state.orgData.orgData);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const createGatewayKeys = (data) => {
        setIsLoading(true)
        mutate({
            url: "/api/users/create/update/payment/gateway",
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
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold">Create Payment Gateway</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="shadow-xl py-5 px-5 md:w-3/4 lg:w-3/5 w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(createGatewayKeys)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Gateway API Key
                                        </p>
                                        <Input type="text" name="api_key" register={register}
                                            rules={{ required: 'API Key is required' }} errors={errors} placeholder="Enter API Key" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Gateway secret key
                                        </p>
                                        <Input type="text" name="api_secret" register={register}
                                            rules={{ required: 'Secret Key is required' }} errors={errors} placeholder="Enter Secret Key" />
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                            {isLoading ? 'Adding Keys...' : 'Add Payment Keys'}
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