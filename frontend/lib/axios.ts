import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

import { APP_CONFIG } from "@/constants/app";

const api = axios.create({
    baseURL: APP_CONFIG.API_BASE_URL,
    timeout: APP_CONFIG.REQUEST_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (process.env.NODE_ENV === "development") {
            console.groupCollapsed(
                `🚀 ${config.method?.toUpperCase()} ${config.url}`
            );

            console.log("Base URL:", config.baseURL);
            console.log("Headers:", config.headers);
            console.log("Params:", config.params);
            console.log("Data:", config.data);

            console.groupEnd();
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        if (process.env.NODE_ENV === "development") {
            console.groupCollapsed(
                `✅ ${response.status} ${response.config.url}`
            );

            console.log(response.data);

            console.groupEnd();
        }

        return response;
    },
    (error: AxiosError) => {
        if (process.env.NODE_ENV === "development") {
            console.groupCollapsed("❌ API Error");

            console.error(error);

            console.groupEnd();
        }

        return Promise.reject(error);
    }
);

export default api;