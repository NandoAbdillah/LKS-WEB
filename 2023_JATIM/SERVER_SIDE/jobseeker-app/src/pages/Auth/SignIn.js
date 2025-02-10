import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useRouter } from "../../router/CustomRouter";
import { httpClient } from "../../utils/httpClient";

export default function SignIn() {
  const { showNotification, login, user } = useAuth();
  const [idCard, setIdCard] = useState(null);
  const [password, setPassword] = useState(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');

    try {
      const response = await httpClient(
        "http://127.0.0.1:8000/api/v1/auth/login",
        {
          method: "POST",
          body: {
            id_card_number: idCard,
            password: password,
          },
        }
      );

      const data = await response.data;
      login(data.data, data.token);
      showNotification("success", "Login successfull");
    } catch (error) {
      // console.error(error);
      showNotification("danger", error.message);
    }
    // login({ nama: "Nando Abdillah" }, 123456789);
    // showNotification("success", "Successfully SignIn");
    // navigate('/');
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle p-5 shadow-lg rounded bg-body">
      <h2 className="text-center h2">Sign In</h2>
      <form onSubmit={handleSubmit}>
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
