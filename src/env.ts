import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),

  NC_COMMUNICATION_API_URL: z.string().url(),
  NC_COMMUNICATION_API_TOKEN: z.string().min(1),

  NEXT_PUBLIC_NC_API_URL: z.string().url(),
  NEXT_PUBLIC_NC_API_TOKEN: z.string().min(1),

  NC_SENTINEL_API_URL: z.string().url(),
  // NC_SENTINEL_API_TOKEN: z.string().min(1),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),

  OPENAI_MODEL_PLANNER: z.string().min(1),
  OPENAI_MODEL_SALES: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_VECTOR_STORE: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

export type EnvType = z.infer<typeof envSchema>;
export const ENV = {
  NODE_ENV: process.env.NODE_ENV,

  NC_COMMUNICATION_API_URL: process.env.NC_COMMUNICATION_API_URL,
  NC_COMMUNICATION_API_TOKEN: process.env.NC_COMMUNICATION_API_TOKEN,

  NEXT_PUBLIC_NC_API_URL: process.env.NEXT_PUBLIC_NC_API_URL,
  NEXT_PUBLIC_NC_API_TOKEN: process.env.NEXT_PUBLIC_NC_API_TOKEN,

  NC_SENTINEL_API_URL: process.env.NC_SENTINEL_API_URL,
  // NC_SENTINEL_API_TOKEN: process.env.NC_SENTINEL_API_TOKEN,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,

  OPENAI_MODEL_PLANNER: process.env.OPENAI_MODEL_PLANNER,
  OPENAI_MODEL_SALES: process.env.OPENAI_MODEL_SALES,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_VECTOR_STORE: process.env.OPENAI_VECTOR_STORE,
} as EnvType;
export default ENV;

if (typeof window === "undefined" && !parsed.success) {
  console.error("Erro na validação das variáveis de ambiente:");
  parsed.error.errors.forEach((err) => {
    console.error(err);
  });
  process.exit(1);
}