import { useState } from "react";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../../api/hooks/useApiMutation";
import { Button } from "@material-tailwind/react";
import Input from "../../../../../components/Input";

const RevokeCardModal = ({ closeModal, reload, cardInfo }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useApiMutation();


    const revokeCard = (data) => {
        setIsLoading(true);
        const payload = {
            cardId: cardInfo.cardNumber,
            status: 'revoked',
            ...data
        };
        mutate({
            url: "/api/idcards/organization/change/card/status",
            method: "POST",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                closeModal();
                reload();
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }



    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Revoke ID Card</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(revokeCard)}>
                    <div className="flex flex-col gap-4 mt-7">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Reason for revoking
                            </p>
                            <Input type="text" name="revocationReason" errors={errors} register={register}
                                placeholder="Enter reason for revoking" />
                        </div>
                        <div className="w-full flex justify-center mt-5">
                            <Button type="submit"
                                disabled={isLoading}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Revoke ID Card
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RevokeCardModal
