"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const crud_1 = require("./crud");
exports.Chat = {
    status: () => crud_1.client.get("/chats/instance/status"),
    qrcode: () => crud_1.client.get("/chats/instance/qr-code"),
    list: async () => crud_1.client.get("/chats"),
    get: async (id) => crud_1.client.get(`/chats?refer_id=${id}`).then((res) => res.data.items[0]),
    create: async (data) => crud_1.client.post(`/chats`, data),
    update: Object.assign(async (id, data) => crud_1.client.put(`/chats/${id}`, data), {
        agent: async (id) => crud_1.client.put(`/chats/${id}/ai`),
    }),
    conversations: {
        ai: (id, enabled) => crud_1.client.put(`/chats/${id}/ai`, { enabled }),
        list: () => crud_1.client.get("/chats/conversations"),
        messages: {
            send: (id, message) => crud_1.client.post(`/chats/conversations/${id}/messages`, { message }),
            get: (id) => crud_1.client.get(`/chats/conversations/${id}`),
        }
    }
};
