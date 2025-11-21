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
      title: "Paste Not Found - DoxBin",
    }
  }

  return {
    title: `${paste.title} - Doxbin`,
    description: paste.content.substring(0, 155),
  }
}

export default async function PastePage({ params }: PageProps) {
  const { id } = await params
  const paste = await getPasteById(id)

  if (!paste) {
    notFound()
  }

  await incrementViews(id)

  const date = new Date(paste.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <>
      <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
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
              <p>
                <strong>Title:</strong> {paste.title}
              </p>
              <p>
                <strong>Created:</strong> {date}
              </p>
              <p>
                <strong>Views:</strong> {paste.views}
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
              </ul>
            </div>

            <p>
              Please note that all posted information is publicly available and must follow our{" "}
              <Link href="/tos" style={{ textDecoration: "underline" }}>
                TOS.
              </Link>
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
