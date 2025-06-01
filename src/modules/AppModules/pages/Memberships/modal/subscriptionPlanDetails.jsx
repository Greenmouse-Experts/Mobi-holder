import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import SafeHTML from "../../../../../helpers/safeHTML";


const SubscriptionPlanDetails = ({ plan, closeModal }) => {

    const { register, setValue } = useForm();



    return (
        <>
            <div className="w-full flex max-h-[90vh] flex-col px-3 py-6 overflow-y-auto gap-3 -mt-3">
                <div className="flex gap-5">
                    <div className="flex flex-col justify-start">
                        <h2 className="font-[500]">View Subscription Plan</h2>
                    </div>
                </div>
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex flex-col w-full gap-4">
                            <p className="-mb-3 text-mobiFormGray">
                                Name
                            </p>
                            <Input type="text" name="name" disabled value={plan?.name} register={register}
                                placeholder="Enter name of plan" />
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <p className="-mb-3 text-mobiFormGray">
                                Description
                            </p>
                            <div className="flex items-center border border-transparent bg-gray-100 text-black mb-4 px-3 py-1.5 rounded-[7px]">
                                <SafeHTML htmlContent={plan?.description || ''} />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <p className="-mb-3 text-mobiFormGray">
                                Price
                            </p>
                            <Input type="text" name="price" disabled register={register}
                                value={plan?.price || ''}
                                placeholder="Enter amount" />
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <p className="-mb-3 text-mobiFormGray">
                                Duration (in months)
                            </p>
                            <Input type="text" name="validity" disabled register={register}
                                value={plan?.validity || ''}
                                placeholder="Enter amount" />
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <Button type="submit"
                                onClick={() => closeModal()}
                                className="p-3 rounded-lg"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
            </div>
        </>
    )
};

export default SubscriptionPlanDetails;