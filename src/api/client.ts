import { logger } from '../logger';
import { ENV } from "../env";

export interface RequestConfig {
  method?: string;
  headers?: HeadersInit;
  body?: any;
}

export class HttpClient {
  private static instance: HttpClient;
  private defaultUrl: string;
  private defaultHeaders: HeadersInit;

  private constructor() {
    this.defaultUrl = ENV.NEXT_PUBLIC_NC_API_URL;
    this.defaultHeaders = {
      'Authorization': `Bearer ${ENV.NC_API_TOKEN}`,
      'Content-Type': 'application/json'
    };
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  setBaseUrl(url: string) {
    this.defaultUrl = url;
  }

  setHeaders(headers: Record<string, any>) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers
    }
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
      if (config.body instanceof FormData) {
        body = config.body;
      } else {
        body = JSON.stringify(config.body);
      }
    }

    logger.info(`Requesting ${method}: ${fullUrl}`, { headers, body });

    try {
      const response = await fetch(fullUrl, { method, headers, body });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
      }

      logger.info(`Response from ${method}: ${fullUrl}`, data);
      return data;
    } catch (error) {
      logger.error(`Request failed for ${method} ${fullUrl}`, { error });
      throw error;
    }
  }
}

export const client = HttpClient.getInstance();
export default client;