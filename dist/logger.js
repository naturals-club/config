"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const ecs_winston_format_1 = require("@elastic/ecs-winston-format");
const winston_1 = __importDefault(require("winston"));
const env_1 = __importDefault(require("./env"));
const [host, port = 80] = env_1.default.NC_SENTINEL_API_URL.split("://").pop().split(":");
const PROJECT_NAME = env_1.default.NC_PROJECT_NAME || "naturals-club-core";
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine((0, ecs_winston_format_1.ecsFormat)(), winston_1.default.format.timestamp(), winston_1.default.format.json()),
    defaultMeta: { project: PROJECT_NAME },
    transports: [
        new winston_1.default.transports.Http({
            host: host,
            port: Number(port),
            format: winston_1.default.format.json(),
        }),
        new winston_1.default.transports.Console(),
    ],
});
const oldConsole = global.console;
global.console = {
    log: (...args) => {
        exports.logger.info(args.map(String).join(" "));
        oldConsole.log(...args);
    },
    error: (...args) => exports.logger.error(args.map(String).join(" ")),
    warn: (...args) => exports.logger.warn(args.map(String).join(" ")),
    info: (...args) => exports.logger.info(args.map(String).join(" ")),
    debug: (...args) => exports.logger.debug(args.map(String).join(" ")),
};
exports.default = exports.logger;
