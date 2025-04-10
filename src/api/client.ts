import { ENV } from '../env';
import '../logger';

export interface RequestConfig {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

export class HttpClient {
  private static instance: HttpClient;
  private defaultHeaders: HeadersInit;
  public defaultUrl: string;

  private constructor(baseUrl?: string, token?: string) {
    this.defaultUrl = baseUrl || ENV.NC_API_URL;
    this.defaultHeaders = {
      'Authorization': `Bearer ${token || ENV.NC_API_TOKEN}`,
      'Content-Type': 'application/json'
    };
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public static cloneInstance(baseUrl?: string, token?: string): HttpClient {
    return new HttpClient(baseUrl, token);
  }

  setBaseUrl(url: string) {
    this.defaultUrl = url;
  }

  setAuthorization(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      "Authorization": `Bearer ${token}`,
    };
  }

  setHeaders(headers: Record<string, any>) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers
    };
  }

  async get<T>(url: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>('GET', url, config);
  }

  async post<T>(url: string, body: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>('POST', url, { ...config, body });
  }

  async put<T>(url: string, body?: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>('PUT', url, { ...config, body });
  }

  async delete<T>(url: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>('DELETE', url, config);
  }

  private async request<T>(method: string, url: string, config: RequestConfig): Promise<T> {
    const fullUrl = this.defaultUrl + url;
    const headers: HeadersInit = { ...this.defaultHeaders, ...config.headers };
    let body: BodyInit | null = null;

    if (config.body) {
      body = config.body instanceof FormData ? config.body : JSON.stringify(config.body);
    }

    console.info(`Requesting ${method}: ${fullUrl}`, { headers, body });

    try {
      const response = await fetch(fullUrl, { method, headers, body });
      let data = response as any;

      if (response.headers.get('Content-Type')?.includes('application/json'))
        data = await response.json().catch(() => null);

      if (!response.ok)
        throw new Error(data?.message || `Request failed with status ${response.status}`);

      console.info(`Response from ${method}: ${fullUrl}`);
      return data;
    } catch (error) {
      console.error(`Request failed for ${method} ${fullUrl}`, { error });
      throw error;
    }
  }
}

export const client = HttpClient.getInstance();
export default client;