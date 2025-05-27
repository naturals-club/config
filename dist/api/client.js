"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../env");
const client = axios_1.default.create({
    baseURL: env_1.ENV.NC_API_URL,
    headers: {
        'Authorization': `Bearer ${env_1.ENV.NC_API_TOKEN}`,
        'Content-Type': 'application/json',
    },
});
exports.client = client;
client.interceptors.response.use((response) => response?.data, (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
});
client.setBaseUrl = function (url) {
    this.defaults.baseURL = url;
};
client.setAuthorization = function (token) {
    this.defaults.headers['Authorization'] = `Bearer ${token}`;
};
client.setHeaders = function (headers) {
    this.defaults.headers = {
        ...this.defaults.headers,
        ...headers,
    };
};
client.cloneInstance = function (baseUrl, token) {
    const instance = axios_1.default.create({
        baseURL: baseUrl || this.defaults.baseURL,
        headers: {
            ...this.defaults.headers,
            Authorization: token ? `Bearer ${token}` : this.defaults.headers['Authorization'],
        },
    });
    instance.setBaseUrl = this.setBaseUrl;
    instance.setAuthorization = this.setAuthorization;
    instance.setHeaders = this.setHeaders;
    instance.cloneInstance = this.cloneInstance;
    return instance;
};
exports.default = client;
