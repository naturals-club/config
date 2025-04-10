"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.HttpClient = void 0;
const env_1 = require("../env");
require("../logger");
class HttpClient {
    static instance;
    defaultHeaders;
    defaultUrl;
    constructor(baseUrl, token) {
        this.defaultUrl = baseUrl || env_1.ENV.NC_API_URL;
        this.defaultHeaders = {
            'Authorization': `Bearer ${token || env_1.ENV.NC_API_TOKEN}`,
            'Content-Type': 'application/json'
        };
    }
    static getInstance() {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }
    static cloneInstance(baseUrl, token) {
        return new HttpClient(baseUrl, token);
    }
    setBaseUrl(url) {
        this.defaultUrl = url;
    }
    setAuthorization(token) {
        this.defaultHeaders = {
            ...this.defaultHeaders,
            "Authorization": `Bearer ${token}`,
        };
    }
    setHeaders(headers) {
        this.defaultHeaders = {
            ...this.defaultHeaders,
            ...headers
        };
    }
    async get(url, config = {}) {
        return this.request('GET', url, config);
    }
    async post(url, body, config = {}) {
        return this.request('POST', url, { ...config, body });
    }
    async put(url, body, config = {}) {
        return this.request('PUT', url, { ...config, body });
    }
    async delete(url, config = {}) {
        return this.request('DELETE', url, config);
    }
    async request(method, url, config) {
        const fullUrl = this.defaultUrl + url;
        const headers = { ...this.defaultHeaders, ...config.headers };
        let body = null;
        if (config.body) {
            body = config.body instanceof FormData ? config.body : JSON.stringify(config.body);
        }
        console.info(`Requesting ${method}: ${fullUrl}`, { headers, body });
        try {
            const response = await fetch(fullUrl, { method, headers, body });
            let data = response;
            if (response.headers.get('Content-Type')?.includes('application/json'))
                data = await response.json().catch(() => null);
            if (!response.ok)
                throw new Error(data?.message || `Request failed with status ${response.status}`);
            console.info(`Response from ${method}: ${fullUrl}`);
            return data;
        }
        catch (error) {
            console.error(`Request failed for ${method} ${fullUrl}`, { error });
            throw error;
        }
    }
}
exports.HttpClient = HttpClient;
exports.client = HttpClient.getInstance();
exports.default = exports.client;
