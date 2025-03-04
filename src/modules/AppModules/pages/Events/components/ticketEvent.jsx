import { useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import RadioButtonGroup from "../../../../../components/RadioButtonGroup";
import Checkbox from "../../../../../components/CheckBox";
import useApiMutation from "../../../../../api/hooks/useApiMutation";
import { useNavigate } from "react-router-dom";

export default function TicketEvent({ back }) {
    const eventPayload = JSON.parse(localStorage.getItem('eventPayload'));
    const event = eventPayload ? eventPayload : null;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedPlan, setSelectedPlan] = useState('Free');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceType, setRecurrenceType] = useState(null);
    const [ticketsArray, setTicketsArray] = useState([
        { name: null, ticketsAvailable: null, plusAllowed: null, price: null }
    ]);

    const { mutate } = useApiMutation();

    const navigate = useNavigate();


    const handleBack = () => {
        back(true)
    }


    const addTicketTypes = () => {
        setTicketsArray(prevTickets => [
            ...prevTickets,
            { name: null, ticketsAvailable: null, plusAllowed: null, price: null }
        ]);
    }

    const frequencyOptions = [
        {
            label: 'Daily',
            value: 'Daily'
        },
        {
            label: 'Weekly',
            value: 'Weekly'
        },
        {
            label: 'Monthly',
            value: 'Monthly'
        },
        {
            label: 'Yearly',
            value: 'Yearly'
        }
    ];


    const recurrenceOptions = [
        {
            label: 'Never',
            value: 'Never'
        },
        {
            label: 'Date',
            value: 'Date'
        },
        {
            label: 'Count',
            value: 'Count'
        },
    ]

    const arrayOptions = [
        {
            name: 'Free',
            slug: 'Free'
        },
        {
            name: 'Paid',
            slug: 'Paid'
        }
    ];

    const handleRecurrence = (data) => {
        setRecurrenceType(data)
    };


    const handleSelect = (data) => {
        setSelectedPlan(data)
    }


    const transformPayload = (input) => {
        const tickets = Object.keys(input)
            .filter((key) => key.startsWith("ticketName"))
            .map((key) => {
                const index = key.match(/\d+/)[0]; // Extract the number from the key
                return {
                    name: input[`ticketName${index}`] || null,
                    ticketsAvailable: Number(input[`ticketsAvailable${index}`]) || null,
                    plusAllowed: Number(input[`plusAllowed${index}`]) || null,
                    price: Number(input[`price${index}`]) || null,
                };
            });

        // Remove ticketName, ticketsAvailable, plusAllowed, and price fields
        const cleanedInput = { ...input };
        Object.keys(input).forEach((key) => {
            if (key.startsWith("ticketName") || key.startsWith("ticketsAvailable") || key.startsWith("plusAllowed") || key.startsWith("price")) {
                delete cleanedInput[key];
            }
        });

        return {
            ...cleanedInput,
            tickets, // Replacing the separate ticket fields with an array
        };
    };



    const createEvent = (data) => {
        setIsLoading(true)
        const payload = {
            ...event,
            ...data,
            ticketType: selectedPlan
        };
        delete payload.city;
        delete payload.country;
        delete payload.state;
        delete payload.street;
        delete payload.venueName;
        const reformedPayload = transformPayload(payload);

        mutate({
            url: `/api/events/event/create`,
            method: "POST",
            headers: true,
            data: reformedPayload,
            onSuccess: (response) => {
                navigate(-1);
                localStorage.removeItem('eventPayload');
                setIsLoading(false)
            },
            onError: () => {
                setIsLoading(false)
            }
        });

    }


    return (
        <>
            <form onSubmit={handleSubmit(createEvent)}>
                <div className="mb-1 flex flex-col gap-10 mt-5">
                    <div className="flex w-full gap-6">
                        <RadioButtonGroup options={arrayOptions} select={handleSelect} selectedOption={selectedPlan} />
                    </div>

                    <div className="w-full mt-10 border-dashed border-2 h-[1px]" />

                    <div className="flex justify-start">
                        <div className="flex gap-1">
                            <span className="flex">
                                <Checkbox
                                    name="isRecurring"
                                    label="Event Occurs more than once"
                                    register={register}
                                    errors={errors}
                                    onChange={(checked) => setIsRecurring(checked)}
                                />
                            </span>
                        </div>
                    </div>

                    {isRecurring &&
                        <>
                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Event Frequency
                                </p>
                                <Input name="frequency" options={frequencyOptions} register={register} errors={errors}
                                    rules={{ required: 'Event Frequency is required' }}
                                    type="select" placeholder="Select Frequency" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Event Recurrence End Type
                                </p>
                                <Input name="recurrenceEndType" options={recurrenceOptions} register={register} errors={errors}
                                    rules={{ required: 'Event Frequency is required' }}
                                    onChange={handleRecurrence}
                                    type="select" placeholder="Select End Type" />
                            </div>

                            {recurrenceType === 'Count' &&
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Number of Recurrencies
                                    </p>
                                    <Input type="text" name="recurrenceCount"
                                        rules={{ required: 'Number of Recurrencies is required' }} errors={errors} register={register}
                                        placeholder="Number of Recurrencies" />
                                </div>
                            }

                            {recurrenceType === 'Date' &&
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Recurrence End Date
                                    </p>
                                    <Input type="datetime-local" name="recurrenceEndDate"
                                        rules={{ required: 'Recurrency end date is required' }} errors={errors} register={register}
                                        placeholder="Recurrency End Date" />
                                </div>
                            }
                        </>
                    }

                    {ticketsArray.map((tickets, index) => (
                        <>
                            <div className="flex flex-col w-full gap-6" key={index}>
                                <p className="-mb-3 text-mobiFormGray">
                                    Ticket Name
                                </p>
                                <Input type="text" name={`ticketName${index}`}
                                    rules={{ required: 'Ticket Name is required' }} errors={errors} register={register}
                                    placeholder="Ticket Name" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Number of Tickets Available
                                </p>
                                <Input type="text" name={`ticketsAvailable${index}`}
                                    rules={{ required: 'Number of Available Tickets is required' }} errors={errors} register={register}
                                    placeholder="Number of Available Tickets" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Additional Number of Tickets Available
                                </p>
                                <Input type="text" name={`plusAllowed${index}`}
                                    rules={{ required: 'Additional Number of Available Tickets is required' }} errors={errors} register={register}
                                    placeholder="Additional Number of Available Tickets" />
                            </div>

                            {selectedPlan === 'Paid' &&
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Price of Ticket
                                    </p>
                                    <Input type="text" name={`price${index}`}
                                        rules={{ required: 'Price of Ticket is required' }} errors={errors} register={register}
                                        placeholder="Price of Ticket" />
                                </div>
                            }
                        </>
                    ))}

                    <div className="flex gap-8 mb-8">
                        <Button onClick={() => addTicketTypes()} className="md:w-1/3 w-full p-4 rounded-lg">
                            Add Another Ticket Type
                        </Button>
                    </div>

                    <div className="flex gap-8">
                        <Button onClick={() => handleBack()} className="md:w-1/4 w-full p-3 rounded-full">
                            Previous
                        </Button>

                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            {isLoading ? 'Creating...' : 'Create'}
                        </Button>
                    </div>

                </div>
            </form>
        </>
    )
}
