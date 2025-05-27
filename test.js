import "dotenv/config";
import { api } from "./dist/index.js";

api.plans.list().then(console.log).catch(console.error);