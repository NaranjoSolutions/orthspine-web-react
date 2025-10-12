/**
 * Logger - Singleton Pattern
 * Centralized logging for the application
 */
class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(message: string, data?: unknown) {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data || '');
    }
  }

  error(message: string, error?: unknown) {
    console.error(`[ERROR] ${message}`, error || '');
    // In production, send to error tracking service (Sentry, etc.)
  }

  debug(message: string, data?: unknown) {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }

  warn(message: string, data?: unknown) {
    console.warn(`[WARN] ${message}`, data || '');
  }
}

export const logger = Logger.getInstance();
