"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />

      <nav className="navbar navbar-default navbar-fixed-top doxbin-navbar">
        <div className="container-fluid" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          <div className="navbar-header">
            <Link className="navbar-brand" href="/" style={{ fontSize: "16px", padding: "15px" }}>
              Doxbin
            </Link>
          </div>
          <div id="navbar" className="navbar-collapse" style={{ display: "block" }}>
            <ul className="nav navbar-nav">
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">Home</Link>
              </li>
              <li className={pathname === "/add" ? "active" : ""}>
                <Link href="/add">Add Paste</Link>
              </li>
              <li className={pathname === "/users" ? "active" : ""}>
                <Link href="/users">Users</Link>
              </li>
              <li className={pathname === "/upgrades" ? "active" : ""}>
                <Link href="/upgrades">Upgrades</Link>
              </li>
              <li className={pathname === "/hall-of-autism" ? "active" : ""}>
                <Link href="/hall-of-autism">Hall of Autism</Link>
              </li>
              <li className={pathname === "/tos" ? "active" : ""}>
                <Link href="/tos">TOS</Link>
              </li>
              <li>
                <a href="https://t.me/doxbin" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className={pathname === "/login" ? "active" : ""}>
                <Link href="/login">Login</Link>
              </li>
              <li className={pathname === "/register" ? "active" : ""}>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" defer></script>
    </>
  )
}
