import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useFileUpload = (
  defaultOptions = {
    uploadPreset: "mobil_holder",
    folder: "mobiHolder",
  },
) => {
  const [isLoadingUpload, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const uploadUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`;

  const uploadFiles = async (acceptedFiles, onUpload = () => {}) => {
    const formData = new FormData();
    setIsLoading(true);
    setError(null);

    try {
      for (let i = 0; i < acceptedFiles.length; i++) {
        let file = acceptedFiles[i];
        formData.append("file", file);
        formData.append(
          "upload_preset",
          defaultOptions.uploadPreset || "default_preset",
        );
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
interface CloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  original_extension: string;
}

export const use_new_Uploader = () => {
  const uploadUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`;
  let resp = useMutation<CloudinaryUploadResponse, Error, File>({
    mutationKey: ["uploader"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mobil_holder");
      formData.append("folder", "mobiHolder");
      let resp = await axios.post(uploadUrl, formData);
      return resp.data;
    },
  });
  return resp;
};
// export const use_new_Uploader = () => {
//   const uploadUrl = `${import.meta.env.VITE_CLOUDINARY_URL}`;
//   let resp = useMutation({
//     mutationKey: ["uploader"],
//     mutationFn: async (file: File) => {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "mobil_holder");
//       formData.append("folder", "mobiHolder");
//       let resp = await axios.post(uploadUrl, formData);
//       return resp.data;
//     },
//   });
//   return resp;
// };

export default useFileUpload;
