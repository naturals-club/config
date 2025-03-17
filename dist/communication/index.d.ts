export declare const communication: {
    whatsapp: {
        message: {
            send: ({ conversationSid, message }: SendMessageParams) => Promise<StatusResponse>;
        };
        conversations: {
            list: () => Promise<WhatsAppConversationListResponse>;
            get: (conversationSid: string) => Promise<WhatsAppConversationResponse>;
        };
    };
    email: {
        send: ({ recipient, subject, content, html, template, variables }: SendEmailParams) => Promise<StatusResponse>;
    };
    broadcast: {
        send: ({ recipient, phone, subject, template, variables }: SendBroadcastParams) => Promise<StatusResponse>;
    };
    status: {
        check: () => Promise<StatusResponse>;
    };
    slack: {
        message: {
            send: ({ channel, text }: SlackMessageParams) => Promise<StatusResponse>;
        };
        channels: {
            list: () => Promise<SlackChannelsResponse>;
        };
    };
};
