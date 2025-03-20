import { client } from "./client";
import '../logger';

export class CRUD {
  private entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }

  async list(params: any = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await client.get(`/${this.entity}?${queryString}`) as any;
      return response?.data;
    } catch (error) {
      console.error(`Error fetching ${this.entity} list:`, error);
      throw error;
    }
  }

  async get(id: string | number) {
    try {
      const response = await client.get(`/${this.entity}/${id}`) as any;
      return response?.data;
    } catch (error) {
      console.error(`Error fetching ${this.entity} with id ${id}:`, error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const response = await client.post(`/${this.entity}`, data) as any;
      return response?.data;
    } catch (error) {
      console.error(`Error creating ${this.entity}:`, error);
      throw error;
    }
  }

  async update(id: string | number, data: any) {
    try {
      const response = await client.put(`/${this.entity}/${id}`, data) as any;
      return response?.data;
    } catch (error) {
      console.error(`Error updating ${this.entity} with id ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number) {
    try {
      const response = await client.delete(`/${this.entity}/${id}`) as any;
      return response?.data;
    } catch (error) {
      console.error(`Error deleting ${this.entity} with id ${id}:`, error);
      throw error;
    }
  }

  static merge(key: string, obj: Record<string, any>): CRUD & Record<string, any> {
    const instance = new CRUD(key);

    for (const key in obj)
      instance[key] = obj[key];

    return instance;
  }
}
