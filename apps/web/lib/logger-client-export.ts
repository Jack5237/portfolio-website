/**
 * Client-side export that provides a browser-safe logger.
 * This file is aliased in webpack config to replace Winston-based logger in client bundles.
 */

import { getClientLogger, type Logger } from "./client-logger";

/**
 * Client-safe logger instance that matches Winston's getLogger API.
 * @returns A logger that uses console methods instead of Winston.
 */
export const getLogger = (): Logger => getClientLogger();

/**
 * Type export for compatibility with Winston Logger type.
 */
export type { Logger };

