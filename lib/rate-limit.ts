interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Clean up old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    Object.keys(store).forEach((key) => {
      if (store[key].resetTime < now) {
        delete store[key]
      }
    })
  },
  5 * 60 * 1000,
)

export interface RateLimitConfig {
  interval: number // Time window in milliseconds
  maxRequests: number // Max requests per interval
}

export function rateLimit(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now()
  const { interval, maxRequests } = config

  if (!store[identifier] || store[identifier].resetTime < now) {
    // Initialize or reset
    store[identifier] = {
      count: 1,
      resetTime: now + interval,
    }
    return true
  }

  if (store[identifier].count >= maxRequests) {
    return false
  }

  store[identifier].count++
  return true
}

export function getRateLimitInfo(identifier: string) {
  const entry = store[identifier]
  if (!entry) {
    return null
  }

  return {
    remaining: Math.max(0, entry.count),
    resetTime: entry.resetTime,
  }
}
