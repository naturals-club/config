import { AxiosInstance } from "axios";
type Client = AxiosInstance & {
    setBaseUrl: (url: string) => void;
    setAuthorization: (token: string) => void;
    setHeaders: (headers: Record<string, any>) => void;
};
declare const client: Client;
export default client;
export { client };
