export declare class Logger {
    level: string;
    defaultMeta: Record<string, any>;
    constructor(defaultMeta?: Record<string, any>);
    print(level: string, message: string, meta?: Record<string, any>): void;
    log(message: string, meta?: object): void;
    info(message: string, meta?: object): void;
    warn(message: string, meta?: object): void;
    error(message: string, meta?: object): void;
    debug(message: string, meta?: object): void;
}
export declare const logger: Logger;
export default logger;
