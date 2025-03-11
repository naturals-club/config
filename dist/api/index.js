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
    students: new crud_1.CRUD("students"),
    consults: new crud_1.CRUD("consults"),
    states: new crud_1.CRUD("states"),
    users: new crud_1.CRUD("users"),
    plans: new crud_1.CRUD("plans"),
    tasks: (userId) => {
        return new crud_1.CRUD(`contacts/tasks/${userId}/tasks`);
    },
    chats: chats_1.Chat,
    contacts: crud_1.CRUD.merge("contacts", {
        forms: (userId) => ({
            create: (data) => client_1.client.post(`/contacts/${userId}/forms`, data),
            get: (formId) => client_1.client.get(`/contacts/${userId}/forms/${formId}`),
        }),
        orders: (userId) => ({
            create: (data) => client_1.client.post(`/contacts/${userId}/orders`, data),
            get: (orderId) => client_1.client.get(`/contacts/${userId}/orders/${orderId}`),
        }),
    }),
    setup: {
        setAuthorization: (token) => {
            client_1.client.setHeaders({ Authorization: `Bearer ${token}` });
        }
    }
};
