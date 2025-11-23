import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { join } from "path"

const sql = neon(process.env.DATABASE_URL!)

async function seedUsers() {
  console.log("Starting user seeding process...")

  try {
    // Read the breach file (username:email)
    const breachData = readFileSync(
      join(process.cwd(), "user_read_only_context/text_attachments/doxbin-breached-2wmPl.txt"),
      "utf-8",
    )

    // Read the password file (SQL tuples format)
    const pwsData = readFileSync(
      join(process.cwd(), "user_read_only_context/text_attachments/doxbinpws-BB8Qd.txt"),
      "utf-8",
    )

    // Parse breach data
    const breachLines = breachData.split("\n").filter((line) => line.trim())
    const userEmailMap = new Map<string, string>()

    for (const line of breachLines) {
      const [username, email] = line.split(":")
      if (username && email) {
        userEmailMap.set(username.trim(), email.trim())
      }
    }

    console.log(`Parsed ${userEmailMap.size} username:email pairs`)

    // Parse password data
    const passwordMap = new Map<string, string>()
    const pwsLines = pwsData.split("\n").filter((line) => line.trim())

    for (const line of pwsLines) {
      // Format: ('username', 'password')
      const match = line.match(/$$'([^']+)',\s*'([^']+)'$$/)
      if (match) {
        const [, username, password] = match
        passwordMap.set(username.trim(), password.trim())
      }
    }

    console.log(`Parsed ${passwordMap.size} username:password pairs`)

    // Combine data and insert
    let inserted = 0
    let skipped = 0
    const batchSize = 100
    const users: Array<{ username: string; email: string; password: string }> = []

    for (const [username, email] of userEmailMap) {
      const password = passwordMap.get(username) || "default_password_123"
      users.push({ username, email, password })
    }

    console.log(`Total users to insert: ${users.length}`)

    // Insert in batches
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize)

      for (const user of batch) {
        try {
          await sql`
            INSERT INTO users (name, email, password, role, created_at, updated_at)
            VALUES (
              ${user.username},
              ${user.email},
              ${user.password},
              'user',
              NOW(),
              NOW()
            )
            ON CONFLICT (email) DO NOTHING
          `
          inserted++
        } catch (error) {
          skipped++
          console.error(`Failed to insert user ${user.username}:`, error)
        }
      }

      if ((i + batchSize) % 1000 === 0) {
        console.log(`Progress: ${Math.min(i + batchSize, users.length)}/${users.length} processed`)
      }
    }

    console.log("\n✅ User seeding complete!")
    console.log(`Inserted: ${inserted}`)
    console.log(`Skipped: ${skipped}`)
  } catch (error) {
    console.error("❌ Error seeding users:", error)
    throw error
  }
}

seedUsers()
