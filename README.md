# @naturals/config

Library containing all the basic configuration files for the project.

## Setup

1. Install package:

```bash
npm install github:naturals-club/config
```

2. Configure environment variables in the `.env` file:

Environment variables are enforced using `Zod`, ensuring they are correctly configured. If a variable fails validation, an error will be thrown.

```env
NC_WHATSAPP_API_URL=http://example.com
NC_WHATSAPP_API_TOKEN=your-whatsapp-api-token

NC_AI_API_URL=http://ai.example.com
NC_AI_API_TOKEN=your-ai-api-token

NC_API_URL=http://api.example.com
NC_API_TOKEN=your-api-token

NC_SENTINEL_API_URL=http://sentinel.example.com
NC_SENTINEL_API_TOKEN=your-sentinel-api-token

OPENAI_MODEL_PLANNER=your-openai-model-planner
OPENAI_MODEL_SALES=your-openai-model-sales
OPENAI_API_KEY=your-openai-api-key
OPENAI_VECTOR_STORE=your-openai-vector-store
```

-------------

## Logger

A logging component used to register application logs.

### Features

- Uses the `winston` library to log messages at different severity levels.
- Integrated with Elastic Stack to send structured logs using the **Elastic Common Schema (ECS)**.
- Automatically overrides the global `console` to provide consistent logging behavior.

### Usage Example

No additional setup is required; just import the configuration at the start of your application, and all console logs will be structured and logged correctly.

```js
import "@naturals/logger";
```

-------------

## API

The API client is structured to follow the **Laravel backend model**, allowing intuitive interaction with resources.

### Features

- Centralized configuration for simplified API interaction.
- Each request is logged with its respective HTTP method and URL.
- Authentication and route definitions are extracted from environment variables.

### Usage Example

The API client provides an intuitive method structure, following the `api[model][method]()` pattern.

#### Example:

```ts
import { api } from "@naturals/config";

// List users
const users = await api.user.list({ page: 1, limit: 10 });

// Get a specific user
const user = await api.user.get(1);

// Edit a user
const updatedUser = await api.user.edit(1, { name: "New Name" });

// Delete a user
await api.user.delete(1);
```

### Methods for CRUD operations:

- **list(params?: any)**: Fetches a list of items, with optional query parameters (e.g., pagination, filters).
- **get(id: number)**: Fetches a specific item by its ID.
- **edit(id: number, data: any)**: Edits a specific item by its ID with the provided data.
- **delete(id: number)**: Deletes a specific item by its ID.

---------------

## AI

The AI client interacts with **OpenAI's API** to provide intelligent responses and manage conversation threads.

### Features

- Supports both **Chat Completion** and **Thread-based** interactions.
- Uses predefined models for different functionalities, such as planning and sales.
- Retrieves conversation history and handles multi-step responses.

### Usage Examples

#### 1. Chat Completion

Use AI models for direct message completion:

```ts
import { openai } from "@naturals/config";

const response = await openai.completion.send("What are the benefits of natural bodybuilding?");
console.log(response);
```

#### 2. Creating and Managing AI Threads

Create a new conversation thread for a user:

```ts
const threadId = await openai.thread.create("user_123");
console.log("New Thread ID:", threadId);
```

Send a message to an existing thread and retrieve a response:

```ts
const response = await openai.thread.send({
  threadId: "existing-thread-id",
  modelId: "assistant-model-id",
  message: "What is the best post-workout nutrition plan?"
});
console.log("AI Response:", response);
```

----------------

## Communications Service

A biblioteca **@naturals/config** inclui um serviço de comunicação que oferece funcionalidades para interagir com APIs de mensagens como WhatsApp, E-mail, e Slack. As funções são configuradas automaticamente utilizando variáveis de ambiente, com as configurações de URL e token.

### WhatsApp

O serviço do WhatsApp permite enviar mensagens, obter informações sobre conversas e interagir com a API interna do WhatsApp.

#### Funcionalidades

- **Enviar mensagem**: Envia uma mensagem para uma conversa específica do WhatsApp.
- **Listar conversas**: Recupera todas as conversas existentes.
- **Obter detalhes da conversa**: Obtém detalhes sobre uma conversa específica.

#### Exemplos de uso:

1. **Enviar mensagem no WhatsApp**:

```ts
import { communication } from "@naturals/config";

const response = await communication.whatsapp.message.send({
  conversationSid: "your-conversation-sid",
  message: "Olá, como posso ajudar?"
});
console.log(response);
```

2. **Listar conversas do WhatsApp**:

```ts
const conversations = await communication.whatsapp.conversations.list();
console.log(conversations);
```

3. **Obter detalhes de uma conversa**:

```ts
const conversation = await communication.whatsapp.conversations.get("your-conversation-sid");
console.log(conversation);
```

### E-mail

O serviço de e-mail permite enviar e-mails personalizados utilizando templates ou conteúdo HTML.

#### Funcionalidades

- **Enviar e-mail**: Envia um e-mail para um destinatário com conteúdo personalizado ou utilizando templates.

#### Exemplos de uso:

1. **Enviar e-mail simples**:

```ts
const response = await communication.email.send({
  recipient: "user@example.com",
  subject: "Bem-vindo à Naturals Club!",
  content: "Aqui está o seu conteúdo...",
  html: "<h1>Bem-vindo!</h1>"
});
console.log(response);
```

2. **Enviar e-mail com template**:

```ts
const response = await communication.email.send({
  recipient: "user@example.com",
  template: "welcome",
  variables: {
    name: "Lucas",
    cta: "https://link.com?custom=true"
  }
});
console.log(response);
```

### Mensagens em Massa

O serviço de mensagens em massa permite enviar notificações em massa para múltiplos destinatários com um único envio, personalizando o conteúdo e o assunto.

#### Funcionalidades

- **Enviar mensagens em massa**: Envia mensagens personalizadas para múltiplos destinatários.

#### Exemplos de uso:

1. **Enviar mensagem em massa**:

```ts
const response = await communication.broadcast.send({
  recipient: "user@example.com",
  phone: "+551199999999",
  subject: "Promoção Exclusiva",
  template: "promotion",
  variables: {
    discount: "20%"
  }
});
console.log(response);
```

### Status da API

Permite verificar o status da API de comunicação para garantir que está operacional.

#### Exemplos de uso:

1. **Verificar status da API**:

```ts
const status = await communication.status.check();
console.log(status);
```

### Slack

O serviço de Slack permite enviar mensagens para canais específicos do Slack e listar canais disponíveis.

#### Funcionalidades

- **Enviar mensagem no Slack**: Envia uma mensagem para um canal do Slack.
- **Listar canais do Slack**: Obtém todos os canais disponíveis no workspace do Slack.

#### Exemplos de uso:

1. **Enviar mensagem no Slack**:

```ts
const response = await communication.slack.message.send({
  channel: "general",
  text: "Olá, equipe! Vamos começar a reunião?"
});
console.log(response);
```

2. **Listar canais do Slack**:

```ts
const channels = await communication.slack.channels.list();
console.log(channels);
```

-------------

## Technologies

- **Node.js** (for backend execution)
- **Typescript** (for static typing)
- **Zod** (for environment variable validation)
- **Winston** (for logging)
- **Fetch** (for internal API interactions)

## Dependencies

- `zod`
- `winston`
- `typescript`
- `@elastic/ecs-winston-format`

## License

MIT License. See LICENSE file for more details.

