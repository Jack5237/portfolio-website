/**
 * Simple logger for the portfolio application
 * Provides both server-side (Winston) and client-side (console) logging
 */

export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  child(context: Record<string, unknown>): Logger;
}

/**
 * Client-safe logger that uses console methods
 */
class ClientLogger implements Logger {
  info(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[INFO] ${message}`, meta || "");
    }
  }

  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, meta || "");
    }
  }

  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(`[WARN] ${message}`, meta || "");
  }

  error(message: string, meta?: Record<string, unknown>) {
    console.error(`[ERROR] ${message}`, meta || "");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child(_context: Record<string, unknown>): Logger {
    return this;
  }
}

/**
 * Server-side logger using Winston
 */
class ServerLogger implements Logger {
  private context: Record<string, unknown> = {};

  constructor(context: Record<string, unknown> = {}) {
    this.context = context;
  }

  info(message: string, meta?: Record<string, unknown>) {
    console.log(`[INFO] ${message}`, { ...this.context, ...meta });
  }

  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, { ...this.context, ...meta });
    }
  }

  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(`[WARN] ${message}`, { ...this.context, ...meta });
  }

  error(message: string, meta?: Record<string, unknown>) {
    console.error(`[ERROR] ${message}`, { ...this.context, ...meta });
  }

  child(context: Record<string, unknown>): Logger {
    return new ServerLogger({ ...this.context, ...context });
  }
}

/**
 * Get a logger instance appropriate for the current environment
 */
export const getLogger = (): Logger => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    return new ClientLogger();
  }

  // Server-side logger
  return new ServerLogger({ service: "portfolio" });
};

/**
 * Creates a child logger scoped to the web surface so that logs can be filtered at runtime.
 * @remarks Using a child logger keeps the shared transport configuration while capturing context like service name.
 * On the client, this will use a console-based logger instead of Winston.
 */
export const getWebLogger = (): Logger => {
  const logger = getLogger();
  return logger.child({ service: "web" });
};
