import { client } from "./client";
import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  paymentMethods: new CRUD("payment-methods"),
  documentTypes: new CRUD("document-types"),
  countries: new CRUD("countries"),
  exercises: new CRUD("exercises"),
  students: new CRUD("students"),
  routines: new CRUD("routines"),
  consults: new CRUD("consults"),
  workouts: new CRUD("workouts"),
  states: new CRUD("states"),
  diets: new CRUD("diets"),
  foods: new CRUD("foods"),
  users: new CRUD("users"),
  plans: new CRUD("plans"),
  chats: Chat,
  legal: {
    privay: () => client.get("/legal/privacy-policies"),
    terms: () => client.get("/legal/terms-of-service"),
  },
  contacts: CRUD.merge("contacts", {
    forms: (contactId: string | number) => ({
      create: (data: any) => client.post(`/contacts/forms`, { ...data, contact: contactId }),
      get: (formId: string | number) => client.get(`/contacts/forms/${formId}`),
    }),
    orders: (contactId: string) => ({
      create: (data: any) => client.post(`/contacts/orders`, { ...data, contact: contactId }),
      get: (orderId: string | number) => client.get(`/contacts/orders/${orderId}`),
    }),
    tasks: new CRUD(`contacts/tasks`)
  }),
  setup: {
    setBaseUrl: client.setBaseUrl,
    setHeaders: client.setHeaders,
    setAuthorization: (token: string) => {
      client.setHeaders({ Authorization: `Bearer ${token}` });
    }
  },
  auth: {
    me: () => client.get("/user"),
    signin: (data: any) => client.post("/auth", data),
    refresh: (refreshToken) => client.put("/auth", {}, { headers: { Authorization: `Bearer ${refreshToken}` } }),
    password: {
      forgot: (data: any) => client.post("/auth/forgot-password", data),
      reset: (data: any) => client.post("/auth/reset-password", data),
    }
  }
}