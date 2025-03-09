import { client } from "./client";
import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  paymentMethods: new CRUD("payment-methods"),
  documentTypes: new CRUD("document-types"),
  countries: new CRUD("countries"),
  students: new CRUD("students"),
  contacts: Object.assign(new CRUD("contacts"), {
    forms: (userId: string) => ({
      create: (data: any) => client.post(`/contacts/${userId}/forms`, data),
    }),
    orders: (userId: string) => ({
      create: (data: any) => client.post(`/contacts/${userId}/orders`, data),
      get: (orderId: any) => client.get(`/contacts/${userId}/orders/${orderId}`),
    }),
  }),
  states: new CRUD("states"),
  users: new CRUD("users"),
  plans: new CRUD("plans"),
  chats: Chat,

  setup: {
    setAuthorization: (token: string) => {
      client.setHeaders({ Authorization: `Bearer ${token}` });
    }
  }
}