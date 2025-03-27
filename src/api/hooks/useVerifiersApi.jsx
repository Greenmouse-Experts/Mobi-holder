import useApiMutation from "./useApiMutation";

export const useVerifiersApi = () => {
    const { mutate } = useApiMutation();

    const getReceivedRequests = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/verifications/individual/verification/requests?requestType=received`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };


    const getInitiatedRequests = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/verifications/individual/verification/requests?requestType=initiated`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };




    const getReceivedOrgRequests = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/verifications/organization/verification/requests?requestType=received`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };


    const getInitiatedOrgRequests = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/verifications/organization/verification/requests?requestType=initiated`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };

    return { getReceivedRequests, getInitiatedRequests, getReceivedOrgRequests, getInitiatedOrgRequests };
}
