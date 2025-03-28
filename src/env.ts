import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),

  NC_COMMUNICATION_API_URL: z.string().url(),
  NC_COMMUNICATION_API_TOKEN: z.string().min(1),

  NEXT_PUBLIC_NC_API_URL: z.string().url(),
  NEXT_PUBLIC_NC_API_TOKEN: z.string().min(1),

  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  EXPO_PUBLIC_NC_DISABLE_CUSTOM_LOGS: z.string().min(1).optional(),
});

const parsed = envSchema.safeParse(process.env);

export type EnvType = z.infer<typeof envSchema>;
export const ENV = {
  NODE_ENV: process.env.NODE_ENV,

  NC_COMMUNICATION_API_URL: process.env.NC_COMMUNICATION_API_URL,
  NC_COMMUNICATION_API_TOKEN: process.env.NC_COMMUNICATION_API_TOKEN,

  NC_API_URL: process.env.NEXT_PUBLIC_NC_API_URL || process.env.EXPO_PUBLIC_NC_API_URL,
  NC_API_TOKEN: process.env.NEXT_PUBLIC_NC_API_TOKEN || process.env.EXPO_PUBLIC_NC_API_TOKEN,

  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NC_DISABLE_CUSTOM_LOGS: process.env.NEXT_PUBLIC_NC_DISABLE_CUSTOM_LOGS || process.env.EXPO_PUBLIC_NC_DISABLE_CUSTOM_LOGS,

  OPENAI_MODEL_PLANNER: process.env.OPENAI_MODEL_PLANNER,
  OPENAI_MODEL_SALES: process.env.OPENAI_MODEL_SALES,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_VECTOR_STORE_PLANNER: process.env.OPENAI_VECTOR_STORE_PLANNER,
  OPENAI_VECTOR_STORE_SALES: process.env.OPENAI_VECTOR_STORE_SALES,
};

if (typeof window === "undefined" && !parsed.success) {
  console.error("Erro na validação das variáveis de ambiente:");
  parsed.error.errors.forEach((err) => {
    console.error(err);
  });
  process.exit(1);
}