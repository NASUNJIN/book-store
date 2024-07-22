import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3001";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "content-type" : "application/json",
        },
        withCredentials: true,
        ...config,
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Axios Error:', error);
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();