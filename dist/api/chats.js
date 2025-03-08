"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const client_1 = __importDefault(require("./client"));
exports.Chat = {
    status: () => client_1.default.get("/chats/instance/status"),
    qrcode: () => client_1.default.get("/chats/instance/qr-code"),
    list: async () => client_1.default.get("/chats"),
    get: async (id) => client_1.default.get(`/chats?refer_id=${id}`).then((res) => res.items[0]),
    create: async (data) => client_1.default.post(`/chats`, data),
    update: Object.assign(async (id, data) => client_1.default.put(`/chats/${id}`, data), {
        agent: async (id) => client_1.default.put(`/chats/${id}/ai`),
    }),
    conversations: {
        ai: (id, enabled) => client_1.default.put(`/chats/${id}/ai`, { enabled }),
        list: () => client_1.default.get("/chats/conversations"),
        messages: {
            send: (id, message) => client_1.default.post(`/chats/conversations/${id}/messages`, { message }),
            get: (id) => client_1.default.get(`/chats/conversations/${id}`),
        }
    }
};
