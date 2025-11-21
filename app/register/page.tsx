export const metadata = {
  title: "Register",
  description: "Create a new Doxbin account",
}

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Choose a username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Create a password" required />
          </div>
          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}
