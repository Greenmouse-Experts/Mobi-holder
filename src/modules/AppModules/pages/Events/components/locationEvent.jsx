import { useForm } from "react-hook-form";
import DropZone from "../../../../../components/DropZone";
import Input from "../../../../../components/Input";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

export default function LocationEvent({next}) {
    const { register, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const handleClick = () => {
        next(true);
    }

    return (
        <>
            <form>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Venue (Location)
                        </p>
                        <Input type="text" name="firstName" register={register} placeholder="Enter the venue of your event" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Country
                        </p>
                        <Input type="text" name="firstName" register={register} placeholder="Choose the country" />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                State
                            </p>
                            <Input name="phoneNumber" register={register}
                                type="text" placeholder="Choose the State" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                City
                            </p>
                            <Input name="phoneNumber" register={register}
                                type="text" placeholder="Choose the City" />
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Access Type
                        </p>
                        <Input name="phoneNumber" register={register}
                            type="text" placeholder="Choose your Event Access Type" />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="w-full md:w-1/2 flex flex-col gap-2">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Venue Photos (Optional)
                                </p>
                                <DropZone text="Upload Venue Photo" />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {files.map((fileObj, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={fileObj}
                                            alt="preview"
                                            className="w-full h-24 object-cover rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full my-10 border border-2 h-[1px]" />

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                Start Date
                            </p>
                            <Input name="phoneNumber" register={register}
                                type="date" placeholder="Choose the Start date" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                End Date
                            </p>
                            <Input name="phoneNumber" register={register}
                                type="date" placeholder="Choose the End date" />
                        </div>
                    </div>

                    <div className="flex">
                        <Button onClick={() => handleClick()} disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            {isLoading ? 'Updating...' : 'Next'}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}