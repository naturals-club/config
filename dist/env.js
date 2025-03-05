"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NC_WHATSAPP_API_URL: zod_1.z.string().url(),
    NC_WHATSAPP_API_TOKEN: zod_1.z.string().min(1),
    NC_AI_API_URL: zod_1.z.string().url(),
    NC_AI_API_TOKEN: zod_1.z.string().min(1),
    NC_API_URL: zod_1.z.string().url(),
    NC_API_TOKEN: zod_1.z.string().min(1),
    NC_SENTINEL_API_URL: zod_1.z.string().url(),
    // NC_SENTINEL_API_TOKEN: z.string().min(1),
    NC_PROJECT_NAME: zod_1.z.string().min(1),
    OPENAI_MODEL_PLANNER: zod_1.z.string().min(1),
    OPENAI_MODEL_SALES: zod_1.z.string().min(1),
    OPENAI_API_KEY: zod_1.z.string().min(1),
    OPENAI_VECTOR_STORE: zod_1.z.string().min(1),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('Erro na validação das variáveis de ambiente:');
    parsed.error.errors.forEach((err) => {
        console.error(err);
    });
    process.exit(1);
}
exports.ENV = parsed.data;
exports.default = exports.ENV;
