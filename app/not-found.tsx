import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function NotFound() {
  return (
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      <Navbar />

      <div style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div className="alert alert-danger text-center">
              <h2 style={{ marginTop: 0 }}>404 - Paste Not Found</h2>
              <p>The paste you're looking for doesn't exist or has been removed.</p>
              <Link href="/" style={{ color: "#f0523f", textDecoration: "underline" }}>
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
