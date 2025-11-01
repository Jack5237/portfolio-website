import { getLogger, type Logger } from "@monochrome-portfolio/logger";

/**
 * Creates a child logger scoped to the web surface so that logs can be filtered at runtime.
 * @remarks Using a child logger keeps the shared transport configuration while capturing context like service name.
 * On the client, this will use a console-based logger instead of Winston.
 */
export const getWebLogger = (): Logger => {
  const logger = getLogger();
  return logger.child({ service: "web" });
};
