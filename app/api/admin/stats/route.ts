import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const [pastesResult, membersResult, viewsResult, activeUsersResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM doxbin_pastes`,
      sql`SELECT COUNT(*) as count FROM doxbin_users WHERE role = 'member'`,
      sql`SELECT SUM(views) as total FROM doxbin_pastes`,
      sql`SELECT COUNT(*) as count FROM doxbin_users WHERE is_active = true AND role = 'member'`,
    ])

    return NextResponse.json({
      totalPastes: Number(pastesResult[0]?.count || 0),
      totalMembers: Number(membersResult[0]?.count || 0),
      totalViews: Number(viewsResult[0]?.total || 0),
      activeUsers: Number(activeUsersResult[0]?.count || 0),
    })
  } catch (error) {
    console.error("[v0] Stats error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
