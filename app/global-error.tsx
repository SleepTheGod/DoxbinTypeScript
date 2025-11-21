"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#000000",
          color: "#ffffff",
        }}
      >
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
              color: "#ff3333",
              margin: "0 0 20px 0",
            }}
          >
            Critical Error
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#999999",
              margin: "0 0 30px 0",
              maxWidth: "500px",
            }}
          >
            A critical error occurred. Please refresh the page or contact support if the problem persists.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "12px 24px",
              background: "#1a1a1a",
              color: "#ffffff",
              border: "1px solid #333",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  )
}
