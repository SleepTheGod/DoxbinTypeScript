import { notFound } from "next/navigation"
import { getPasteById, incrementViews } from "@/lib/db"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const paste = await getPasteById(id)

  if (!paste) {
    return {
      title: "Paste Not Found",
      description: "The requested paste could not be found.",
    }
  }

  return {
    title: `${paste.title}`,
    description: paste.content.substring(0, 160) + "...",
    openGraph: {
      title: paste.title,
      description: paste.content.substring(0, 160) + "...",
      type: "article",
      publishedTime: paste.created_at,
    },
  }
}

export default async function PastePage({ params }: PageProps) {
  const { id } = await params
  const paste = await getPasteById(id)

  if (!paste) {
    notFound()
  }

  incrementViews(id).catch((err) => console.error("[v0] Failed to increment views:", err))

  const date = new Date(paste.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <>
      <link href="https://cdn.jsdelivr.net/gh/google/code-prettify@master/styles/tomorrow-night.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js" defer></script>

      <div className="bin-body">
        <div className="wrapper">
          <div className="sidebar">
            <Link href="/">
              <pre>{`  ____            _     _       
 |  _ \\  _____  _| |__ (_)_ __  
 | | | |/ _ \\ \\/ / '_ \\| | '_ \\ 
 | |_| | (_) >  <| |_) | | | | |
 |____/ \\___/_/\\_\\_.__/|_|_| |_|
                                `}</pre>
            </Link>

            <div className="options">
              <h3>Paste Information</h3>
              <p style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#fff" }}>Title:</strong>
                <br />
                <span style={{ color: "#999" }}>{paste.title}</span>
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#fff" }}>Created:</strong>
                <br />
                <span style={{ color: "#999" }}>{date}</span>
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#fff" }}>Views:</strong>
                <br />
                <span style={{ color: "#999" }}>{paste.views.toLocaleString()}</span>
              </p>
            </div>

            <div className="options">
              <ul>
                <li>
                  <Link href="/add" className="button new">
                    New (N)
                  </Link>
                </li>
                <li>
                  <Link href={`/dox/${paste.id}/raw`} target="_blank" className="button raw">
                    Raw (R)
                  </Link>
                </li>
                <li>
                  <Link href="/" className="button">
                    Back to Home
                  </Link>
                </li>
              </ul>
            </div>

            <p style={{ fontSize: "12px", lineHeight: "1.6", color: "#999" }}>
              Please note that all posted information is publicly available and must follow our{" "}
              <Link href="/tos" style={{ textDecoration: "underline", color: "#00bfff" }}>
                Terms of Service
              </Link>
              .
            </p>
          </div>

          <div className="editor-container">
            <div className="editor mousetrap">
              <pre className="predox prettyprint">{paste.content}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
