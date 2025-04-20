import { useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import RadioButtonGroup from "../../../../../components/RadioButtonGroup";
import Checkbox from "../../../../../components/CheckBox";
import useApiMutation from "../../../../../api/hooks/useApiMutation";
import { useNavigate } from "react-router-dom";

export default function TicketEvent({ back, data }) {
    const eventPayload = JSON.parse(localStorage.getItem('eventPayload'));
    const event = eventPayload ? eventPayload : null;

    const { register, trigger, handleSubmit, formState: { errors } } = useForm();
    const [selectedPlan, setSelectedPlan] = useState(data ? data.ticketType : 'Free');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecurring, setIsRecurring] = useState(data ? data.isRecurring : false);
    const [recurrenceType, setRecurrenceType] = useState(data ? data.recurrenceType : null);
    const [ticketsArray, setTicketsArray] = useState(data ?
        data.eventtickets.map(ticket => ({
            id: ticket.id,
            name: ticket.name,
            ticketsAvailable: ticket.ticketsAvailable ?? null,
            plusAllowed: null,
            price: ticket.price ?? null
        }))
        :
        [
            { name: null, ticketsAvailable: null, plusAllowed: null, price: null }
        ]
    );



    const dateTimeLocal = (value) => {
        const dateTime = new Date(`${value}`)
            .toISOString()
            .slice(0, 16);

        return dateTime
    }


    const { mutate } = useApiMutation();

    const navigate = useNavigate();


    const handleBack = () => {
        back(true)
    }


    const addTicketTypes = async () => {
        // Validate existing fields before adding new ticket type
        const currentTicketCount = ticketsArray.length;
        const fieldsToValidate = [];

        // Collect all field names for existing tickets
        for (let i = 0; i < currentTicketCount; i++) {
            fieldsToValidate.push(`ticketName${i}`);
            fieldsToValidate.push(`ticketsAvailable${i}`);
            fieldsToValidate.push(`plusAllowed${i}`);
            if (selectedPlan === 'Paid') fieldsToValidate.push(`price${i}`);
        }

        // Trigger validation for all existing fields
        const isValid = await trigger(fieldsToValidate);

        // Only add new ticket type if validation passes
        if (isValid) {
            setTicketsArray(prevTickets => [
                ...prevTickets,
                { name: null, ticketsAvailable: null, plusAllowed: null, price: null }
            ]);
        }
    };



    const removeTicketTypes = (index) => {
        if (typeof index === 'number' && index > 0) {
            setTicketsArray(prevTickets => prevTickets.filter((_, i) => i !== index));
        }
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
        const tickets = ticketsArray.map((ticketRef, index) => {
            const name = input[`ticketName${index}`];
            const ticketsAvailable = input[`ticketsAvailable${index}`];
            const plusAllowed = input[`plusAllowed${index}`];
            const price = input[`price${index}`];

            const ticket = {
                name: name || null,
                ticketsAvailable: ticketsAvailable ? Number(ticketsAvailable) : null,
                plusAllowed: plusAllowed ? Number(plusAllowed) : null,
                price: price ? String(price) : null,
            };

            // Include ID if it exists in the reference array
            if (ticketRef.id) {
                ticket.id = ticketRef.id;
            }

            return ticket;
        }).filter(ticket => ticket.name); // Remove tickets with no name

        // Clean up input by removing ticket-related keys
        const cleanedInput = { ...input };
        Object.keys(input).forEach((key) => {
            if (
                key.startsWith("ticketName") ||
                key.startsWith("ticketsAvailable") ||
                key.startsWith("plusAllowed") ||
                key.startsWith("price")
            ) {
                delete cleanedInput[key];
            }
        });

        return {
            ...cleanedInput,
            tickets,
        };
    };



    const createEvent = (dataEvent) => {
        let payload = {};
        setIsLoading(true);

        if (data.id) {
            payload = {
                eventId: data.id,
                ...event,
                ...dataEvent,
                ticketType: selectedPlan
            };
        }
        else {
            payload = {
                ...event,
                ...dataEvent,
                ticketType: selectedPlan
            };
        }
        delete payload.city;
        delete payload.country;
        delete payload.state;
        delete payload.street;
        delete payload.venueName;
        const reformedPayload = transformPayload(payload);

        mutate({
             url: data.eventId ? `/api/events/event/update` : `/api/events/event/create`,
             method: data.eventId ? "PUT" : "POST",
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

                    <div className="w-full mt-4 border-dashed border-2 h-[1px]" />

                    <div className="flex justify-start">
                        <div className="flex gap-1">
                            <span className="flex">
                                <Checkbox
                                    name="isRecurring"
                                    label="Event Occurs more than once"
                                    register={register}
                                    value={isRecurring}
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
                                <Input name="frequency" value={data?.frequency} options={frequencyOptions} register={register} errors={errors}
                                    rules={{ required: 'Event Frequency is required' }}
                                    type="select" placeholder="Select Frequency" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Event Recurrence End Type
                                </p>
                                <Input name="recurrenceEndType" value={data?.recurrenceEndType} options={recurrenceOptions} register={register} errors={errors}
                                    rules={{ required: 'Event Frequency is required' }}
                                    onChange={handleRecurrence}
                                    type="select" placeholder="Select End Type" />
                            </div>

                            {recurrenceType === 'Count' &&
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Number of Recurrencies
                                    </p>
                                    <Input type="text" name="recurrenceCount" value={data?.recurrenceCount}
                                        rules={{ required: 'Number of Recurrencies is required' }} errors={errors} register={register}
                                        placeholder="Number of Recurrencies" />
                                </div>
                            }

                            {recurrenceType === 'Date' &&
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Recurrence End Date
                                    </p>
                                    <Input type="datetime-local" name="recurrenceEndDate" value={dateTimeLocal(data?.recurrenceEndDate)}
                                        rules={{ required: 'Recurrency end date is required' }} errors={errors} register={register}
                                        placeholder="Recurrency End Date" />
                                </div>
                            }
                        </>
                    }

                    {ticketsArray.map((tickets, index) => (
                        <div className="w-full flex flex-col rounded-lg gap-8 -mt-1 p-3 border-2 border-dashed">
                            <div className="flex flex-col w-full gap-6" key={index}>
                                <p className="-mb-3 text-mobiFormGray">
                                    Ticket Name
                                </p>
                                <Input type="text" value={tickets?.name} name={`ticketName${index}`}
                                    rules={{ required: 'Ticket Name is required' }} errors={errors} register={register}
                                    placeholder="Ticket Name" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Number of Tickets Available
                                </p>
                                <Input type="text" value={tickets?.ticketsAvailable} name={`ticketsAvailable${index}`}
                                    rules={{ required: 'Number of Available Tickets is required' }} errors={errors} register={register}
                                    placeholder="Number of Available Tickets" />
                            </div>

                            <div className="flex flex-col w-full gap-6">
                                <p className="-mb-3 text-mobiFormGray">
                                    Additional Number of Tickets Available
                                </p>
                                <Input type="text" value={tickets?.plusAllowed} name={`plusAllowed${index}`}
                                    rules={{ required: 'Additional Number of Available Tickets is required' }} errors={errors} register={register}
                                    placeholder="Additional Number of Available Tickets" />
                            </div>

                            {selectedPlan === 'Paid' &&
                                <div className="flex flex-col w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Price of Ticket
                                    </p>
                                    <Input type="text" value={tickets?.price} name={`price${index}`}
                                        rules={{ required: 'Price of Ticket is required' }} errors={errors} register={register}
                                        placeholder="Price of Ticket" />
                                </div>
                            }

                            {index > 0 &&
                                <Button onClick={() => removeTicketTypes(index)} className="md:w-1/3 w-full -mt-2 p-2 bg-red-500 rounded-lg">
                                    Remove Ticket Type
                                </Button>
                            }
                        </div>
                    ))}

                    <div className="flex gap-8 mb-8">
                        <Button onClick={async () => await addTicketTypes()} className="md:w-1/3 w-full p-4 rounded-lg">
                            Add Another Ticket Type
                        </Button>
                    </div>


                    <div className="flex gap-8">
                        <Button onClick={() => handleBack()} className="md:w-1/4 w-full p-3 rounded-full">
                            Previous
                        </Button>

                        <Button type="submit" disabled={isLoading} className="bg-mobiPink md:w-1/4 w-full p-3 rounded-full">
                            {isLoading ? (data ? "Updating..." : "Creating...") : data ? "Update" : "Create"}
                        </Button>
                    </div>

                </div>
            </form>
        </>
    )
}
