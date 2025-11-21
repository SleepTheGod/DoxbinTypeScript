export const APP_NAME = "Doxbin"
export const APP_DESCRIPTION = "Anonymous paste sharing platform"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://doxbin.com"

// Rate limiting
export const RATE_LIMITS = {
  PASTE_CREATE: {
    maxRequests: 10,
    interval: 60 * 60 * 1000, // 1 hour
  },
  API_GENERAL: {
    maxRequests: 100,
    interval: 60 * 1000, // 1 minute
  },
} as const

// Content limits
export const CONTENT_LIMITS = {
  TITLE_MAX_LENGTH: 255,
  CONTENT_MAX_LENGTH: 1000000, // 1MB
  SEARCH_QUERY_MIN_LENGTH: 2,
  SEARCH_QUERY_MAX_LENGTH: 100,
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 150,
  MAX_PAGE_SIZE: 200,
  SEARCH_PAGE_SIZE: 50,
} as const

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  PASTE_LIST: 60,
  PASTE_SINGLE: 300,
  SEARCH_RESULTS: 30,
} as const

// External links
export const EXTERNAL_LINKS = {
  TELEGRAM: "https://t.me/doxbin",
  TWITTER: "https://twitter.com/doxbin",
  MIRROR: "https://doxbin.com",
} as const

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: "An unexpected error occurred",
  VALIDATION: "Invalid input provided",
  RATE_LIMIT: "Rate limit exceeded. Please try again later.",
  NOT_FOUND: "Resource not found",
  DATABASE: "Database error occurred",
  UNAUTHORIZED: "Unauthorized access",
} as const
