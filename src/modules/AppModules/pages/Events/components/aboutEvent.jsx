import { useForm } from "react-hook-form";
import Checkbox from "../../../../../components/CheckBox";
import DropZone from "../../../../../components/DropZone";
import Input from "../../../../../components/Input";
import TextArea from "../../../../../components/TextArea";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import useApiMutation from "../../../../../api/hooks/useApiMutation";

export default function AboutEvent({ next }) {
    const eventPayload = JSON.parse(localStorage.getItem('eventPayload'));
    const event = eventPayload ? eventPayload : null;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [files, setFiles] = useState(event ? [event.image] : []);
    const [eventCategories, setEventCategories] = useState([]);
    const [aboutEvents] = useState(event);

    const { mutate } = useApiMutation();

    const accessType = [
        { label: 'Public', value: 'Public' },
        { label: 'Private', value: 'Private' },
        { label: 'Semi-private', value: 'Semi-private' }
    ]



    const getCategories = () => {
        mutate({
            url: `/api/events/event/categories`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setEventCategories(response.data.data.map((category) => {
                    return { label: category.name, value: category.id }
                }))
            },
            onError: () => {
            }
        });
    }




    useEffect(() => {
        getCategories()
    }, []);


    const handleDrop = (data) => {
        setFiles((prevFiles) => [data]);
    }


    const createEvent = (data) => {
        const payload = {
            ...aboutEvents,
            ...data,
            category: Number(data.category),
            image: files[0]
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
                            Event Name
                        </p>
                        <Input type="text" name="name" value={aboutEvents?.name} rules={{ required: 'Event Name is required' }} errors={errors} register={register} placeholder="Event Name" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Description
                        </p>
                        <TextArea name="description" value={aboutEvents?.description} errors={errors} rules={{ required: 'Event Description is required' }} register={register} placeholder="Tell us about your event" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Event Category
                        </p>
                        <Input name="category" value={aboutEvents?.category} options={eventCategories} rules={{ required: 'Event Category is required' }} type='select' register={register}
                            placeholder="Event Category" />
                    </div>

                    <div className="flex flex-col w-full gap-6">
                        <p className="-mb-3 text-mobiFormGray">
                            Access Type
                        </p>
                        <Input name="accessType" value={aboutEvents?.accessType} register={register} rules={{ required: 'Event access type is required' }}
                            type="select" options={accessType} placeholder="Choose your Event Access Type" />
                    </div>

                    <div className="w-full flex lg:flex-row md:flex-row flex-col gap-6">
                        <div className="w-full md:w-1/2 flex flex-col gap-2">
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Event Image
                                </p>
                                <DropZone text="Upload Event Image" onUpload={handleDrop} multiple={false} />
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
                                    name="allowVerifierRequests"
                                    label="Mark Event as Open for Verifiers"
                                    register={register}
                                    errors={errors}
                                    value={event?.allowVerifierRequests}
                                />
                            </span>
                        </div>
                    </div>


                    <div className="flex">
                        <Button type="submit" className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            Next
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}