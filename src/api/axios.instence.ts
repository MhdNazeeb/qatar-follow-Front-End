import { getLocalData } from "@/utils/locallStorage";
import axios from "axios";
const baseurl = "https://qatarfollow.xyz/v1/admin";
// const baseurl = "http://localhost:3005/v1/admin"


const adminApi = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",

  },
});
// Add request interceptor
adminApi.interceptors.request.use(
  (config) => {
    const { token } = getLocalData("user") || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
adminApi.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }

);

export default adminApi;
