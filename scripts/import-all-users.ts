import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { join } from "path"

const sql = neon(process.env.DATABASE_URL!)

async function importUsers() {
  console.log("Starting user import...")

  // Read the breach file (username:email)
  const breachPath = join(process.cwd(), "user_read_only_context", "text_attachments", "doxbin-breached-2wmPl.txt")
  const breachContent = readFileSync(breachPath, "utf-8")
  const breachLines = breachContent.split("\n").filter((line) => line.trim())

  // Read the password file (SQL tuples)
  const pwPath = join(process.cwd(), "user_read_only_context", "text_attachments", "doxbinpws-BB8Qd.txt")
  const pwContent = readFileSync(pwPath, "utf-8")
  const pwLines = pwContent.split("\n").filter((line) => line.trim())

  // Parse username:email pairs
  const emailMap = new Map<string, string>()
  for (const line of breachLines) {
    const [username, email] = line.split(":")
    if (username && email) {
      emailMap.set(username.trim(), email.trim())
    }
  }

  // Parse password tuples
  const passwordMap = new Map<string, string>()
  for (const line of pwLines) {
    const match = line.match(/$$'([^']+)',\s*'([^']+)'$$/)
    if (match) {
      const username = match[1].trim()
      const password = match[2].trim()
      passwordMap.set(username, password)
    }
  }

  console.log(`Found ${emailMap.size} users with emails`)
  console.log(`Found ${passwordMap.size} users with passwords`)

  // Combine and insert users
  let insertCount = 0
  const users: Array<{ name: string; email: string; password: string }> = []

  for (const [username, email] of emailMap.entries()) {
    const password = passwordMap.get(username) || "default123"
    users.push({
      name: username,
      email: email,
      password: password,
    })
  }

  // Insert in batches of 100
  const batchSize = 100
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize)

    try {
      for (const user of batch) {
        await sql`
          INSERT INTO users (name, email, password, role, created_at)
          VALUES (
            ${user.name},
            ${user.email},
            ${user.password},
            'user',
            NOW()
          )
          ON CONFLICT (email) DO NOTHING
        `
        insertCount++
      }

      console.log(`Inserted ${Math.min(i + batchSize, users.length)}/${users.length} users...`)
    } catch (error) {
      console.error(`Error inserting batch starting at ${i}:`, error)
    }
  }

  console.log(`\nImport complete! Inserted ${insertCount} users.`)
}

importUsers().catch(console.error)
