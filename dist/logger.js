"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
const env_1 = require("./env");
const axios = require("axios");

class Logger {
    level;
    defaultMeta;
    lokiUrl;
    lokiLabels;
    lokiUser;
    lokiPassword;

    constructor(defaultMeta = {}) {
        this.level = "info";
        this.defaultMeta = { ...defaultMeta, project: env_1.ENV.NEXT_PUBLIC_APP_NAME };
        this.lokiUrl = env_1.ENV.LOKI_URL;
        this.lokiLabels = `"{job=\"${env_1.ENV.PROJECT_NAME}\"}"`;
        this.lokiUser = env_1.ENV.LOKI_USER;
        this.lokiPassword = env_1.ENV.LOKI_PASSWORD;
    }

    async sendToLoki(log) {
        try {
            const lokiPayload = {
                streams: [
                    {
                        stream: JSON.parse(this.lokiLabels),
                        values: [[`${Date.now()}000000`, JSON.stringify(log)]]
                    }
                ]
            };

            const headers = { "Content-Type": "application/json" };
            if (this.lokiUser && this.lokiPassword) {
                headers["Authorization"] = `Basic ${Buffer.from(`${this.lokiUser}:${this.lokiPassword}`).toString("base64")}`;
            }
            
            await axios.post(this.lokiUrl, lokiPayload, { headers });
        } catch (error) {
            console.error("Error sending log to Loki:", error);
        }
    }

    print(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const log = { timestamp, level, message, ...meta };
        
        if (typeof window !== "undefined" && window.console) {
            if (level === "info") {
                console.log(JSON.stringify(log));
            }
            else if (level === "info") {
                console.info(JSON.stringify(log));
            }
            else if (level === "warn") {
                console.warn(JSON.stringify(log));
            }
            else if (level === "error") {
                console.error(JSON.stringify(log));
            }
            else if (level === "debug") {
                console.debug(JSON.stringify(log));
            }
        }
        
        if (typeof window === "undefined") {
            this.sendToLoki(log);
        }
    }

    log(message, meta) { this.print("log", message, meta); }
    info(message, meta) { this.print("info", message, meta); }
    warn(message, meta) { this.print("warn", message, meta); }
    error(message, meta) { this.print("error", message, meta); }
    debug(message, meta) { this.print("debug", message, meta); }
}

exports.Logger = Logger;
exports.logger = new Logger();
exports.default = exports.logger;

if (env_1.ENV.NODE_ENV === "production" && typeof window !== "undefined") {
    const oldConsole = window.console;
    window.console = {
        log: (...args) => {
            exports.logger.info(args.map(String).join(" "));
            oldConsole.log(...args);
        },
        error: (...args) => {
            exports.logger.error(args.map(String).join(" "));
            oldConsole.error(...args);
        },
        warn: (...args) => {
            exports.logger.warn(args.map(String).join(" "));
            oldConsole.warn(...args);
        },
        info: (...args) => {
            exports.logger.info(args.map(String).join(" "));
            oldConsole.info(...args);
        },
        debug: (...args) => {
            exports.logger.debug(args.map(String).join(" "));
            oldConsole.debug(...args);
        },
    };
}
