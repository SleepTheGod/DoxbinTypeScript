export default function UpgradesPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "80px auto 40px", padding: "0 15px" }}>
      <h1 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}>Upgrades</h1>
      <p style={{ color: "#999999", marginBottom: "20px" }}>Account upgrades and premium features.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        <div style={{ background: "#0a0a0a", padding: "20px", border: "1px solid #222" }}>
          <h3 style={{ color: "#ffffff", fontSize: "18px", marginBottom: "10px" }}>Basic</h3>
          <p style={{ color: "#999", marginBottom: "15px" }}>Free</p>
          <ul style={{ color: "#999", listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px" }}>✓ Create pastes</li>
            <li style={{ marginBottom: "8px" }}>✓ View all content</li>
            <li style={{ marginBottom: "8px" }}>✓ Anonymous posting</li>
          </ul>
        </div>

        <div style={{ background: "#0a0a0a", padding: "20px", border: "1px solid #ff3333" }}>
          <h3 style={{ color: "#ffffff", fontSize: "18px", marginBottom: "10px" }}>Premium</h3>
          <p style={{ color: "#ff3333", marginBottom: "15px" }}>$9.99/month</p>
          <ul style={{ color: "#999", listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "8px" }}>✓ All Basic features</li>
            <li style={{ marginBottom: "8px" }}>✓ Pin pastes</li>
            <li style={{ marginBottom: "8px" }}>✓ Custom badge</li>
            <li style={{ marginBottom: "8px" }}>✓ Ad-free</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
