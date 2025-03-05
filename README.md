# @naturals/config

Library containing all the basic configuration files for the project.

## Setup

1. Install package:

```bash
npm install git+https://github.com/naturals-club/config.git
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

## Whatsapp

The API for interacting with our internal WhatsApp API. The configurations and credentials are defined via environment variables.

### Usage Example

- Ensure the necessary environment variables are set up.
- Use the API to send messages, check statuses, or retrieve conversations.

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

// Search for users
const searchResults = await api.user.search({ query: "John Doe" });
```

### Methods for CRUD operations:

- **list(params?: any)**: Fetches a list of items, with optional query parameters (e.g., pagination, filters).
- **get(id: number)**: Fetches a specific item by its ID.
- **edit(id: number, data: any)**: Edits a specific item by its ID with the provided data.
- **delete(id: number)**: Deletes a specific item by its ID.
- **search(params?: any)**: Searches for items based on given parameters.

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

