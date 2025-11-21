import Link from "next/link"
import { FileText } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <FileText className="h-6 w-6" />
            DoxBin
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/add" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Add Paste
            </Link>
            <Link href="/tos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
