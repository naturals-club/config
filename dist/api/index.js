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
    consults: new crud_1.CRUD("consults"),
    states: new crud_1.CRUD("states"),
    foods: new crud_1.CRUD("foods"),
    users: new crud_1.CRUD("users"),
    plans: new crud_1.CRUD("plans"),
    chats: chats_1.Chat,
    contacts: crud_1.CRUD.merge("contacts", {
        forms: (contactId) => ({
            create: (data) => client_1.client.post(`/contacts/forms`, { ...data, contact: contactId }),
            get: (formId) => client_1.client.get(`/contacts/forms/${formId}`),
        }),
        orders: (contactId) => ({
            create: (data) => client_1.client.post(`/contacts/orders`, { ...data, contact: contactId }),
            get: (orderId) => client_1.client.get(`/contacts/orders/${orderId}`),
        }),
        tasks: new crud_1.CRUD(`contacts/tasks`)
    }),
    setup: {
        setAuthorization: (token) => {
            client_1.client.setHeaders({ Authorization: `Bearer ${token}` });
        }
    }
};
