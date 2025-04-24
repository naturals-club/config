"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const client_1 = require("./client");
const crud_1 = require("./crud");
const chats_1 = require("./chats");
exports.api = {
    paymentMethods: new crud_1.CRUD("payment-methods"),
    documentTypes: new crud_1.CRUD("document-types"),
    countries: new crud_1.CRUD("countries"),
    exercises: new crud_1.CRUD("exercises"),
    students: new crud_1.CRUD("students"),
    routines: new crud_1.CRUD("routines"),
    consults: new crud_1.CRUD("consults"),
    workouts: new crud_1.CRUD("workouts"),
    products: new crud_1.CRUD("products"),
    states: new crud_1.CRUD("states"),
    diets: new crud_1.CRUD("diets"),
    foods: new crud_1.CRUD("foods"),
    users: new crud_1.CRUD("users"),
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
            list: (params = {}) => client_1.client.get(`/contacts/forms?${new URLSearchParams(params).toString()}`),
            get: (formId) => client_1.client.get(`/contacts/forms/${formId}`),
        }),
        orders: (contactId) => ({
            create: (data) => client_1.client.post(`/contacts/orders`, { ...data, contact: contactId }),
            get: (orderId) => client_1.client.get(`/contacts/orders/${orderId}`),
        }),
        tasks: new crud_1.CRUD(`contacts/tasks`)
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
