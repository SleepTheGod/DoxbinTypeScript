import { neon } from "@neondatabase/serverless"
import { readFileSync } from "fs"
import { join } from "path"

const sql = neon(process.env.DATABASE_URL!)

async function seedUsers() {
  try {
    console.log("Starting user import...")

    // Read the breach file (username:email)
    const breachFile = readFileSync(
      join(process.cwd(), "user_read_only_context/text_attachments/doxbin-breached-2wmPl.txt"),
      "utf-8",
    )

    // Read the password file (SQL INSERT format)
    const pwsFile = readFileSync(
      join(process.cwd(), "user_read_only_context/text_attachments/doxbinpws-BB8Qd.txt"),
      "utf-8",
    )

    // Parse breach file to get username:email pairs
    const breachLines = breachFile.split("\n").filter((line) => line.trim())
    const userEmails = new Map<string, string>()

    for (const line of breachLines) {
      const [username, email] = line.split(":").map((s) => s.trim())
      if (username && email) {
        userEmails.set(username.toLowerCase(), email)
      }
    }

    console.log(`Parsed ${userEmails.size} username:email pairs`)

    // Parse password file to get username:password pairs
    const pwsLines = pwsFile.split("\n").filter((line) => line.trim())
    const userPasswords = new Map<string, string>()

    for (const line of pwsLines) {
      // Format: ('username', 'password')
      const match = line.match(/$$'([^']+)',\s*'([^']+)'$$/)
      if (match) {
        const [, username, password] = match
        userPasswords.set(username.toLowerCase(), password)
      }
    }

    console.log(`Parsed ${userPasswords.size} username:password pairs`)

    // Combine data and insert users
    let inserted = 0
    let skipped = 0
    const batch = []

    for (const [username, email] of userEmails) {
      const password = userPasswords.get(username) || "defaultpassword123"

      batch.push({
        name: username,
        email: email,
        password: password,
        role: "user",
        email_verified: false,
      })

      // Insert in batches of 100
      if (batch.length >= 100) {
        try {
          for (const user of batch) {
            await sql`
              INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at)
              VALUES (
                ${user.name},
                ${user.email},
                ${user.password},
                ${user.role},
                ${user.email_verified},
                NOW(),
                NOW()
              )
              ON CONFLICT (email) DO NOTHING
            `
            inserted++
          }
          console.log(`Inserted ${inserted} users...`)
        } catch (error) {
          console.error("Error inserting batch:", error)
          skipped += batch.length
        }
        batch.length = 0
      }
    }

    // Insert remaining users
    if (batch.length > 0) {
      try {
        for (const user of batch) {
          await sql`
            INSERT INTO users (name, email, password, role, email_verified, created_at, updated_at)
            VALUES (
              ${user.name},
              ${user.email},
              ${user.password},
              ${user.role},
              ${user.email_verified},
              NOW(),
              NOW()
            )
            ON CONFLICT (email) DO NOTHING
          `
          inserted++
        }
      } catch (error) {
        console.error("Error inserting final batch:", error)
        skipped += batch.length
      }
    }

    console.log(`\nImport complete!`)
    console.log(`Inserted: ${inserted} users`)
    console.log(`Skipped: ${skipped} users`)
  } catch (error) {
    console.error("Error seeding users:", error)
    throw error
  }
}

seedUsers()
