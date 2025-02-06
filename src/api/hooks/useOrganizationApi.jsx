// hooks/useOrganizationApi.js
import useApiMutation from "./useApiMutation";

export const useOrganizationApi = () => {
  const { mutate } = useApiMutation();

  const getOrganisationsData = () => {
    return new Promise((resolve, reject) => {
      mutate({
        url: `/api/users/all/organizations`,
        method: "GET",
        headers: true,
        hideToast: true,
        onSuccess: (response) => resolve(response.data.data),
        onError: (error) => reject(error)
      });
    });
  };

  const getOrganisations = (params) => {
    return new Promise((resolve, reject) => {
      mutate({
        url: `/api/memberships-subscriptions/individual/membership${params}`,
        method: "GET",
        headers: true,
        hideToast: true,
        onSuccess: (response) => resolve(response.data.data),
        onError: (error) => reject(error)
      });
    });
  };


  const getOrganisationsMember = (params) => {
    return new Promise((resolve, reject) => {
        mutate({
          url: `/api/memberships-subscriptions/organization/membership${params}`,
          method: "GET",
          headers: true,
          hideToast: true,
          onSuccess: (response) => resolve(response.data.data),
          onError: (error) => reject(error)
        });
      });  
  }

  return { getOrganisations, getOrganisationsMember, getOrganisationsData };
};