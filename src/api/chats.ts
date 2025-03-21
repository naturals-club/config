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
  get: async (id: string) => {
    const chat = await client.get(`/chats?refer_id=${id}`).then(({ data }: any) => data?.items?.[0]);

    if (!!chat && !!chat.id) return chat;

    console.log(`==== [${id}] Creating OpenAI thread`);
    const { id: threadId } = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        metadata: { userId: id },
        tool_resources: {
          file_search: {
            vector_store_ids: [process.env.OPENAI_VECTOR_STORE as string],
          }
        }
      })
    }).then(res => res.json());

    console.log(`==== [${id}] Creating contact on Naturals`);
    const { data } = await client.post(`/chats`, {
      ai_enabled: true,
      refer_id: id,
      thread_id: threadId,
    }) as any;

    return data;
  },
  create: async (data: CreateChatParams) => client.post(`/chats`, data) as any,
  update: Object.assign(
    async (id: string, data: any) => client.put(`/chats/${id}`, data) as any,
    {
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