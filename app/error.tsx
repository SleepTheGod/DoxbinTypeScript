"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "700",
          color: "var(--accent)",
          margin: "0 0 20px 0",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "var(--muted-foreground)",
          margin: "0 0 30px 0",
          maxWidth: "500px",
        }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={() => reset()}
          style={{
            padding: "12px 24px",
            background: "var(--secondary)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: "12px 24px",
            background: "var(--primary)",
            color: "var(--background)",
            border: "1px solid var(--primary)",
            borderRadius: "var(--radius-md)",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
