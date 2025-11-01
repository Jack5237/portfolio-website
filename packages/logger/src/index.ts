import { createLogger, format, transports } from "winston";

/**
 * Creates a configured Winston logger that can be shared across the monorepo.
 * @remarks The logger centralizes formatting and metadata so that every consumer
 * can focus on calling the appropriate level while we maintain a single source of truth.
 */
const logger = createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.colorize(),
    format.printf(({ level, message, timestamp, stack, ...rest }) => {
      const metadata = Object.keys(rest).length > 0 ? ` ${JSON.stringify(rest)}` : "";
      const stackTrace = stack ? `\n${stack}` : "";

      return `[${timestamp}] ${level}: ${message}${metadata}${stackTrace}`;
    })
  ),
  transports: [
    new transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});

/**
 * Retrieves the shared logger instance for use throughout the codebase.
 * @returns The Winston logger configured with the repository defaults.
 */
export const getLogger = () => logger;

export type { Logger } from "winston";

