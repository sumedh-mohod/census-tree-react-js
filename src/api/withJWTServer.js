import axios from "axios";

var axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Content-Language": "browser",
  },
});

axiosInstance.interceptors.request.use(function (config) {
  // const token =
  //   "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";
    const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosInstance;
