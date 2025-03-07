import useApiMutation from "./useApiMutation";

export const useIndividualApi = () => {
    const { mutate } = useApiMutation();

    const getIndividualsData = () => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/users/all/individuals`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };

    const getSingleIndividual = (params) => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/users/${params}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };


    const getIndividualsAdmin = (params) => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/admins/individuals${params}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data),
                onError: (error) => reject(error)
            });
        });
    };


    const getSingleIndividualAdmin = (params) => {
        return new Promise((resolve, reject) => {
            mutate({
                url: `/api/admins/view/user${params}`,
                method: "GET",
                headers: true,
                hideToast: true,
                onSuccess: (response) => resolve(response.data.data),
                onError: (error) => reject(error)
            });
        });
    };


    return { getIndividualsData, getSingleIndividual, getIndividualsAdmin, getSingleIndividualAdmin };
};