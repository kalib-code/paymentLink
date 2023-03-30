import axios from "axios";
import { DataProvider, HttpError } from "@refinedev/core";

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };
        return Promise.reject(customError);
    },
);

export const nextDataProvider = (apiUrl: string): DataProvider => ({
    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;
        const { data } = await axiosInstance.post(url, variables);
        return { data };
    },
    getList: async ({ resource }) => Promise.resolve({} as any),
    update: ({ resource, id, variables, meta }) => Promise.resolve({} as any),
    deleteOne: ({ resource, id, variables, meta }) => Promise.resolve({} as any),
    getOne: ({ resource, id, meta }) => Promise.resolve({} as any),
    getApiUrl: () => apiUrl,
    getMany: ({ resource, ids, meta }) => Promise.resolve({} as any),
    createMany: ({ resource, variables, meta }) => Promise.resolve({} as any),
    deleteMany: ({ resource, ids, variables, meta }) => Promise.resolve({} as any),
    updateMany: ({ resource, ids, variables, meta }) => Promise.resolve({} as any),
    custom: ({ url, method, filters, sorters, payload, query, headers, meta }) => Promise.resolve({} as any),
});
