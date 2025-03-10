"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.HttpClient = void 0;
const logger_1 = require("../logger");
const env_1 = require("../env");
class HttpClient {
    defaultUrl;
    defaultHeaders;
    constructor() {
        this.defaultUrl = env_1.ENV.NEXT_PUBLIC_NC_API_URL;
        this.defaultHeaders = {
            'Authorization': `Bearer ${env_1.ENV.NEXT_PUBLIC_NC_API_TOKEN}`,
            'Content-Type': 'application/json'
        };
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
            if (config.body instanceof FormData) {
                body = config.body;
            }
            else {
                body = JSON.stringify(config.body);
            }
        }
        logger_1.logger.info(`Requesting ${method}: ${fullUrl}`, { headers, body });
        try {
            const response = await fetch(fullUrl, { method, headers, body });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(data?.message || `Request failed with status ${response.status}`);
            }
            logger_1.logger.info(`Response from ${method}: ${fullUrl}`, data);
            return data;
        }
        catch (error) {
            logger_1.logger.error(`Request failed for ${method} ${fullUrl}`, { error });
            throw error;
        }
    }
}
exports.HttpClient = HttpClient;
exports.client = new HttpClient();
exports.default = exports.client;
