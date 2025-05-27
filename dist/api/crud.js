"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUD = void 0;
const client_1 = require("./client");
require("../logger");
class CRUD {
    entity;
    constructor(entity) {
        this.entity = entity;
    }
    async list(params = {}) {
        try {
            const response = await client_1.client.get(`/${this.entity}`, { params });
            return response?.data;
        }
        catch (error) {
            console.error(`Error fetching ${this.entity} list:`, error);
            throw error;
        }
    }
    async get(id) {
        try {
            const response = await client_1.client.get(`/${this.entity}/${id}`);
            return response?.data;
        }
        catch (error) {
            console.error(`Error fetching ${this.entity} with id ${id}:`, error);
            throw error;
        }
    }
    async create(data) {
        try {
            const response = await client_1.client.post(`/${this.entity}`, data);
            return response?.data;
        }
        catch (error) {
            console.error(`Error creating ${this.entity}:`, error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            const response = await client_1.client.put(`/${this.entity}/${id}`, data);
            return response?.data;
        }
        catch (error) {
            console.error(`Error updating ${this.entity} with id ${id}:`, error);
            throw error;
        }
    }
    async delete(id) {
        try {
            const response = await client_1.client.delete(`/${this.entity}/${id}`);
            return response?.data;
        }
        catch (error) {
            console.error(`Error deleting ${this.entity} with id ${id}:`, error);
            throw error;
        }
    }
    static merge(key, obj) {
        const instance = new CRUD(key);
        for (const key in obj)
            instance[key] = obj[key];
        return instance;
    }
}
exports.CRUD = CRUD;
