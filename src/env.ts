import { z } from 'zod';
import "dotenv/config";

const envSchema = z.object({
  NC_WHATSAPP_API_URL: z.string().url(),
  NC_WHATSAPP_API_TOKEN: z.string().min(1),

  NC_AI_API_URL: z.string().url(),
  NC_AI_API_TOKEN: z.string().min(1),

  NEXT_PUBLIC_NC_API_URL: z.string().url(),
  NC_API_TOKEN: z.string().min(1),

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
export const ENV = process.env;
export default ENV;

if (typeof window === "undefined" && !parsed.success) {
  console.error('Erro na validação das variáveis de ambiente:');
  parsed.error.errors.forEach((err) => {
    console.error(err);
  });
  process.exit(1);
}