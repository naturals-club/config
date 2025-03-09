"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const client_1 = require("./client");
exports.Chat = {
    status: () => client_1.client.get("/chats/instance/status"),
    qrcode: () => client_1.client.get("/chats/instance/qr-code"),
    list: async () => client_1.client.get("/chats"),
    get: async (id) => client_1.client.get(`/chats?refer_id=${id}`).then(({ data }) => data?.items?.[0]),
    create: async (data) => client_1.client.post(`/chats`, data),
    update: Object.assign(async (id, data) => client_1.client.put(`/chats/${id}`, data), {
        agent: async (id) => client_1.client.put(`/chats/${id}/ai`),
    }),
    conversations: {
        ai: (id, enabled) => client_1.client.put(`/chats/${id}/ai`, { enabled }),
        list: () => client_1.client.get("/chats/conversations"),
        messages: {
            send: (id, message) => client_1.client.post(`/chats/conversations/${id}/messages`, { message }),
            get: (id) => client_1.client.get(`/chats/conversations/${id}`),
        }
    }
};
