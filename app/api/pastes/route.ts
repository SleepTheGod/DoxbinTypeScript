import { type NextRequest, NextResponse } from "next/server"
import { createPaste } from "@/lib/db"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = body

    // Validate input
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    if (typeof title !== "string" || typeof content !== "string") {
      return NextResponse.json({ error: "Invalid input types" }, { status: 400 })
    }

    if (title.length > 255) {
      return NextResponse.json({ error: "Title must be 255 characters or less" }, { status: 400 })
    }

    if (content.length > 500000) {
      return NextResponse.json({ error: "Content must be 500,000 characters or less" }, { status: 400 })
    }

    // Get IP address and user agent for logging
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    // Create paste
    const paste = await createPaste({
      title: title.trim(),
      content: content.trim(),
      ip_address: ip,
      user_agent: userAgent,
    })

    return NextResponse.json(paste, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating paste:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
