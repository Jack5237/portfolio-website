/**
 * Client-side logger that safely uses console methods instead of Winston.
 * This prevents Node.js-only dependencies from being bundled in the browser.
 */

/**
 * Logger interface that matches Winston's API for compatibility.
 */
export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  child(context: Record<string, unknown>): Logger;
}

/**
 * Client-safe logger interface that mirrors Winston's API but uses console.
 */
class ClientLogger implements Logger {
  /**
   * Logs an info message to the console.
   */
  info(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[INFO] ${message}`, meta || "");
    }
  }

  /**
   * Logs a debug message to the console.
   */
  debug(message: string, meta?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, meta || "");
    }
  }

  /**
   * Logs a warning message to the console.
   */
  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(`[WARN] ${message}`, meta || "");
  }

  /**
   * Logs an error message to the console.
   */
  error(message: string, meta?: Record<string, unknown>) {
    console.error(`[ERROR] ${message}`, meta || "");
  }

  /**
   * Creates a child logger with additional context (no-op in client).
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child(_context: Record<string, unknown>): Logger {
    return this;
  }
}

/**
 * Gets a client-safe logger instance for use in client components.
 * @returns A logger that uses console methods instead of Winston.
 */
export const getClientLogger = (): Logger => new ClientLogger();

