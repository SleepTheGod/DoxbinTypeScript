import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getAllPastes, searchPastes, getTotalPastes } from "@/lib/db"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
    const search = searchParams.get("search")?.trim() || ""
    const limit = 150
    const offset = (page - 1) * limit

    let pastes
    let total

    if (search) {
      pastes = await searchPastes(search, limit)
      total = pastes.length // For simplicity, return count of results
    } else {
      pastes = await getAllPastes(limit, offset)
      total = await getTotalPastes()
    }

    const totalPages = Math.ceil(total / limit)

    const formattedPastes = pastes.map((paste) => ({
      id: paste.id,
      title: paste.title,
      views: paste.views,
      created_at: new Date(paste.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }))

    return NextResponse.json(
      {
        pastes: formattedPastes,
        total,
        totalPages,
        currentPage: page,
        hasMore: page < totalPages,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Error fetching pastes:", error)
    return NextResponse.json({ error: "Failed to fetch pastes" }, { status: 500 })
  }
}
