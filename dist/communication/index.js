"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.communication = void 0;
const client_1 = __importDefault(require("../api/client"));
const env_1 = require("../env");
const client = client_1.default.cloneInstance();
client.setBaseUrl(env_1.ENV.NC_COMMUNICATION_API_URL);
client.setAuthorization(env_1.ENV.NC_COMMUNICATION_API_TOKEN);
exports.communication = {
    // WhatsApp
    whatsapp: {
        message: {
            send: ({ conversationSid, message }) => client.post("api/messaging/whatsapp/message", { conversationSid, message }),
        },
        conversations: {
            list: () => client.get("api/messaging/whatsapp/conversations"),
            get: (conversationSid) => client.get("api/messaging/whatsapp/conversations?id=" + conversationSid),
        },
    },
    // E-mail
    email: {
        send: ({ recipient, subject, content, html, template, variables }) => client.post("api/messaging/email", template
            ? { recipient, subject, template, variables }
            : { recipient, subject, content, html }),
    },
    // Mensagens em Massa
    broadcast: {
        send: ({ recipient, phone, subject, template, variables }) => client.post("api/messaging/broadcast", {
            recipient, phone, subject, template, variables,
        }),
    },
    // Status da API
    status: {
        check: () => client.get("api"),
    },
    // Slack
    slack: {
        message: {
            send: ({ channel, text }) => client.post("api/services/slack/channels/messages", { channel, text }),
        },
        channels: {
            list: () => client.get("api/services/slack/channels"),
        },
    },
};
