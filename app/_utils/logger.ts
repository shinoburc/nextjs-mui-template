import { pino } from 'pino';

const logger = pino({
  browser: {
    asObject: true, // ブラウザで使用できるような設定
  },
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: "pino-pretty"
  },
  formatters: {
    level: (label) => ({ level: label }), // default: { level: number }
      bindings: (bindings) => ({
        pid: bindings.pid,
        hostname: bindings.hostname,
        name: bindings.name
      })
  },
});

export namespace Logger {
  export function info(message: string) {
    logger.info(message);
  }
  export function warn(message: string) {
    logger.warn(message);
  }
  export function error(message: string) {
    logger.error(message);
  }
  export function fatal(message: string) {
    logger.fatal(message);
  }
}

/*
// Class version
class Logger {
  private static instance: Logger;
  private logger: any;
  private constructor() {
    this.logger = pino({
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public fatal(message: string) {
    this.logger.fatal(message);
  }
}

export const logger = Logger.getInstance();
*/