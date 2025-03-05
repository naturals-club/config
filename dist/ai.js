"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = exports.client = void 0;
const openai_1 = __importDefault(require("openai"));
exports.client = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
exports.openai = {
    audio: exports.client.audio,
    clear: (string) => JSON.parse(string.split("```json")[1].split("```")[0]),
    completion: {
        send: async (prompt, model = "gpt-4o-mini") => {
            const SETUP = `Você é um especialista em Educação Física, Saúde, Esportes e Nutrição Esportiva que trabalha para Naturals Club.`;
            const completion = await exports.client.chat.completions.create({
                model: model,
                messages: [
                    { role: "system", content: SETUP },
                    { role: "user", content: prompt },
                ],
            });
            return completion.choices[0].message.content;
        }
    },
    thread: {
        send: async ({ threadId, modelId, message }) => {
            try {
                const messagePayload = { role: "user", content: message };
                await exports.client.beta.threads.messages.create(threadId, messagePayload);
            }
            catch (error) {
                console.error("Erro ao enviar a mensagem:", error);
                return "Tive um problema ao enviar a mensagem. Por favor, tente novamente mais tarde.";
            }
            const run = await exports.client.beta.threads.runs.create(threadId, { assistant_id: modelId });
            let runStatus = await exports.client.beta.threads.runs.retrieve(threadId, run.id);
            while (!["completed", "failed"].includes(runStatus.status)) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                runStatus = await exports.client.beta.threads.runs.retrieve(threadId, run.id);
            }
            if (runStatus.status === "failed") {
                console.log(`[${threadId}]`, runStatus);
                throw new Error("Failed");
            }
            else {
                console.log(`[${threadId}]`, "Model returned successfully!");
            }
            const messages = await exports.client.beta.threads.messages.list(threadId);
            const answer = (messages.data ?? []).find((m) => m?.role === "assistant")?.content?.[0];
            if (!answer || !answer.text)
                throw new Error("Failed to get answer from model");
            return answer.text.value;
        },
        create: async (userId) => {
            const thread = await exports.client.beta.threads.create({
                metadata: { userId },
                tool_resources: {
                    file_search: {
                        vector_store_ids: [process.env.OPENAI_VECTOR_STORE],
                    }
                }
            });
            return thread.id;
        }
    }
};
