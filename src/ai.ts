import { ChatCompletionUserMessageParam } from "openai/resources";
import { MessageCreateParams } from "openai/resources/beta/threads/messages.mjs";
import OpenAI from "openai";

export const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const openai = {
  client: client,
  files: client.files,
  audio: client.audio,
  clear: (string: string) => {
    try {
      return JSON.parse(string.split("```json")[1].split("```")[0]);
    } catch (error) {
      console.log("Error parsing as Markdown", error);
    }

    try {
      return JSON.parse(string);
    } catch (error) {
      console.log("Error parsing as JSON", error);
    }

    return string;
  },
  completion: {
    send: async (prompt: ChatCompletionUserMessageParam["content"], model = "gpt-4o-mini") => {
      const SETUP = `Você é um especialista em Educação Física, Saúde, Esportes e Nutrição Esportiva que trabalha para Naturals Club.`;
      const completion = await client.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: SETUP },
          { role: "user", content: prompt },
        ],
      });

      return completion.choices[0].message.content as string;
    }
  },
  thread: {
    send: async ({ threadId, modelId, message }: { threadId: string, message: string, modelId: string }) => {
      try {
        const messagePayload = { role: "user", content: message } as MessageCreateParams;

        await client.beta.threads.messages.create(threadId, messagePayload);
      } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
        return "Tive um problema ao enviar a mensagem. Por favor, tente novamente mais tarde.";
      }

      const run = await client.beta.threads.runs.create(threadId, { assistant_id: modelId });

      let runStatus = await client.beta.threads.runs.retrieve(threadId, run.id);

      while (!["completed", "failed"].includes(runStatus.status)) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runStatus = await client.beta.threads.runs.retrieve(threadId, run.id);
      }

      if (runStatus.status === "failed") {
        console.log(`[${threadId}]`, runStatus);
        throw new Error("Failed");
      } else {
        console.log(`[${threadId}]`, "Model returned successfully!");
      }

      const messages = await client.beta.threads.messages.list(threadId);
      const answer: any = (messages.data ?? []).find((m: any) => m?.role === "assistant")?.content?.[0];

      if (!answer || !answer.text) throw new Error("Failed to get answer from model");

      return answer.text.value;
    },
    create: async (userId: string) => {
      const thread = await client.beta.threads.create({
        metadata: { userId },
        tool_resources: {
          file_search: {
            vector_store_ids: [process.env.OPENAI_VECTOR_STORE as string],
          }
        }
      });
      return thread.id;
    }
  }
}