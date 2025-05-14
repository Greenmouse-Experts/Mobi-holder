import { Button } from '@material-tailwind/react';
import useApiMutation from '../../../../../../api/hooks/useApiMutation';
import { useState } from 'react';

const ConfirmModal = ({ closeModal, eventInfo, ticketsArray, eventPayload, selectedPlan, redirect }) => {

    const { mutate } = useApiMutation();

    const [isLoading, setIsLoading] = useState(false);



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






    const createAction = () => {
        setIsLoading(true);

        const payload = {
            ...eventPayload,
            ...eventInfo,
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
                redirect()
                closeModal();
                setIsLoading(false);
            },
            onError: () => {
                closeModal();
                setIsLoading(false);
            }
        });
    }


    return (
        <>
            <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5 justify-center w-full">
                    <p className="font-semibold text-center text-lg">
                        Please note that event cannot be edited after submission. Do you confirm that all the provided information is accurate?
                    </p>
                </div>
                <div className="flex justify-center mt-5 gap-4">
                    <Button
                        onClick={createAction}
                        disabled={isLoading}
                        className="bg-mobiPink text-white outline-none px-4 py-2 rounded-full"
                    >
                        Yes, Create
                    </Button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black px-4 py-2 rounded-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default ConfirmModal;