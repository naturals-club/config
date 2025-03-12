declare interface SendMessageParams {
  conversationSid: string;
  message: string;
}

declare interface SendEmailParams {
  recipient: string;
  subject: string;
  content?: string;
  html?: string;
  template?: string;
  variables?: Record<string, string>;
}

declare interface SendBroadcastParams {
  recipient: string;
  phone: string;
  subject: string;
  template: string;
  variables: Record<string, string>;
}

declare interface SlackMessageParams {
  channel: string;
  text: string;
}

// Tipos de resposta genéricos
declare interface StatusResponse {
  status: boolean;
  message: string;
  [key: string]: any;
}

// Resposta do Slack Channels (Exemplo)
declare interface SlackChannelsResponse {
  status: boolean;
  channels: Array<{
    id: string;
    name: string;
    is_private: boolean;
    is_archived: boolean;
    num_members: number;
    created: number;
    topic: {
      value: string;
      creator: string;
      last_set: number;
    };
    purpose: {
      value: string;
      creator: string;
      last_set: number;
    };
  }>;
}

declare interface WhatsAppConversationListResponse {
  status: boolean;
  chats: Array<{
    accountSid: string;
    chatServiceSid: string;
    messagingServiceSid: string;
    sid: string;
    friendlyName: string | null;
    uniqueName: string | null;
    attributes: string;
    state: string;
    dateCreated: string;  // ISO 8601 date string
    dateUpdated: string;  // ISO 8601 date string
    lastMessage: {
      accountSid: string;
      chatServiceSid: string;
      conversationSid: string;
      sid: string;
      index: number;
      author: string;
      body: string;
      media: string | null;
      attributes: string;
      participantSid: string | null;
      dateCreated: string;  // ISO 8601 date string
      dateUpdated: string;  // ISO 8601 date string
      delivery: {
        delivered: string;
        read: string;
        undelivered: string;
        failed: string;
        total: number;
        sent: string;
      };
      contentSid: string | null;
    };
  }>;
}

declare interface WhatsAppConversationResponse {
  status: boolean;
  chat: {
    accountSid: string;
    chatServiceSid: string;
    messagingServiceSid: string;
    sid: string;
    friendlyName: string | null;
    uniqueName: string | null;
    attributes: string;
    state: string;
    dateCreated: string;  // ISO 8601 date string
    dateUpdated: string;  // ISO 8601 date string
    lastMessage: {
      accountSid: string;
      chatServiceSid: string;
      conversationSid: string;
      sid: string;
      index: number;
      author: string;
      body: string;
      media: string | null;
      attributes: string;
      participantSid: string | null;
      dateCreated: string;  // ISO 8601 date string
      dateUpdated: string;  // ISO 8601 date string
      delivery: {
        delivered: string;
        read: string;
        undelivered: string;
        failed: string;
        total: number;
        sent: string;
      };
      contentSid: string | null;
    };
  };
}