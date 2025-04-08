import useApiMutation from "./useApiMutation";

export const useEventsApi = () => {
    const { mutate } = useApiMutation();

    const getAllEvents = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/admins/events`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data),
                onError: (error) => reject(error)
            });
        });
    };

    return { getAllEvents };
}
