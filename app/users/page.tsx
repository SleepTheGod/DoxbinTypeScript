export default function UsersPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "80px auto 40px", padding: "0 15px" }}>
      <h1 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}>Users</h1>
      <p style={{ color: "#999999", marginBottom: "20px" }}>User directory coming soon.</p>

      <div style={{ background: "#0a0a0a", padding: "20px", border: "1px solid #222" }}>
        <table style={{ width: "100%", color: "#999" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #222" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Username</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Pastes</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                No users to display
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
