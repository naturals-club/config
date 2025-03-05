import { ecsFormat } from "@elastic/ecs-winston-format";
import winston from "winston";
import ENV from "./env";

const [host, port = 80] = (ENV.NC_SENTINEL_API_URL.split("://").pop() as string).split(":");
const PROJECT_NAME = ENV.NC_PROJECT_NAME || "naturals-club-core";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    ecsFormat(),
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { project: PROJECT_NAME },
  transports: [
    new winston.transports.Http({
      host: host,
      port: Number(port),
      format: winston.format.json(),
    }),
    new winston.transports.Console(),
  ],
});

const oldConsole = global.console;
global.console = {
  log: (...args) => {
    logger.info(args.map(String).join(" "));
    oldConsole.log(...args);
  },
  error: (...args) => {
    logger.error(args.map(String).join(" "));
    oldConsole.error(...args);
  },
  warn: (...args) => {
    logger.warn(args.map(String).join(" "));
    oldConsole.warn(...args);
  },
  info: (...args) => {
    logger.info(args.map(String).join(" "));
    oldConsole.info(...args);
  },
  debug: (...args) => {
    logger.debug(args.map(String).join(" "));
    oldConsole.debug(...args);
  },
} as any as Console;

export default logger;
