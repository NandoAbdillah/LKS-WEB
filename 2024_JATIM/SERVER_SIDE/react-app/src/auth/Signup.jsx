export default function Signup() {
  return (
    <div className="card shadow-lg p-4"
        style={{ width: '100%', maxWidth: '400px' }}
    >
      <h2 className="text-center mb-4">Signup</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username here"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password here"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Password Confirmation
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-3">Already have account? <a className="text-decoration-none" href="/signin">Sign In</a> </p>
    </div>
  );
}
