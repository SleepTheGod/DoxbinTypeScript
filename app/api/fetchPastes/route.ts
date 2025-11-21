import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search") || ""
    const searchType = searchParams.get("searchType") || "title"
    const limit = 100
    const offset = (page - 1) * limit

    let pastes
    let totalResult

    if (search) {
      if (searchType === "content") {
        pastes = await sql`
          SELECT id, title, views, created_at 
          FROM doxbin_pastes 
          WHERE content ILIKE ${"%" + search + "%"}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `
        totalResult = await sql`
          SELECT COUNT(*) as count 
          FROM doxbin_pastes 
          WHERE content ILIKE ${"%" + search + "%"}
        `
      } else {
        pastes = await sql`
          SELECT id, title, views, created_at 
          FROM doxbin_pastes 
          WHERE title ILIKE ${"%" + search + "%"}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `
        totalResult = await sql`
          SELECT COUNT(*) as count 
          FROM doxbin_pastes 
          WHERE title ILIKE ${"%" + search + "%"}
        `
      }
    } else {
      pastes = await sql`
        SELECT id, title, views, created_at 
        FROM doxbin_pastes 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      totalResult = await sql`
        SELECT COUNT(*) as count FROM doxbin_pastes
      `
    }

    const total = Number(totalResult[0].count)
    const totalPages = Math.ceil(total / limit)

    const formattedPastes = pastes.map((paste: any) => ({
      id: paste.id,
      title: paste.title,
      views: paste.views,
      created_at: new Date(paste.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }))

    return NextResponse.json({
      pastes: formattedPastes,
      total,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.error("[v0] Error fetching pastes:", error)
    return NextResponse.json({ error: "Failed to fetch pastes" }, { status: 500 })
  }
}
