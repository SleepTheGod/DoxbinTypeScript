import Link from "next/link"
import { Eye, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Paste } from "@/lib/db"

interface PasteCardProps {
  paste: Paste
}

export function PasteCard({ paste }: PasteCardProps) {
  const date = new Date(paste.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Link href={`/${paste.id}`} className="block">
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg truncate">{paste.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{paste.content.substring(0, 150)}...</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {paste.views} views
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
