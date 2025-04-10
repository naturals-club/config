import { ENV } from "./env";

export class Logger {
  level: string;
  defaultMeta: Record<string, any>;

  constructor(defaultMeta: Record<string, any> = {}) {
    this.level = "info";
    this.defaultMeta = { ...defaultMeta, project: ENV.NEXT_PUBLIC_APP_NAME };
  }

  print(level: string, message: string, meta: Record<string, any> = {}) {
    const timestamp = new Date().toISOString();
    const log = ENV.NC_DISABLE_CUSTOM_LOGS === "true" ? message : JSON.stringify({
      timestamp,
      level,
      message,
      ...meta,
    });

    if (typeof window !== "undefined" && window.console)
      console[level](log);
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