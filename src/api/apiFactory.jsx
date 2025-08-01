import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;
const baseURL = "https://api.mobiholder.tech/";
const apiClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
