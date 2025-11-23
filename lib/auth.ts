import { sql } from "@/lib/db"

export interface DoxbinUser {
  id: number
  username: string
  email: string | null
  role: string
  created_at: Date
  last_login: Date | null
  is_active: boolean
}

export async function authenticateAdmin(username: string, password: string): Promise<DoxbinUser | null> {
  try {
    // Check for admin credentials (kt / ihatemyself123)
    if (username === "kt" && password === "ihatemyself123") {
      const result = await sql`
        UPDATE doxbin_users 
        SET last_login = NOW() 
        WHERE username = 'kt' 
        RETURNING id, username, email, role, created_at, last_login, is_active
      `

      if (result.length > 0) {
        return result[0] as DoxbinUser
      }
    }

    return null
  } catch (error) {
    console.error("[v0] Admin auth error:", error)
    return null
  }
}

export async function getAllMembers(limit = 100, offset = 0) {
  try {
    const members = await sql`
      SELECT id, username, email, role, created_at, last_login, is_active
      FROM doxbin_users
      WHERE role = 'member'
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `
    return members as DoxbinUser[]
  } catch (error) {
    console.error("[v0] Get members error:", error)
    return []
  }
}

export async function getMemberCount(): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM doxbin_users WHERE role = 'member'
    `
    return Number(result[0].count)
  } catch (error) {
    console.error("[v0] Get member count error:", error)
    return 0
  }
}

export async function searchMembers(query: string) {
  try {
    const members = await sql`
      SELECT id, username, email, role, created_at, last_login, is_active
      FROM doxbin_users
      WHERE role = 'member' 
      AND (username ILIKE ${"%" + query + "%"} OR email ILIKE ${"%" + query + "%"})
      ORDER BY created_at DESC
      LIMIT 50
    `
    return members as DoxbinUser[]
  } catch (error) {
    console.error("[v0] Search members error:", error)
    return []
  }
}
