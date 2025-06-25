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
        "Authorization": `Bearer ${env_1.ENV.NC_API_TOKEN}`,
        "Content-Type": "application/json",
    },
});
exports.client = client;
client.interceptors.response.use((response) => {
    if (response.headers["Content-Type"]?.includes("json"))
        return response;
    return response?.data;
}, (error) => {
    console.error(JSON.stringify(error, null, 2));
    return Promise.reject(error);
});
client.setBaseUrl = function (url) {
    client.defaults.baseURL = url;
};
client.setAuthorization = function (token) {
    client.defaults.headers["Authorization"] = `Bearer ${token}`;
};
client.setHeaders = function (headers) {
    client.defaults.headers = {
        ...client.defaults.headers,
        ...headers,
    };
};
exports.default = client;
