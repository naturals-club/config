"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const envSchema = zod_1.z.object({
    NC_WHATSAPP_API_URL: zod_1.z.string().url(),
    NC_WHATSAPP_API_TOKEN: zod_1.z.string().min(1),
    NC_AI_API_URL: zod_1.z.string().url(),
    NC_AI_API_TOKEN: zod_1.z.string().min(1),
    NEXT_PUBLIC_NC_API_URL: zod_1.z.string().url(),
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
exports.ENV = process.env;
exports.default = exports.ENV;
if (typeof window === "undefined" && !parsed.success) {
    console.error('Erro na validação das variáveis de ambiente:');
    parsed.error.errors.forEach((err) => {
        console.error(err);
    });
    process.exit(1);
}
