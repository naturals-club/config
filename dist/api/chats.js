"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const client_1 = require("./client");
exports.Chat = {
    status: () => client_1.client.get("/chats/instance/status"),
    qrcode: () => client_1.client.get("/chats/instance/qr-code"),
    list: async () => client_1.client.get("/chats"),
    get: async (id, conversationSid, firstMessage) => {
        const chat = await client_1.client.get(`/chats?refer_id=${id}`).then(({ data }) => data?.items?.[0]);
        if (!!chat && !!chat.id && chat.thread_id)
            return chat;
        let threadId = chat?.thread_id;
        if (!threadId) {
            console.log(`==== [${id}] Creating OpenAI thread`);
            const res = await fetch("https://api.openai.com/v1/threads", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                    "OpenAI-Beta": "assistants=v2",
                },
                body: JSON.stringify({
                    metadata: { userId: id },
                    tool_resources: {
                        file_search: {
                            vector_store_ids: [process.env.OPENAI_VECTOR_STORE_SALES],
                        }
                    }
                })
            }).then(res => res.json());
            console.log(res);
            threadId = res.id;
        }
        if (chat?.id && !chat?.thread_id) {
            console.log(`==== [${id}] Updating OpenAI thread`);
            await client_1.client.put(`/chats/${chat.id}`, { thread_id: threadId });
            return { ...chat, thread_id: threadId };
        }
        console.log(`==== [${id}] Creating contact on Naturals`, {
            ai_enabled: true,
            refer_id: id,
            thread_id: threadId,
            conversation_id: conversationSid,
            first_message: firstMessage,
        });
        const { data } = await client_1.client.post(`/chats`, {
            ai_enabled: true,
            refer_id: id,
            thread_id: threadId,
            conversation_id: conversationSid,
            first_message: firstMessage,
        });
        return data;
    },
    create: async (data) => client_1.client.post(`/chats`, data),
    update: Object.assign(async (id, data) => client_1.client.put(`/chats/${id}`, data), {
        lastMessage: async (id, params) => client_1.client.put(`/chats/${id}/last-message`, params),
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
