export declare const communication: {
    whatsapp: {
        message: {
            send: ({ conversationSid, message }: SendMessageParams) => Promise<import("axios").AxiosResponse<StatusResponse, any>>;
        };
        conversations: {
            list: () => Promise<import("axios").AxiosResponse<WhatsAppConversationListResponse, any>>;
            get: (conversationSid: string) => Promise<import("axios").AxiosResponse<WhatsAppConversationResponse, any>>;
        };
    };
    email: {
        send: ({ recipient, subject, content, html, template, variables }: SendEmailParams) => Promise<import("axios").AxiosResponse<StatusResponse, any>>;
    };
    broadcast: {
        send: ({ recipient, phone, subject, template, variables }: SendBroadcastParams) => Promise<import("axios").AxiosResponse<StatusResponse, any>>;
    };
    status: {
        check: () => Promise<import("axios").AxiosResponse<StatusResponse, any>>;
    };
    slack: {
        message: {
            send: ({ channel, text }: SlackMessageParams) => Promise<import("axios").AxiosResponse<StatusResponse, any>>;
        };
        channels: {
            list: () => Promise<import("axios").AxiosResponse<SlackChannelsResponse, any>>;
        };
    };
};
