import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import Input from "../../../../components/Input";
import Loader from "../../../../components/Loader";

export default function PaymentGateway() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [gateway, setGateway] = useState(null);

    const { mutate } = useApiMutation();


    useEffect(() => {          
        fetchData();
    }, []);


    const fetchData = () => {
        mutate({
            url: `/api/admins/payment-gateway`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setGateway(response.data.data) 
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        });
    }


    const createGatewayKeys = (data) => {
        setIsDisabled(true)
        mutate({
            url: "/api/admins/payment-gateway",
            method: "POST",
            data: data,
            headers: true,
            onSuccess: (response) => {
                setIsDisabled(false);
            },
            onError: (error) => {
                setIsDisabled(false);
            }
        });
    }





    if (isLoading) {
        return (
            <>
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            </>
        )
    }




    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <div className="w-full flex flex-col gap-8 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="md:text-xl text-lg font-semibold">Payment Gateway</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow">
                        <div className="py-5 px-5 w-full flex rounded-xl flex-col gap-10">

                            <form onSubmit={handleSubmit(createGatewayKeys)}>
                                <div className="mb-1 flex flex-col gap-10 mt-1">

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Gateway Name
                                        </p>
                                        <Input type="text" name="gateway" register={register} value="PayStack" disabled={true} placeholder="Gateway Name" />
                                    </div>


                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Gateway Public Key
                                        </p>
                                        <Input type="text" name="publicKey" value={gateway?.publicKey} register={register}
                                            rules={{ required: 'API Key is required' }} errors={errors} placeholder="Enter API Key" />
                                    </div>

                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Gateway Secret key
                                        </p>
                                        <Input type="text" name="secretKey" value={gateway?.secretKey} register={register}
                                            rules={{ required: 'Secret Key is required' }} errors={errors} placeholder="Enter Secret Key" />
                                    </div>

                                    <div className="flex">
                                        <Button type="submit" disabled={isDisabled} className="bg-mobiPink md:w-1/3 w-full p-3 rounded-full">
                                            {isDisabled ? 'Adding Keys...' : 'Add Payment Keys'}
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