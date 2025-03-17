export interface RequestConfig {
    method?: string;
    headers?: HeadersInit;
    body?: any;
}
export declare class HttpClient {
    private defaultUrl;
    private defaultHeaders;
    constructor();
    setBaseUrl(url: string): void;
    setAuthorization(token: string): void;
    setHeaders(headers: Record<string, any>): void;
    get<T>(url: string, config?: RequestConfig): Promise<T>;
    post<T>(url: string, body: any, config?: RequestConfig): Promise<T>;
    put<T>(url: string, body?: any, config?: RequestConfig): Promise<T>;
    delete<T>(url: string, config?: RequestConfig): Promise<T>;
    private request;
}
export declare const client: HttpClient;
export default client;
