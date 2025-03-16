"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const client_1 = require("./client");
const ai_1 = require("../ai");
exports.Chat = {
    status: () => client_1.client.get("/chats/instance/status"),
    qrcode: () => client_1.client.get("/chats/instance/qr-code"),
    list: async () => client_1.client.get("/chats"),
    get: async (id) => {
        const chat = await client_1.client.get(`/chats?refer_id=${id}`).then(({ data }) => data?.items?.[0]);
        if (!!chat && !!chat.id)
            return chat;
        console.log(`==== [${id}] Creating OpenAI thread`);
        const threadId = await ai_1.openai.thread.create(id);
        console.log(`==== [${id}] Creating contact on Naturals`);
        const { data } = await client_1.client.post(`/chats`, {
            ai_enabled: true,
            refer_id: id,
            thread_id: threadId,
        });
        return data;
    },
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
