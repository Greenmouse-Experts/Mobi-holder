import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useErrorHandler from "./errorHooks";
import apiClient from "../apiFactory";

const useApiMutation = () => {
    const navigate = useNavigate();
    const handleError = useErrorHandler();
    const token = localStorage.getItem("userToken");

    const mutation = useMutation({
        mutationFn: ({ url, data = null, method = "POST", headers = false }) => {
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
                    return apiClient.post(url, data, config);
                case "PUT":
                    return apiClient.put(url, data, config);
                case "DELETE":
                    return apiClient.delete(url, { data, ...config });
                case "PATCH":
                    return apiClient.patch(url, data, config);
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
            if (!variables.hideToast) {
                handleError(error);
            }
            variables.onError(error);
        },
    });

    return mutation;
};

export default useApiMutation;
