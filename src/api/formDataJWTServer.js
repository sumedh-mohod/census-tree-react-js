import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/pdf",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // const token =
  //   "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";
    const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosInstance;
