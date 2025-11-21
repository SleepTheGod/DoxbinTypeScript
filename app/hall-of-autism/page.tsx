import { Navbar } from "@/components/navbar"

export default function HallOfAutismPage() {
  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "80px auto 40px", padding: "0 15px" }}>
        <h1 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}>Hall of Autism</h1>
        <p style={{ color: "#999999" }}>Hall of fame for notable pastes.</p>
      </div>
    </>
  )
}
