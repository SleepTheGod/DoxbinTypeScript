"use client"

import { Button } from "@/components/ui/button"
import { FileCode } from "lucide-react"
import Link from "next/link"

interface RawButtonProps {
  id: string
}

export function RawButton({ id }: RawButtonProps) {
  return (
    <Button asChild variant="outline" size="sm">
      <Link href={`/${id}/raw`}>
        <FileCode className="h-4 w-4 mr-2" />
        Raw
      </Link>
    </Button>
  )
}
