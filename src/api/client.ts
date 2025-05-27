import axios, { AxiosInstance } from 'axios';
import { ENV } from '../env';

type Client = AxiosInstance & {
  setBaseUrl: (url: string) => void;
  setAuthorization: (token: string) => void;
  setHeaders: (headers: Record<string, any>) => void;
  cloneInstance: (baseUrl?: string, token?: string) => Client;
}

const client: Client = axios.create({
  baseURL: ENV.NC_API_URL,
  headers: {
    'Authorization': `Bearer ${ENV.NC_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
}) as any;

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
  const clone = Object.assign({}, client);
  clone.defaults.baseURL = baseUrl || this.defaults.baseURL;
  clone.defaults.headers['Authorization'] = token ? `Bearer ${token}` : this.defaults.headers['Authorization'];
  return clone as Client;
};

export default client;
export { client };