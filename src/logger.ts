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
