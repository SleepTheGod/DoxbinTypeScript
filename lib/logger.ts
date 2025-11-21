type LogLevel = "info" | "warn" | "error" | "debug"

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${data ? " " + JSON.stringify(data) : ""}`
  }

  info(message: string, data?: any) {
    if (this.isDevelopment) {
      console.log(this.formatMessage("info", message, data))
    }
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage("warn", message, data))
  }

  error(message: string, error?: any) {
    console.error(this.formatMessage("error", message, error))

    // In production, you could send to error tracking service
    if (!this.isDevelopment && typeof window === "undefined") {
      // Server-side error logging
      // Example: Send to Sentry, LogRocket, etc.
    }
  }

  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, data))
    }
  }
}

export const logger = new Logger()
