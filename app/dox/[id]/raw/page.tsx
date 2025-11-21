import { notFound } from "next/navigation"
import { getPasteById } from "@/lib/db"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RawPage({ params }: PageProps) {
  const { id } = await params
  const paste = await getPasteById(id)

  if (!paste) {
    notFound()
  }

  return <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap", padding: "1rem" }}>{paste.content}</div>
}
