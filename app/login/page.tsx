export const metadata = {
  title: "Login",
  description: "Login to your Doxbin account",
}

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Doxbin</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter your username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="auth-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
