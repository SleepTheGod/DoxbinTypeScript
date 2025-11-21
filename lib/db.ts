import { neon } from "@neondatabase/serverless"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

export interface Paste {
  id: string
  title: string
  content: string
  views: number
  created_at: Date
  updated_at: Date
  ip_address?: string
  user_agent?: string
}

export interface PasteInput {
  title: string
  content: string
  ip_address?: string
  user_agent?: string
}

// Generate random ID
export function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Get all pastes
export async function getAllPastes(limit = 50): Promise<Paste[]> {
  const result = await sql`
    SELECT * FROM doxbin_pastes 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `
  return result as Paste[]
}

// Get paste by ID
export async function getPasteById(id: string): Promise<Paste | null> {
  const result = await sql`
    SELECT * FROM doxbin_pastes 
    WHERE id = ${id}
  `
  return (result[0] as Paste) || null
}

// Create new paste
export async function createPaste(data: PasteInput): Promise<Paste> {
  const id = generateId()
  const result = await sql`
    INSERT INTO doxbin_pastes (id, title, content, ip_address, user_agent)
    VALUES (${id}, ${data.title}, ${data.content}, ${data.ip_address || null}, ${data.user_agent || null})
    RETURNING *
  `
  return result[0] as Paste
}

// Increment view count
export async function incrementViews(id: string): Promise<void> {
  await sql`
    UPDATE doxbin_pastes 
    SET views = views + 1 
    WHERE id = ${id}
  `
}

// Get total paste count
export async function getTotalPastes(): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count FROM doxbin_pastes
  `
  return Number(result[0].count)
}
