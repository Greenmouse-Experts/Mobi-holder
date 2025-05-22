import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useApiMutation from '../../../../../api/hooks/useApiMutation';

const useEventManagement = () => {
    const user = useSelector((state) => state.userData.data);
    const [allEvents, setAllEvents] = useState([]);
    const [verificationRequests, setVerificationRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { mutate } = useApiMutation();

    // Memoized combined events data
    const { createdEvents, verifiedEvents, allMyEvents } = useMemo(() => {
        if (!user || !allEvents.length) return {
            createdEvents: [],
            verifiedEvents: [],
            allMyEvents: []
        };

        const currentDate = new Date();

        // Events created by the current user that haven't expired
        const createdEvents = allEvents.filter(event =>
            event.userId === user.id && new Date(event.endDate) > currentDate
        );

        // Events where user is a verifier that haven't expired
        const verifiedEvents = verificationRequests
            .filter(verification => {
                const event = allEvents.find(e => e.id === verification.eventId);
                return event &&
                    new Date(event.endDate) > currentDate &&
                    verification.status === 'active';
            })
            .map(verification => {
                const event = allEvents.find(e => e.id === verification.eventId);
                return {
                    ...verification,
                    eventDetails: event,
                    isVerification: true // Flag to identify verification events
                };
            });

        // Combine both arrays and add type identifiers
        const allMyEvents = [
            ...createdEvents.map(event => ({
                ...event,
                isCreatedEvent: true
            })),
            ...verifiedEvents
        ];

        return { createdEvents, verifiedEvents, allMyEvents };
    }, [user, allEvents, verificationRequests]);

    const getAllEvents = () => {
        setIsLoading(true);
        mutate({
            url: `/api/events/get/events`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setAllEvents(response.data?.data || []);
            },
            onError: () => {
                setAllEvents([]);
            }
        });
    };

    const getVerifiedEvents = () => {
        mutate({
            url: `/api/verifications/individual/verification/requests?requestType=received`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const filteredRequests = response.data?.data?.filter((data) =>
                    data.user.id === user.id
                ) || [];
                setVerificationRequests(filteredRequests);
                setIsLoading(false);
            },
            onError: () => {
                setVerificationRequests([]);
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        if (user?.id) {
            getAllEvents();
            getVerifiedEvents();
        }
    }, [user?.id]);

    return {
        isLoading,
        createdEvents,
        verifiedEvents,
        allMyEvents, // The combined array
        refreshEvents: () => {
            getAllEvents();
            getVerifiedEvents();
        }
    };
};

export default useEventManagement;