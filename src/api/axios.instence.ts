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


// import axios from "axios";
// import { getLocalData, setLocalData } from "@/utils/locallStorage";

// const baseurl = "http://localhost:3005/v1/admin";

// const adminApi = axios.create({
//   baseURL: baseurl,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// adminApi.interceptors.request.use(
//   (config) => {
//     const { token } = getLocalData("user") || {};
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// adminApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const { refreshToken } = getLocalData("user") || {};

//     if (
//       error.response?.status === 401 &&
//     ) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = "Bearer " + token;
//             return axios(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const response = await axios.post(`${baseurl}/refresh-token`, {
//           refreshToken,
//         });
//         console.log(response,'response from refresh token');
        

//         const { accessToken, refreshToken: newRefreshToken } = response.data;

//         setLocalData("user", { token: accessToken, refreshToken: newRefreshToken });

//         adminApi.defaults.headers.common.Authorization = "Bearer " + accessToken;

//         processQueue(null, accessToken);

//         return adminApi(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         window.location.href = "/login";
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default adminApi;
