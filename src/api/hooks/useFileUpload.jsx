import { useState } from "react";

const useFileUpload = (defaultOptions = {
    uploadPreset: "mobil_holder",
    folder: "mobiHolder",
}) => {
    const [isLoadingUpload, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const uploadUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`;

    const uploadFiles = async (acceptedFiles, onUpload = () => { }) => {
        const formData = new FormData();
        setIsLoading(true);
        setError(null);

        try {
            for (let i = 0; i < acceptedFiles.length; i++) {
                let file = acceptedFiles[i];
                formData.append("file", file);
                formData.append("upload_preset", defaultOptions.uploadPreset || "default_preset");
                formData.append("folder", defaultOptions.folder || "default_folder");

                const response = await fetch(uploadUrl, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                onUpload(data.secure_url);
            }
        } catch (err) {
            setError(err.message || "Upload failed");
            console.error("Error during upload:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        uploadFiles,
        isLoadingUpload,
        error,
    };
};

export default useFileUpload;
