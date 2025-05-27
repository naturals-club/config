export interface CreateChatParams {
    refer_id: string;
    thread_id: string;
    ai_enabled: boolean;
    profile_picture?: string;
}
export declare const Chat: {
    status: () => any;
    qrcode: () => any;
    list: () => Promise<any>;
    get: (id: string, conversationSid?: string, firstMessage?: any) => Promise<any>;
    create: (data: CreateChatParams) => Promise<any>;
    update: ((id: string, data: any) => Promise<any>) & {
        lastMessage: (id: string, params: {
            content: {
                id: string;
                body: string;
            };
            created_at: Date;
        }) => Promise<any>;
        agent: (id: string) => Promise<any>;
    };
    conversations: {
        ai: (id: string | number, enabled: boolean) => Promise<import("axios").AxiosResponse<any, any>>;
        list: () => Promise<import("axios").AxiosResponse<any, any>>;
        messages: {
            send: (id: string | number, message: string) => Promise<import("axios").AxiosResponse<any, any>>;
            get: (id: string | number) => Promise<import("axios").AxiosResponse<any, any>>;
        };
    };
};
