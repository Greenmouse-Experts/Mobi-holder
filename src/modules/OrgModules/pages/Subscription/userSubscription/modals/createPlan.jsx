import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../../../components/Input";
import { useState } from "react";
import useApiMutation from "../../../../../../api/hooks/useApiMutation";

const CreatePlan = ({ redirect, closeModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutate } = useApiMutation();
    const [disabled, setDisabled] = useState(false);


    const createSubPlan = (data) => {
        setDisabled(true);
        mutate({
            url: `/api/memberships-subscriptions/subscription/plan/create`,
            method: "POST",
            headers: true,
            data: data,
            onSuccess: () => {
                redirect();
                closeModal();
                setDisabled(false);
            },
            onError: () => {
                setDisabled(false);
                closeModal();
            }
        });
    }


    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 overflow-y-auto gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">Create Subscription Plan</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit(createSubPlan)}>
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Name
                            </p>
                            <Input type="text" name="name" register={register}
                                placeholder="Enter name of plan" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Description
                            </p>
                            <Input type="textarea" name="description" register={register}
                                rules={{ required: 'Description is required' }} errors={errors}
                                placeholder="Enter description" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Price
                            </p>
                            <Input type="text" name="price" register={register}
                                rules={{ required: 'Amount is required' }} errors={errors}
                                placeholder="Enter amount" />
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Duration (in months)
                            </p>
                            <Input type="text" name="validity" register={register}
                                rules={{ required: 'Duration is required' }} errors={errors}
                                placeholder="Enter amount" />
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <Button type="submit"
                                disabled={disabled}
                                className="bg-mobiPink p-3 rounded-lg"
                            >
                                Create Plan
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreatePlan;