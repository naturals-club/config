import axios, { AxiosInstance } from 'axios';
import { ENV } from '../env';

type Client = AxiosInstance & {
  setBaseUrl: (url: string) => void;
  setAuthorization: (token: string) => void;
  setHeaders: (headers: Record<string, any>) => void;
  cloneInstance: (baseUrl?: string, token?: string) => Client;
}

const client = axios.create({
  baseURL: ENV.NC_API_URL,
  headers: {
    'Authorization': `Bearer ${ENV.NC_API_TOKEN}`,
    'Content-Type': 'application/json',
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
  this.defaults.baseURL = url;
};

client.setAuthorization = function (token: string) {
  this.defaults.headers['Authorization'] = `Bearer ${token}`;
};

client.setHeaders = function (headers: Record<string, any>) {
  this.defaults.headers = {
    ...this.defaults.headers,
    ...headers,
  };
};

client.cloneInstance = function (baseUrl?: string, token?: string): Client {
  const instance = axios.create({
    baseURL: baseUrl || this.defaults.baseURL,
    headers: {
      ...this.defaults.headers,
      Authorization: token ? `Bearer ${token}` : this.defaults.headers['Authorization'],
    },
  }) as Client;

  instance.setBaseUrl = this.setBaseUrl;
  instance.setAuthorization = this.setAuthorization;
  instance.setHeaders = this.setHeaders;
  instance.cloneInstance = this.cloneInstance;

  return instance;
};

export default client;
export { client };