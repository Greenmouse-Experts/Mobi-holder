import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useErrorHandler from "./errorHooks";
import apiClient from "../apiFactory";

const useApiMutation = () => {
    const navigate = useNavigate();
    const handleError = useErrorHandler();


    const logoutUser = () => {
        toast.error("Session expired, please login again");
        localStorage.clear();
        window.location.pathname.includes('superadmin') ? navigate('/admin') : navigate("/login");
    };


    const mutation = useMutation({
        mutationFn: ({ url, data = null, method = "POST", headers = false }) => {

            const token = localStorage.getItem("userToken");

            const config = headers ? {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token dynamically
                    "Content-Type": "application/json",  // Optional: Specify the content type
                },
            } :
                {};

            switch (method.toUpperCase()) {
                case "GET":
                    return apiClient.get(url, { params: data, ...config });
                case "POST":
                    return data !== null ? apiClient.post(url, data, config) : apiClient.post(url, undefined, config);
                case "PUT":
                    return data !== null ? apiClient.put(url, data, config) : apiClient.put(url, undefined, config);
                case "DELETE":
                    return data ? apiClient.delete(url, { data, ...config }) : apiClient.delete(url, { undefined, ...config });
                case "PATCH":
                    return data !== null ? apiClient.patch(url, data, config) : apiClient.patch(url, undefined, config);
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
        },
        onSuccess: (data, variables) => {
            // Call external success callback if provided
            if (variables.onSuccess) {
                variables.onSuccess(data);
            }

            if (!variables.hideToast) {
                // Show toast message
                if (data.data?.message) {
                    toast.success(data.data.message);
                }

                // Navigate if a navigation path is provided
                if (variables.navigateTo) {
                    navigate(variables.navigateTo);
                }
            }
        },
        onError: (error, variables) => {
            // Check if error is a 401 response
            if (error.response && error.response.status === 401) {
                logoutUser();
                return;
            }

            if (!variables.hideToast) {
                handleError(error);
            }
            variables.onError(error);
        },
    });

    return mutation;
};

export default useApiMutation;
