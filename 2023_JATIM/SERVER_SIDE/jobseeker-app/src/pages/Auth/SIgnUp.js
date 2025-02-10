import { useEffect, useState } from "react";
import { Link, useRouter } from "../../router/CustomRouter";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState(null);
  const {user} = useAuth();
  const {navigate} = useRouter();

  useEffect(()=> {
    if(user) {
      navigate('/');
    }
  }, []);


  return (
    <div className="position-absolute top-50 start-50 translate-middle p-5 rounded shadow-lg">
      <h2 className="text-center h2 mb-3">Sign Up</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              username !== null
                ? username.length >= 4
                  ? "is-valid"
                  : "is-invalid"
                : ""
            }`}
            id="username"
            placeholder="input your username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Your usename must be at least 4 characters long
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              password !== null
                ? password.length > 8
                  ? "is-valid"
                  : "is-invalid"
                : ""
            }`}
            placeholder="input your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="valid-feedback">Password is strong</div>
          <div className="invalid-feedback">
            Password must be at least 8 characters long
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="confirmationPassword">
            Confirmation Password
          </label>

          <input
            type="password"
            id="password"
            className={`form-control ${
              confirmationPassword !== null
                ? confirmationPassword === password
                  ? "is-valid"
                  : "is-invalid"
                : ""
            }`}
            placeholder="input password confirmation"
            onChange={(e) => setConfirmationPassword(e.target.value)}
            required
          />

          <div className="valid-feedback">Passwords match</div>
          <div className="invalid-feedback">Passwords do not match</div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreebox"
            required
          />
          <label htmlFor="agreebox" className="form-label">
            I agree with terms and conditions
          </label>
        </div>

        <div className="mb-3 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>

        <div className="mt-5  mb-3 d-flex justify-content-center">
          <p className="me-2 ">Already have an account </p>
          <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
