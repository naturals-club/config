import { HttpClient } from "./client";
import ENV from "../env";

export const client = new HttpClient(ENV.NC_API_URL, {
  "Authorization": `Bearer ${ENV.NC_API_TOKEN}`,
});

export class CRUD {
  private entity: string;
  private client: HttpClient;

  constructor(entity: string) {
    this.entity = entity;
    this.client = client;  // Usando o HttpClient global
  }

  async list(params?: any) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.client.get(`/${this.entity}?${queryString}`) as any;
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.entity} list:`, error);
      throw error;
    }
  }

  async get(id: string | number) {
    try {
      const response = await this.client.get(`/${this.entity}/${id}`) as any;
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${this.entity} with id ${id}:`, error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const response = await this.client.post(`/${this.entity}`, data) as any;
      return response.data;
    } catch (error) {
      console.error(`Error creating ${this.entity}:`, error);
      throw error;
    }
  }

  async update(id: string | number, data: any) {
    try {
      const response = await this.client.put(`/${this.entity}/${id}`, data) as any;
      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.entity} with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number) {
    try {
      const response = await this.client.delete(`/${this.entity}/${id}`) as any;
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${this.entity} with id ${id}:`, error);
      throw error;
    }
  }
}
