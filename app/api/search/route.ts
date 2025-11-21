import { type NextRequest, NextResponse } from "next/server"
import { searchPastes } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")?.trim()

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    if (query.length < 2) {
      return NextResponse.json({ error: "Search query must be at least 2 characters" }, { status: 400 })
    }

    if (query.length > 100) {
      return NextResponse.json({ error: "Search query must be 100 characters or less" }, { status: 400 })
    }

    const limit = Math.min(50, Number.parseInt(searchParams.get("limit") || "50"))

    const results = await searchPastes(query, limit)

    return NextResponse.json(
      {
        query,
        results: results.map((paste) => ({
          id: paste.id,
          title: paste.title,
          views: paste.views,
          created_at: new Date(paste.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        })),
        count: results.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Error searching pastes:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
