import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

export interface Paste {
  id: string
  title: string
  content: string
  views: number
  created_at: string
  updated_at: string
  ip_address?: string
  user_agent?: string
}

export interface PasteInput {
  title: string
  content: string
  ip_address?: string
  user_agent?: string
}

export function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const length = 8
  let result = ""

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

export async function getAllPastes(limit = 150, offset = 0): Promise<Paste[]> {
  try {
    const result = await sql`
      SELECT * FROM doxbin_pastes 
      ORDER BY created_at DESC 
      LIMIT ${limit}
      OFFSET ${offset}
    `
    return result as Paste[]
  } catch (error) {
    console.error("[v0] Error fetching pastes:", error)
    throw new Error("Failed to fetch pastes")
  }
}

export async function getPinnedPastes(): Promise<Paste[]> {
  try {
    const result = await sql`
      SELECT * FROM doxbin_pastes 
      ORDER BY views DESC 
      LIMIT 4
    `
    return result as Paste[]
  } catch (error) {
    console.error("[v0] Error fetching pinned pastes:", error)
    return []
  }
}

export async function getPasteById(id: string): Promise<Paste | null> {
  try {
    if (!id || typeof id !== "string") {
      return null
    }

    const result = await sql`
      SELECT * FROM doxbin_pastes 
      WHERE id = ${id}
    `
    return (result[0] as Paste) || null
  } catch (error) {
    console.error("[v0] Error fetching paste:", error)
    return null
  }
}

export async function createPaste(data: PasteInput): Promise<Paste> {
  try {
    // Validate input
    if (!data.title || !data.content) {
      throw new Error("Title and content are required")
    }

    if (data.title.length > 255) {
      throw new Error("Title must be 255 characters or less")
    }

    if (data.content.length > 1000000) {
      throw new Error("Content must be 1MB or less")
    }

    // Generate unique ID with retry logic
    let id = generateId()
    let retries = 0
    const maxRetries = 5

    while (retries < maxRetries) {
      try {
        const result = await sql`
          INSERT INTO doxbin_pastes (id, title, content, ip_address, user_agent)
          VALUES (${id}, ${data.title}, ${data.content}, ${data.ip_address || null}, ${data.user_agent || null})
          RETURNING *
        `
        return result[0] as Paste
      } catch (error: any) {
        // If duplicate key error, generate new ID and retry
        if (error?.code === "23505") {
          id = generateId()
          retries++
          continue
        }
        throw error
      }
    }

    throw new Error("Failed to generate unique paste ID")
  } catch (error) {
    console.error("[v0] Error creating paste:", error)
    throw error
  }
}

export async function incrementViews(id: string): Promise<void> {
  try {
    if (!id || typeof id !== "string") {
      return
    }

    await sql`
      UPDATE doxbin_pastes 
      SET views = views + 1 
      WHERE id = ${id}
    `
  } catch (error) {
    console.error("[v0] Error incrementing views:", error)
    // Don't throw error, just log it
  }
}

export async function getTotalPastes(): Promise<number> {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM doxbin_pastes
    `
    return Number(result[0].count) || 0
  } catch (error) {
    console.error("[v0] Error getting total pastes:", error)
    return 0
  }
}

export async function searchPastes(query: string, limit = 50): Promise<Paste[]> {
  try {
    if (!query || typeof query !== "string") {
      return []
    }

    const searchTerm = `%${query}%`
    const result = await sql`
      SELECT * FROM doxbin_pastes 
      WHERE title ILIKE ${searchTerm} OR content ILIKE ${searchTerm}
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `
    return result as Paste[]
  } catch (error) {
    console.error("[v0] Error searching pastes:", error)
    return []
  }
}

export async function deletePaste(id: string): Promise<boolean> {
  try {
    if (!id || typeof id !== "string") {
      return false
    }

    const result = await sql`
      DELETE FROM doxbin_pastes 
      WHERE id = ${id}
      RETURNING id
    `
    return result.length > 0
  } catch (error) {
    console.error("[v0] Error deleting paste:", error)
    return false
  }
}
