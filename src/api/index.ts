import { client } from "./client";
import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  workoutSessions: new CRUD("workout-sessions"),
  paymentMethods: new CRUD("payment-methods"),
  documentTypes: new CRUD("document-types"),
  countries: new CRUD("countries"),
  exercises: CRUD.merge("exercises", {
    infosRequest: (id: string, comment: string) => client.post(`/exercises/${id}/infos-request`, { comment }),
  }),
  trainings: CRUD.merge("trainings", {
    levels: new CRUD("trainings/levels"),
  }),
  students: new CRUD("students"),
  routines: new CRUD("routines"),
  consults: new CRUD("consults"),
  workouts: CRUD.merge("workouts", {
    sessions: new CRUD("workout-sessions"),
  }),
  products: new CRUD("products"),
  academy: CRUD.merge("academy", {
    tracks: new CRUD("academy/tracks"),
  }),
  states: new CRUD("states"),
  diets: new CRUD("diets"),
  foods: new CRUD("foods"),
  users: new CRUD("users"),
  meals: new CRUD("meals"),
  plans: new CRUD("plans"),
  chats: Chat,
  legal: {
    privacy: () => client.get("/legal/privacy-policies", {
      headers: {
        "Content-Type": "text/plain"
      }
    }),
    terms: () => client.get("/legal/terms-of-use", {
      headers: {
        "Content-Type": "text/plain"
      }
    }),
  },
  contacts: CRUD.merge("contacts", {
    forms: (contactId: string | number) => ({
      create: (data: any) => client.post(`/contacts/forms`, { ...data, contact: contactId }),
      list: (params: any = {}) =>
        client
          .get(`/contacts/forms?${new URLSearchParams({ ...params, contact: contactId }).toString()}`)
          .then((res: any) => res.data),
      get: (formId: string | number) => client.get(`/contacts/forms/${formId}`),
      addQuestion: (formId: string | number, question: any) =>
        client.post(`/contacts/forms/${formId}/questions`, { questions: [question] }),
      updateStatus: (formId: string | number, status: "completed" | string) =>
        client.put(`/contacts/forms/${formId}/status`, { status }),
    }),
    orders: (contactId: string) => ({
      create: (data: any) => client.post(`/contacts/orders`, { ...data, contact: contactId }),
      get: (orderId: string | number) => client.get(`/contacts/orders/${orderId}`),
    }),
    tasks: CRUD.merge(`contacts/tasks`, {
      updateStatus: (taskId: string | number, status: "finished" | "pending" | "under_analysis") => client.put(`/contacts/tasks/${taskId}/status`, { status }),
    }),
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
    refresh: (refreshToken: string) => client.put("/auth", {}, { headers: { Authorization: `Bearer ${refreshToken}` } }),
    password: {
      forgot: (data: any) => client.post("/auth/forgot-password", data),
      reset: (data: any) => client.post("/auth/reset-password", data),
    }
  }
}