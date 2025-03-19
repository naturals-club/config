"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.string().default("development"),
    NC_COMMUNICATION_API_URL: zod_1.z.string().url(),
    NC_COMMUNICATION_API_TOKEN: zod_1.z.string().min(1),
    NC_API_URL: zod_1.z.string().url(),
    NC_API_TOKEN: zod_1.z.string().min(1),
    NC_SENTINEL_API_URL: zod_1.z.string().url(),
    // NC_SENTINEL_API_TOKEN: z.string().min(1),
    NEXT_PUBLIC_APP_NAME: zod_1.z.string().min(1),
    OPENAI_MODEL_PLANNER: zod_1.z.string().min(1),
    OPENAI_MODEL_SALES: zod_1.z.string().min(1),
    OPENAI_API_KEY: zod_1.z.string().min(1),
    OPENAI_VECTOR_STORE: zod_1.z.string().min(1),
});
const parsed = envSchema.safeParse(process.env);
exports.ENV = {
    NODE_ENV: process.env.NODE_ENV,
    NC_COMMUNICATION_API_URL: process.env.NC_COMMUNICATION_API_URL,
    NC_COMMUNICATION_API_TOKEN: process.env.NC_COMMUNICATION_API_TOKEN,
    NC_API_URL: process.env.NEXT_PUBLIC_NC_API_URL || process.env.EXPO_PUBLIC_NC_API_URL,
    NC_API_TOKEN: process.env.NEXT_PUBLIC_NC_API_TOKEN || process.env.EXPO_PUBLIC_NC_API_TOKEN,
    NC_SENTINEL_API_URL: process.env.NC_SENTINEL_API_URL,
    // NC_SENTINEL_API_TOKEN: process.env.NC_SENTINEL_API_TOKEN,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    OPENAI_MODEL_PLANNER: process.env.OPENAI_MODEL_PLANNER,
    OPENAI_MODEL_SALES: process.env.OPENAI_MODEL_SALES,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_VECTOR_STORE: process.env.OPENAI_VECTOR_STORE,
};
if (typeof window === "undefined" && !parsed.success) {
    console.error("Erro na validação das variáveis de ambiente:");
    parsed.error.errors.forEach((err) => {
        console.error(err);
    });
    process.exit(1);
}
