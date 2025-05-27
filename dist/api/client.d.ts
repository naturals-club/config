import { AxiosInstance } from 'axios';
type Client = AxiosInstance & {
    setBaseUrl: (url: string) => void;
    setAuthorization: (token: string) => void;
    setHeaders: (headers: Record<string, any>) => void;
    cloneInstance: (baseUrl?: string, token?: string) => Client;
};
declare const client: Client;
export default client;
export { client };
