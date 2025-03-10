import { client } from "./client";
import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  paymentMethods: new CRUD("payment-methods"),
  documentTypes: new CRUD("document-types"),
  countries: new CRUD("countries"),
  students: new CRUD("students"),
  consults: new CRUD("consults"),
  states: new CRUD("states"),
  users: new CRUD("users"),
  plans: new CRUD("plans"),
  chats: Chat,
  contacts: CRUD.merge("contacts", {
    forms: (userId: string | number) => ({
      create: (data: any) => client.post(`/contacts/${userId}/forms`, data),
      get: (formId: string | number) => client.get(`/contacts/${userId}/forms/${formId}`),
    }),
    orders: (userId: string) => ({
      create: (data: any) => client.post(`/contacts/${userId}/orders`, data),
      get: (orderId: string | number) => client.get(`/contacts/${userId}/orders/${orderId}`),
    }),
  }),
  setup: {
    setAuthorization: (token: string) => {
      client.setHeaders({ Authorization: `Bearer ${token}` });
    }
  }
}