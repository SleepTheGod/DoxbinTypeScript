import { type NextRequest, NextResponse } from "next/server"
import { createPaste } from "@/lib/db"
import { headers } from "next/headers"
import { rateLimit } from "@/lib/rate-limit"

const RATE_LIMIT_CONFIG = {
  interval: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address and user agent
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() || headersList.get("x-real-ip") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    const rateLimitKey = `paste:${ip}`
    if (!rateLimit(rateLimitKey, RATE_LIMIT_CONFIG)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    // Parse and validate input
    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    if (typeof title !== "string" || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid input types" }, { status: 400 })
    }

    const sanitizedTitle = title.trim().substring(0, 255)
    const sanitizedContent = content.trim()

    if (sanitizedTitle.length === 0) {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 })
    }

    if (sanitizedContent.length === 0) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 })
    }

    if (sanitizedContent.length > 1000000) {
      return NextResponse.json({ error: "Content must be 1MB or less" }, { status: 400 })
    }

    const paste = await createPaste({
      title: sanitizedTitle,
      content: sanitizedContent,
      ip_address: ip,
      user_agent: userAgent,
    })

    return NextResponse.json(paste, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Error creating paste:", error)

    if (error.message === "Failed to generate unique paste ID") {
      return NextResponse.json({ error: "Failed to create paste. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
