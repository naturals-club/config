import { ENV } from "./env";
import axios from "axios";

export class Logger {
  level: string;
  defaultMeta: Record<string, any>;
  lokiUrl: string;
  lokiLabels: string;
  lokiUser: string | undefined;
  lokiPassword: string | undefined;

  constructor(defaultMeta: Record<string, any> = {}) {
    this.level = "info";
    this.defaultMeta = { ...defaultMeta, project: ENV.NEXT_PUBLIC_APP_NAME };
    this.lokiUrl = ENV.LOKI_URL;
    this.lokiLabels = `"{job=\"${ENV.PROJECT_NAME}\"}"`;
    this.lokiUser = ENV.LOKI_USER;
    this.lokiPassword = ENV.LOKI_PASSWORD;
  }

  async sendToLoki(log: Record<string, any>) {
    try {
      const lokiPayload = {
        streams: [
          {
            stream: JSON.parse(this.lokiLabels),
            values: [[`${Date.now()}000000`, JSON.stringify(log)]]
          }
        ]
      };

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (this.lokiUser && this.lokiPassword) {
        headers["Authorization"] = `Basic ${Buffer.from(`${this.lokiUser}:${this.lokiPassword}`).toString("base64")}`;
      }
      
      await axios.post(this.lokiUrl, lokiPayload, { headers });
    } catch (error) {
      console.error("Error sending log to Loki:", error);
    }
  }

  print(level: string, message: string, meta: Record<string, any> = {}) {
    const timestamp = new Date().toISOString();
    const log = { timestamp, level, message, ...meta };

    if (typeof window !== "undefined" && window.console) {
      if (level === "info") {
        console.log(JSON.stringify(log));
      } else if (level === "info") {
        console.info(JSON.stringify(log));
      } else if (level === "warn") {
        console.warn(JSON.stringify(log));
      } else if (level === "error") {
        console.error(JSON.stringify(log));
      } else if (level === "debug") {
        console.debug(JSON.stringify(log));
      }
    }

    if (typeof window === "undefined") {
      this.sendToLoki(log);
    }
  }

  log(message: string, meta?: object) {
    this.print("log", message, meta);
  }
  info(message: string, meta?: object) {
    this.print("info", message, meta);
  }
  warn(message: string, meta?: object) {
    this.print("warn", message, meta);
  }
  error(message: string, meta?: object) {
    this.print("error", message, meta);
  }
  debug(message: string, meta?: object) {
    this.print("debug", message, meta);
  }
}

export const logger = new Logger();
export default logger;

if (ENV.NODE_ENV === "production" && typeof window !== "undefined") {
  const oldConsole = window.console;
  window.console = {
    log: (...args: any[]) => {
      logger.info(args.map(String).join(" "));
      oldConsole.log(...args);
    },
    error: (...args: any[]) => {
      logger.error(args.map(String).join(" "));
      oldConsole.error(...args);
    },
    warn: (...args: any[]) => {
      logger.warn(args.map(String).join(" "));
      oldConsole.warn(...args);
    },
    info: (...args: any[]) => {
      logger.info(args.map(String).join(" "));
      oldConsole.info(...args);
    },
    debug: (...args: any[]) => {
      logger.debug(args.map(String).join(" "));
      oldConsole.debug(...args);
    },
  } as Console;
}
