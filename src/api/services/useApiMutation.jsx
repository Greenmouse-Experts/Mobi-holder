import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useErrorHandler from "../hooks/errorHooks";
import apiClient from "../apiFactory";

const useApiMutation = () => {
    const navigate = useNavigate();
    const handleError = useErrorHandler();

    const mutation = useMutation({
        mutationFn: ({ url, data = null, method = "POST" }) => {
            // Handle different HTTP methods dynamically
            switch (method.toUpperCase()) {
                case "GET":
                    return apiClient.get(url, { params: data });
                case "POST":
                    return apiClient.post(url, data);
                case "PUT":
                    return apiClient.put(url, data);
                case "DELETE":
                    return apiClient.delete(url, { data });
                case "PATCH":
                    return apiClient.patch(url, { data });
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
        },
        onSuccess: (data, variables) => {
            // Call external success callback if provided
            if (variables.onSuccess) {
                variables.onSuccess(data);
            }

            // Show toast message
            if (data.data?.message) {
                toast.success(data.data.message);
            }

            // Navigate if a navigation path is provided
            if (variables.navigateTo) {
                navigate(variables.navigateTo);
            }
        },
        onError: (error) => {
            handleError(error);
        },
    });

    return mutation;
};

export default useApiMutation;
