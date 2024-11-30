import { useForm } from "react-hook-form";
import Checkbox from "../../../../../components/CheckBox";
import DropZone from "../../../../../components/DropZone";
import Input from "../../../../../components/Input";
import TextArea from "../../../../../components/TextArea";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

export default function AboutEvent({next}) {
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
                            Event Name
                        </p>
                        <Input type="text" name="firstName" register={register} placeholder="Event Name" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Description
                        </p>
                        <TextArea name="lastName" register={register} placeholder="Tell us about your event" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Event Category
                        </p>
                        <Input name="phoneNumber" register={register}
                            type="text" placeholder="Event Category" />
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
                                    Event Image
                                </p>
                                <DropZone text="Upload Event Image" />
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

                    <div className="flex justify-start">
                        <div className="flex gap-1">
                            <span className="flex">
                                <Checkbox
                                    name="acceptedTnC"
                                    label="Mark Event as Open for Verifiers"
                                    register={register}
                                    rules={{ required: 'Terms & Conditions is required' }}
                                    errors={errors}
                                />
                            </span>
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