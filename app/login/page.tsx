export default function LoginPage() {
  return (
    <>
      <div style={{ maxWidth: "400px", margin: "100px auto", padding: "0 15px" }}>
        <div style={{ background: "#0a0a0a", padding: "30px", border: "1px solid #222" }}>
          <h2 style={{ color: "#ffffff", fontSize: "20px", marginBottom: "20px", textAlign: "center" }}>Login</h2>
          <form>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#999999", fontSize: "12px", display: "block", marginBottom: "5px" }}>
                Username
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  color: "#ffffff",
                  borderRadius: "2px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#999999", fontSize: "12px", display: "block", marginBottom: "5px" }}>
                Password
              </label>
              <input
                type="password"
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  color: "#ffffff",
                  borderRadius: "2px",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#ffffff",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
