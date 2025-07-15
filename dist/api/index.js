"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const client_1 = require("./client");
const crud_1 = require("./crud");
const chats_1 = require("./chats");
exports.api = {
    workoutSessions: new crud_1.CRUD("workout-sessions"),
    paymentMethods: new crud_1.CRUD("payment-methods"),
    documentTypes: new crud_1.CRUD("document-types"),
    countries: new crud_1.CRUD("countries"),
    exercises: crud_1.CRUD.merge("exercises", {
        infosRequest: (id, comment) => client_1.client.post(`/exercises/${id}/infos-request`, { comment }),
    }),
    trainings: crud_1.CRUD.merge("trainings", {
        levels: new crud_1.CRUD("trainings/levels"),
    }),
    students: new crud_1.CRUD("students"),
    routines: new crud_1.CRUD("routines"),
    consults: new crud_1.CRUD("consults"),
    workouts: crud_1.CRUD.merge("workouts", {
        sessions: new crud_1.CRUD("workout-sessions"),
    }),
    products: new crud_1.CRUD("products"),
    academy: crud_1.CRUD.merge("academy", {
        tracks: new crud_1.CRUD("academy/tracks"),
    }),
    states: new crud_1.CRUD("states"),
    diets: new crud_1.CRUD("diets"),
    foods: new crud_1.CRUD("foods"),
    users: new crud_1.CRUD("users"),
    meals: new crud_1.CRUD("meals"),
    plans: new crud_1.CRUD("plans"),
    chats: chats_1.Chat,
    legal: {
        privacy: () => client_1.client.get("/legal/privacy-policies", {
            headers: {
                "Content-Type": "text/plain"
            }
        }),
        terms: () => client_1.client.get("/legal/terms-of-use", {
            headers: {
                "Content-Type": "text/plain"
            }
        }),
    },
    contacts: crud_1.CRUD.merge("contacts", {
        forms: (contactId) => ({
            create: (data) => client_1.client.post(`/contacts/forms`, { ...data, contact: contactId }),
            list: (params = {}) => client_1.client
                .get(`/contacts/forms?${new URLSearchParams({ ...params, contact: contactId }).toString()}`)
                .then((res) => res.data),
            get: (formId) => client_1.client.get(`/contacts/forms/${formId}`),
            addQuestion: (formId, question) => client_1.client.post(`/contacts/forms/${formId}/questions`, { questions: [question] }),
            updateStatus: (formId, status) => client_1.client.put(`/contacts/forms/${formId}/status`, { status }),
        }),
        orders: (contactId) => ({
            create: (data) => client_1.client.post(`/contacts/orders`, { ...data, contact: contactId }),
            get: (orderId) => client_1.client.get(`/contacts/orders/${orderId}`),
        }),
        tasks: crud_1.CRUD.merge(`contacts/tasks`, {
            updateStatus: (taskId, status) => client_1.client.put(`/contacts/tasks/${taskId}/status`, { status }),
        }),
    }),
    setup: {
        setBaseUrl: client_1.client.setBaseUrl,
        setHeaders: client_1.client.setHeaders,
        setAuthorization: (token) => {
            client_1.client.setHeaders({ Authorization: `Bearer ${token}` });
        }
    },
    auth: {
        me: () => client_1.client.get("/user"),
        signin: (data) => client_1.client.post("/auth", data),
        refresh: (refreshToken) => client_1.client.put("/auth", {}, { headers: { Authorization: `Bearer ${refreshToken}` } }),
        password: {
            forgot: (data) => client_1.client.post("/auth/forgot-password", data),
            reset: (data) => client_1.client.post("/auth/reset-password", data),
        }
    }
};
