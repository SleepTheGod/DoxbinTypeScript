import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const members = await sql`
      SELECT id, name, email, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 100
    `

    const countResult = await sql`
      SELECT COUNT(*) as count FROM users
    `

    return NextResponse.json({
      members,
      count: Number.parseInt(countResult[0].count),
    })
  } catch (error) {
    console.error("Failed to fetch members:", error)
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }
}
