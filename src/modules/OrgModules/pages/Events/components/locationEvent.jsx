import { useForm } from "react-hook-form";
import DropZone from "../../../../../components/DropZone";
import Input from "../../../../../components/Input";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import { dateInput } from "../../../../../helpers/dateHelper";

export default function LocationEvent({ next, back, data }) {
    const eventPayload = JSON.parse(localStorage.getItem('eventPayload'));
    const event = eventPayload ? eventPayload : null;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [files, setFiles] = useState(() => {
        return event.venueImage
            || (data?.venueImage ? JSON.parse(data.venueImage) : [])
            || [];
    });

    const venueLocation = data ? data?.venue : null;


    const dateTimeLocal = (value) => {
        if(!value) return null;
        const dateTime = new Date(`${value}`)
        .toISOString()
        .slice(0, 16);

        return dateTime
    }


    const handleBack = () => {
        back()
    }


    const handleDrop = (data) => {
        setFiles((prevFiles) => [...prevFiles, data]);
    }


    const removeImage = (indexToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    };


    const createEvent = (data) => {
        const payload = {
            ...event,
            ...data,
            venue: {
                name: data.venueName,
                address: `${data.street}`
            },
            venueImage: files
        };
        localStorage.setItem('eventPayload', JSON.stringify(payload));
        next(true);
    }


    return (
        <>
            <form onSubmit={handleSubmit(createEvent)}>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Name of Venue
                        </p>
                        <Input type="text" name="venueName" value={event?.venueName || venueLocation?.name} register={register} rules={{ required: 'Name of Venue is required' }} placeholder="Enter the name of the venue of your event" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Venue (Address)
                        </p>
                        <Input type="text" name="street" value={event?.street || venueLocation?.address} rules={{ required: 'Address is required' }} register={register} placeholder="Enter the address of the venue of your event" />
                    </div>

                   {/* <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Country
                        </p>
                        <Input type="text" value={event?.country || venueLocation?.address.split(',')[1].split(',')[1]} rules={{ required: 'Country is required' }} errors={errors} name="country" register={register} placeholder="Enter country" />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                State
                            </p>
                            <Input name="state" value={event?.state} rules={{ required: 'State is required' }} errors={errors} register={register}
                                type="text" placeholder="Enter State" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                City
                            </p>
                            <Input name="city" value={event?.city} rules={{ required: 'City is required' }} errors={errors} register={register}
                                type="text" placeholder="Enter City" />
                        </div> 
                    </div> */}

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="w-full md:w-1/2 flex flex-col gap-2">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Venue Photos (Optional)
                                </p>
                                <DropZone text="Upload Venue Photo" onUpload={handleDrop} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                {files.map((fileObj, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={fileObj}
                                            alt="preview"
                                            className="w-full h-24 object-cover rounded"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-white shadow-lg text-black rounded-full p-1"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
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
                            <Input name="startDate" value={event?.startDate || dateTimeLocal(data?.startDate)} rules={{ required: 'Start Date is required' }} errors={errors} register={register}
                                type="datetime-local" placeholder="Choose the Start date" />
                        </div>

                        <div className="flex flex-col w-full gap-6">
                            <p className="-mb-3 text-mobiFormGray">
                                End Date
                            </p>
                            <Input name="endDate" value={event?.endDate || dateTimeLocal(data?.endDate)} rules={{ required: 'End Date is required' }} errors={errors} register={register}
                                type="datetime-local" placeholder="Choose the End date" />
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <Button onClick={() => handleBack()} className="md:w-1/4 w-full p-3 rounded-full">
                            Previous
                        </Button>

                        <Button type="submit" className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            Next
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}