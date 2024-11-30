import { useForm } from "react-hook-form";
import DropZone from "../../../../../components/DropZone";
import Input from "../../../../../components/Input";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import RadioButtonGroup from "../../../../../components/RadioButtonGroup";

export default function TicketEvent() {
    const { register, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const arrayOptions = [
        {
            name: 'Free',
            slug: 'free'
        },
        {
            name: 'Paid',
            slug: 'paid'
        }
    ];

    return (
        <>
            <form>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                    <div className="flex w-full gap-6">
                        <RadioButtonGroup options={arrayOptions} selectedOption={'free'} />
                    </div>

                    <div className="w-full my-10 border-dashed border-2 h-[1px]" />

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Ticket Name (Optional)
                        </p>
                        <Input name="phoneNumber" register={register}
                            type="text" placeholder="Enter Ticket name" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Available Quantity
                        </p>
                        <Input name="phoneNumber" register={register}
                            type="text" placeholder="Enter the number of tickets" />
                    </div>

                    <div className="flex">
                        <Button disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            {isLoading ? 'Updating...' : 'Create Event'}
                        </Button>
                    </div>

                </div>
            </form>
        </>
    )
}
