import Link from "next/link"

export default function NotFound() {
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
          fontSize: "72px",
          fontWeight: "700",
          color: "var(--accent)",
          margin: "0 0 20px 0",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "var(--foreground)",
          margin: "0 0 15px 0",
        }}
      >
        Paste Not Found
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "var(--muted-foreground)",
          margin: "0 0 30px 0",
          maxWidth: "500px",
        }}
      >
        The paste you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 24px",
          background: "var(--secondary)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s ease",
        }}
      >
        Return to Home
      </Link>
    </div>
  )
}
