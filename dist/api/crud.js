"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD = exports.client = void 0;
const client_1 = require("./client");
const env_1 = __importDefault(require("../env"));
exports.client = new client_1.HttpClient(env_1.default.NC_API_URL, {
    "Authorization": `Bearer ${env_1.default.NC_API_TOKEN}`,
});
class CRUD {
    entity;
    client;
    constructor(entity) {
        this.entity = entity;
        this.client = exports.client; // Usando o HttpClient global
    }
    async list(params) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await this.client.get(`/${this.entity}?${queryString}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error fetching ${this.entity} list:`, error);
            throw error;
        }
    }
    async get(id) {
        try {
            const response = await this.client.get(`/${this.entity}/${id}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error fetching ${this.entity} with id ${id}:`, error);
            throw error;
        }
    }
    async create(data) {
        try {
            const response = await this.client.post(`/${this.entity}`, data);
            return response.data;
        }
        catch (error) {
            console.error(`Error creating ${this.entity}:`, error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const response = await this.client.put(`/${this.entity}/${id}`, data);
            return response.data;
        }
        catch (error) {
            console.error(`Error updating ${this.entity} with id ${id}:`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const response = await this.client.delete(`/${this.entity}/${id}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error deleting ${this.entity} with id ${id}:`, error);
            throw error;
        }
    }
}
exports.CRUD = CRUD;
