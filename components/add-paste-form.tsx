"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AddPasteForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/pastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create paste")
      }

      const data = await response.json()

      toast({
        title: "Success",
        description: "Paste created successfully",
      })

      router.push(`/${data.id}`)
    } catch (error) {
      console.error("[v0] Error creating paste:", error)
      toast({
        title: "Error",
        description: "Failed to create paste. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter a title for your paste"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          disabled={loading}
          maxLength={255}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Paste your content here..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          disabled={loading}
          rows={15}
          className="font-mono text-sm"
          required
        />
        <p className="text-xs text-muted-foreground">{formData.content.length} characters</p>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Creating..." : "Create Paste"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
