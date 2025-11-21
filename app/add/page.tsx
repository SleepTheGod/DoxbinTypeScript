"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/pastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error("Failed to create paste")
      }

      const data = await response.json()
      router.push(`/dox/${data.id}`)
    } catch (error) {
      setError("Failed to create paste. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setTitle("")
    setContent("")
    setError("")
  }

  return (
    <>
      <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />

      <div className="bin-body">
        <div className="wrapper">
          <form onSubmit={handleSubmit} className="editor-form" style={{ display: "flex", width: "100%" }}>
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
                <p style={{ color: "red" }}>REMINDER: This is a test-run, expect bugs.</p>

                {error && <p style={{ color: "#ff3333", fontSize: "14px", marginTop: "10px" }}>{error}</p>}

                <h3>Title:</h3>
                <input
                  type="text"
                  name="doxTitle"
                  maxLength={70}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="options">
                <ul>
                  <li>
                    <button type="submit" className="button" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save (CMD+S)"}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={handleReset} className="button">
                      Clear
                    </button>
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
              <textarea
                name="dox"
                className="editor mousetrap"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                wrap="off"
                required
                placeholder="Enter your content here..."
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
