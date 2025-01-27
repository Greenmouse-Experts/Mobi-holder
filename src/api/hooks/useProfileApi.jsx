// hooks/useOrganizationApi.js
import useApiMutation from "./useApiMutation";

export const useProfileApi = () => {
  const { mutate } = useApiMutation();

  const getUser = (params) => {
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

  return { getUser };
};