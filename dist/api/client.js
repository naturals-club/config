"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const logger_1 = __importDefault(require("../logger"));
class HttpClient {
    defaultUrl;
    defaultHeaders;
    constructor(baseUrl, headers = {}) {
        this.defaultUrl = baseUrl;
        this.defaultHeaders = headers;
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
                headers['Content-Type'] = 'application/json';
            }
        }
        logger_1.default.info(`Requesting ${method}: ${fullUrl}`, { headers, body });
        try {
            const response = await fetch(fullUrl, { method, headers, body });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(data?.message || `Request failed with status ${response.status}`);
            }
            logger_1.default.info(`Response from ${method}: ${fullUrl}`, { data });
            return data.data;
        }
        catch (error) {
            logger_1.default.error(`Request failed for ${method} ${fullUrl}`, { error });
            throw error;
        }
    }
}
exports.HttpClient = HttpClient;
exports.default = HttpClient;
