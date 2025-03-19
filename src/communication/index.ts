import { HttpClient } from '../api/client';
import ENV from '../env';

const client = HttpClient.cloneInstance();
client.setBaseUrl(ENV.NC_COMMUNICATION_API_URL);
client.setAuthorization(ENV.NC_COMMUNICATION_API_TOKEN);

export const communication = {
  // WhatsApp
  whatsapp: {
    message: {
      send: ({ conversationSid, message }: SendMessageParams) => client.post<StatusResponse>('api/messaging/whatsapp/message', { conversationSid, message }),
    },
    conversations: {
      list: () => client.get<WhatsAppConversationListResponse>('api/messaging/whatsapp/conversations'),
      get: (conversationSid: string) => client.get<WhatsAppConversationResponse>('api/messaging/whatsapp/conversations?id=' + conversationSid),
    },
  },

  // E-mail
  email: {
    send: ({ recipient, subject, content, html, template, variables }: SendEmailParams) => client.post<StatusResponse>('api/messaging/email', template
      ? { recipient, subject, template, variables }
      : { recipient, subject, content, html }),
  },

  // Mensagens em Massa
  broadcast: {
    send: ({ recipient, phone, subject, template, variables }: SendBroadcastParams) => client.post<StatusResponse>('api/messaging/broadcast', {
      recipient, phone, subject, template, variables,
    }),
  },

  // Status da API
  status: {
    check: (): Promise<StatusResponse> => client.get<StatusResponse>('api'),
  },

  // Slack
  slack: {
    message: {
      send: ({ channel, text }: SlackMessageParams) => client.post<StatusResponse>('api/services/slack/channels/messages', { channel, text }),
    },
    channels: {
      list: (): Promise<SlackChannelsResponse> => client.get<SlackChannelsResponse>('api/services/slack/channels'),
    },
  },
};