import axios, { AxiosInstance } from "axios";
import { ENV } from "../env";

type Client = AxiosInstance & {
  getHeaders: () => Record<string, any>;
  setBaseUrl: (url: string) => void;
  setAuthorization: (token: string) => void;
  setHeaders: (headers: Record<string, any>) => void;
}

const client = axios.create({
  baseURL: ENV.NC_API_URL,
  headers: {
    "Authorization": `Bearer ${ENV.NC_API_TOKEN}`,
    "Content-Type": "application/json",
  },
}) as Client;

client.interceptors.response.use((response: any) => {
  if (response.headers["Content-Type"]?.includes("json")) return response;
  return response?.data;
}, (error) => {
  console.error(JSON.stringify(error, null, 2));
  return Promise.reject(error);
});

client.setBaseUrl = function (url: string) {
  client.defaults.baseURL = url;
};

client.setAuthorization = function (token: string) {
  client.defaults.headers["Authorization"] = `Bearer ${token}`;
};

client.setHeaders = function (headers: Record<string, any>) {
  client.defaults.headers = {
    ...client.defaults.headers,
    ...headers,
  };
};

client.getHeaders = function () {
  return client.defaults.headers;
};

export default client;
export { client };