import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { httpClient } from "../../utils/httpClient";
import axiosClient from "../../utils/axios-client";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const { showNotification, login, user } = useAuth();
  const [idCard, setIdCard] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
       id_card_number : idCard,
       password : password
    }

    axiosClient.post("auth/login" , payload)
    .then((res) => {
      const data = res.data;
      login(data.data, data.token);
      showNotification("success", "Login successfull");
    })
    .catch((err) => {
      const data = err.data,
      message = data.message;

      showNotification("danger", message);
    })
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle p-5 shadow-lg rounded bg-body w-25">
      <h2 className="text-center h2">Sign In</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="idCard">
            ID Card Number
          </label>
          <input
            type="number"
            id="idCard"
            className={`form-control ${
              idCard !== null
                ? idCard.length > 4
                  ? "is-valid"
                  : "is-invalid"
                : ""
            }`}
            onChange={(e) => setIdCard(e.target.value)}
            placeholder="input id card anda"
            required
          />

          <div className="valid-feedback">Looks good!</div>

          <div className="invalid-feedback">
            Please input a valid username with at least 5 characters.
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
                ? password.length >= 8
                  ? "is-valid"
                  : "is-invalid"
                : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="input your password"
            required
          />
          <div className="valid-feedback">Look Good !</div>

          <div className="invalid-feedback">
            Password should be at least 8 characters long.
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>

        <div className="mt-5 mb-3 d-flex justify-content-center">
          <p>
            Don't have account <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
