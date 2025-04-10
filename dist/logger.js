"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
const env_1 = require("./env");
class Logger {
    level;
    defaultMeta;
    constructor(defaultMeta = {}) {
        this.level = "info";
        this.defaultMeta = { ...defaultMeta, project: env_1.ENV.NEXT_PUBLIC_APP_NAME };
    }
    print(level, message, meta = {}) {
        try {
            const timestamp = new Date().toISOString();
            const log = env_1.ENV.NC_DISABLE_CUSTOM_LOGS === "true" ? message : JSON.stringify({
                timestamp,
                level,
                message,
                ...meta,
            });
            if (typeof window !== "undefined" && window.console)
                console[level](log);
        }
        catch (error) {
            console.log("Error logging message:", error);
        }
    }
    log(message, meta) {
        this.print("log", message, meta);
    }
    info(message, meta) {
        this.print("info", message, meta);
    }
    warn(message, meta) {
        this.print("warn", message, meta);
    }
    error(message, meta) {
        this.print("error", message, meta);
    }
    debug(message, meta) {
        this.print("debug", message, meta);
    }
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
