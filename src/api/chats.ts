import { client } from "./client";

export interface CreateChatParams {
  refer_id: string; // <WA_ID>
  thread_id: string; // <THREAD_ID>
  ai_enabled: boolean; // <BOOLEAN>
  profile_picture?: string; // <URL>
}

export const Chat = {
  status: () => client.get("/chats/instance/status") as any,
  qrcode: () => client.get("/chats/instance/qr-code") as any,
  list: async () => client.get("/chats") as any,
  get: async (id: string, conversationSid?: string, firstMessage?: any) => {
    const chat = await client.get(`/chats?refer_id=${id}`).then(({ data }: any) => data?.items?.[0]);

    if (!!chat && !!chat.id) return chat;

    if (!conversationSid || !firstMessage)
      throw new Error("Conversation SID and first message are required to create a new chat");

    console.log(`==== [${id}] Creating OpenAI thread`);
    const { id: threadId } = await fetch("https://api.openai.com/v1/threads", {
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
            vector_store_ids: [process.env.OPENAI_VECTOR_STORE_SALES as string],
          }
        }
      })
    }).then(res => res.json());

    console.log(`==== [${id}] Creating contact on Naturals`);
    const { data } = await client.post(`/chats`, {
      ai_enabled: true,
      refer_id: id,
      thread_id: threadId,
      conversation_id: conversationSid,
    }) as any;

    return data;
  },
  create: async (data: CreateChatParams) => client.post(`/chats`, data) as any,
  update: Object.assign(
    async (id: string, data: any) => client.put(`/chats/${id}`, data) as any,
    {
      lastMessage: async (id: string, params: { content: { id: string, body: string }, created_at: Date }) => client.put(`/chats/${id}/last-message`, params) as any,
      agent: async (id: string) => client.put(`/chats/${id}/ai`) as any,
    }
  ),
  conversations: {
    ai: (id: string | number, enabled: boolean) => client.put(`/chats/${id}/ai`, { enabled }),
    list: () => client.get("/chats/conversations"),
    messages: {
      send: (id: string | number, message: string) => client.post(`/chats/conversations/${id}/messages`, { message }),
      get: (id: string | number) => client.get(`/chats/conversations/${id}`),
    }
  }
}