import { Button } from "@material-tailwind/react";
import Input from "../../../../components/Input";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../../api/hooks/useApiMutation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVerifier() {
    const user = useSelector((state) => state.userData.data);
    const { register, trigger, handleSubmit, formState: { errors } } = useForm();
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { mutate } = useApiMutation();


    const getAllEvents = () => {
        mutate({
            url: `/api/events/events`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const today = new Date();
                today.setUTCHours(0, 0, 0, 0);

                // Get tomorrow's date
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);

                // Filter events starting **tomorrow or later**
                const futureEvents = response.data.data.filter(event => {
                    const eventStartDate = new Date(event.startDate);
                    return eventStartDate >= tomorrow;
                });

                const formattedEvents = futureEvents.map(event => ({
                    label: event.name,
                    value: event.id
                  }));

                setAllEvents(formattedEvents);
            },
            onError: () => {
            }
        });
    }


    useEffect(() => {
        getAllEvents();
    }, []);




    const createVerifier = (data) => {
        setIsLoading(true)
        const payload = {
           ...data
        };

        mutate({
            url: `/api/verifications/create/verification/request`,
            method: "POST",
            headers: true,
            data: payload,
            onSuccess: (response) => {
                navigate(-1);
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        });

    }




    return (
        <>
            <div className="w-full flex h-full animate__animated animate__fadeIn">
                <div className="w-full flex flex-col gap-5 h-full">
                    <Header mobile data={user} title={'Add Verifier'} />
                    <div className="w-full flex justify-between items-center gap-8 md:my-5 my-2 px-3">
                        <div className="w-full flex flex-col gap-2">
                            <p className="lg:text-2xl md:text-xl text-lg font-semibold md:hidden">Add Verifier</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-grow md:flex-row flex-col md:px-0 px-3 justify-between items-start gap-8">
                        <div className="shadow-xl py-5 px-8 md:w-[70%] w-full border border-mobiBorderFray card-body flex rounded-xl flex-col gap-10">
                            <form onSubmit={handleSubmit(createVerifier)}>
                                <div className="mb-1 flex flex-col gap-10 mt-5">
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            User ID/Email Address
                                        </p>
                                        <Input type="text" name="userId" register={register} errors={errors} placeholder="Enter User ID or email" />
                                    </div>
                                    <div className="flex flex-col w-full gap-6">
                                        <p className="-mb-3 text-mobiFormGray">
                                            Choose Event
                                        </p>
                                        <Input name="eventId" register={register} errors={errors} rules={{ required: 'Event is required' }}
                                            type="select" options={allEvents} placeholder="Choose your Event" />
                                    </div>
                                    <div className="flex">
                                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                                            Add Verifier
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