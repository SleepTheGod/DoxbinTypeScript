"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const audioRef = useRef<HTMLIFrameElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const tryAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.src =
          "https://www.youtube.com/embed/YcqQAw9giMo?autoplay=1&mute=0&loop=1&playlist=YcqQAw9giMo&volume=100"
      }
    }

    tryAutoplay()

    const handleInteraction = () => {
      tryAutoplay()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("keydown", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log("[v0] Search query:", searchQuery)
  }

  return (
    <>
      <iframe
        ref={audioRef}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "1px",
          height: "1px",
          border: "none",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        src="https://www.youtube.com/embed/YcqQAw9giMo?autoplay=1&mute=0&loop=1&playlist=YcqQAw9giMo&controls=0&enablejsapi=1"
        allow="autoplay; encrypted-media; fullscreen"
        title="Background Music"
        allowFullScreen
      />

      <div className="center-content">
        <svg
          className="devil-logo"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
          strokeWidth="1.5"
        >
          <path d="M70 30 L60 10 L65 5 L75 10 Z" fill="#ffffff" />
          <path d="M130 30 L140 10 L135 5 L125 10 Z" fill="#ffffff" />
          <circle cx="100" cy="100" r="45" stroke="#ffffff" strokeWidth="2" fill="none" />
          <path d="M85 85 L80 95 L90 95 Z" fill="#ffffff" />
          <path d="M115 85 L120 95 L110 95 Z" fill="#ffffff" />
          <path d="M75 110 Q85 125 100 127 Q115 125 125 110" stroke="#ffffff" strokeWidth="2" fill="none" />
          <path d="M100 140 L90 150 L100 145 L110 150 Z" fill="#ffffff" />
        </svg>

        <div className="center-links">
          <Link href="https://t.me/doxbin" target="_blank" rel="noopener noreferrer">
            Doxbin Telegram Group
          </Link>
          <Link href="https://twitter.com/doxbin" target="_blank" rel="noopener noreferrer">
            Official Doxbin Twitter
          </Link>
          <Link href="https://doxbin.com" target="_blank" rel="noopener noreferrer">
            Mirror Doxbin.com
          </Link>
        </div>
      </div>

      <div className="search-container">
        <label className="search-label">Search for a paste</label>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-box"
            placeholder="Search by title, content, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="showing-text">Showing 150 (of 61,809 total) pastes</div>

      <div className="pagination">
        <a href="#" onClick={(e) => e.preventDefault()}>
          &laquo;
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="active">
          1
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          2
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          3
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          4
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          5
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          ...
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          413
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          &raquo;
        </a>
      </div>

      <div className="pinned-pastes">
        <h2>Pinned Pastes</h2>
        <table id="pinnedTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Comments</th>
              <th>Views</th>
              <th>Created by</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="/dox/1">zalgo poor retard</Link>
              </td>
              <td>55</td>
              <td>2,251</td>
              <td>
                <Link href="/users/blade69">blade69</Link>
              </td>
              <td>Apr 21st, 2022</td>
            </tr>
            <tr>
              <td>
                <Link href="/dox/2">jackson.bz</Link>
              </td>
              <td>11</td>
              <td>957</td>
              <td>
                <Link href="/users/stephen">stephen</Link>
              </td>
              <td>Apr 15th, 2022</td>
            </tr>
            <tr className="green-row">
              <td>
                <Link href="/dox/3">How to Ensure Your Paste Stays Up</Link>
              </td>
              <td>-</td>
              <td>44,455</td>
              <td>
                <Link href="/users/charge">charge [Mod]</Link>
              </td>
              <td>Nov 20th, 2020</td>
            </tr>
            <tr className="red-row">
              <td>
                <Link href="/dox/4">Transparency Report</Link>
              </td>
              <td>-</td>
              <td>61,755</td>
              <td>
                <Link href="/users/le-Medamist">le Medamist</Link>
              </td>
              <td>Jun 20th, 2020</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="all-pastes">
        <table id="allPastesTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Comments</th>
              <th>Views</th>
              <th>Created by</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody id="allPastesBody">
            <tr>
              <td>
                <Link href="/dox/5">Gia Moreno DOXXED EZ HEXED JEWELS XX</Link>
              </td>
              <td>0</td>
              <td>8</td>
              <td>
                <Link href="/users/archive">Archive</Link>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <Link href="/dox/6">Fivy 🔥Foreign OaBrokeBoy</Link>
              </td>
              <td>0</td>
              <td>9</td>
              <td>Anonymous</td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <Link href="/dox/7">how to make sure you pasts stay up</Link>
              </td>
              <td>0</td>
              <td>15</td>
              <td>
                <Link href="/users/lurs">lurs</Link>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <Link href="/dox/8">damn</Link>
              </td>
              <td>0</td>
              <td>13</td>
              <td>
                <Link href="/users/lurs">lurs</Link>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <Link href="/dox/9">129932132</Link>
              </td>
              <td>0</td>
              <td>12</td>
              <td>Anonymous</td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <Link href="/dox/10">Mark Zuckerberg Facebook CEO</Link>
              </td>
              <td>0</td>
              <td>18</td>
              <td>
                <Link href="/users/geoMan1984">GeoMan1984</Link>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pagination" id="bottomPagination">
        <a href="#" onClick={(e) => e.preventDefault()}>
          &laquo;
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="active">
          1
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          2
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          3
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          4
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          5
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          ...
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          413
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          &raquo;
        </a>
      </div>
      <div className="showing-text" style={{ marginBottom: "60px" }}>
        Showing 150 (of 61,809 total) pastes
      </div>
    </>
  )
}
