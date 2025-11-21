export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}

export class RateLimitError extends Error {
  constructor(message = "Rate limit exceeded") {
    super(message)
    this.name = "RateLimitError"
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DatabaseError"
  }
}

export class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message)
    this.name = "NotFoundError"
  }
}

export function handleApiError(error: unknown): {
  message: string
  status: number
} {
  if (error instanceof ValidationError) {
    return { message: error.message, status: 400 }
  }

  if (error instanceof RateLimitError) {
    return { message: error.message, status: 429 }
  }

  if (error instanceof NotFoundError) {
    return { message: error.message, status: 404 }
  }

  if (error instanceof DatabaseError) {
    return { message: "Database error occurred", status: 500 }
  }

  console.error("[v0] Unhandled error:", error)
  return { message: "Internal server error", status: 500 }
}
