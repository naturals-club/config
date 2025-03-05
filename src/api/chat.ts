import { client } from "../api/crud";

export interface CreateChatParams {
  refer_id: string; // <WA_ID>
  thread_id: string; // <THREAD_ID>
  ai_enabled: boolean; // <BOOLEAN>
  profile_picture: string; // <URL>
}

export const Chat = {
  status: () => client.get("/chats/instance/status") as any,
  qrcode: () => client.get("/chats/instance/qr-code") as any,
  list: async () => client.get("/chats") as any,
  get: async (id: string) => client.get(`/chats?refer_id=${id}`).then((res: any) => res.data.items[0]),
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