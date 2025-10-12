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

  info(message: string, data?: any) {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data || '');
    }
  }

  error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || '');
    // In production, send to error tracking service (Sentry, etc.)
  }

  debug(message: string, data?: any) {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }

  warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data || '');
  }
}

export const logger = Logger.getInstance();
