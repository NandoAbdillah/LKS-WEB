import { useEffect, useState } from "react";
import { Link, useRouter } from "../../router/CustomRouter";
import { useAuth } from "../../context/AuthContext";
import { httpClient } from "../../utils/httpClient";

export default function Signup() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [gender, setGender] = useState(null);
  const [bornDate, setBornDate] = useState(null);
  const [address, setAddress] = useState(null);

  const { user, token, showNotification, login } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: username,
      id_card_number: idCard,
      password: password,
      born_date: bornDate,
      gender: gender,
      address: address,
      regional_id : '1'
    };

    // console.log(payload);

    try {
      const response = await httpClient(
        "http://127.0.0.1:8000/api/v1/auth/register",
        {
          method: "POST",
          body: payload,
          token: token,
        }
      );

      const userData = response.data.data;
      const userToken = response.data.token;

      login(userData, userToken);
      showNotification("success", "Successfully Register");
    } catch (error) {
      showNotification("danger", error.message);
    }
  };

  // Untuk mendapatkan input radio
  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="position-absolute top-100 start-50 translate-middle p-5 rounded shadow-lg">
      <h2 className="text-center h2 mb-3">Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="form-label" htmlFor="idCard">
            ID Card
          </label>
          <input
            id="idCard"
            className={`form-control ${
              idCard !== null
                ? idCard.length !== 7
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="number"
            maxLength={10}
            onChange={(e) => setIdCard(e.target.value)}
            placeholder="Input your citizenship id"
            required
          />

          <div className="valid-feedback">ID Card is good!</div>
          <div className="invalid-feedback">invalid ID Card</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="bornDare">
            Born Date
          </label>

          <input
            id="bornDate"
            className="form-control"
            type="date"
            required
            onChange={(e) => setBornDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="genderCheck">
            Gender
          </label>
          <div
            className="form-check d-flex justify-content-around"
            id="genderCheck"
          >
            <div>
              <input
                id="genderMale"
                value="male"
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="genderMale" className="form-label">
                Male
              </label>
            </div>
            <div>
              <input
                id="genderFemale"
                value="female"
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="genderFemale" className="form-label">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            className={`form-control ${
              address !== null
                ? address.length < 3
                  ? "is-invalid"
                  : "is-valid"
                : ""
            }`}
            type="text"
            maxLength={10}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Input your address"
            required
          />

          <div className="valid-feedback">Address is good!</div>
          <div className="invalid-feedback">invalid Address</div>
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
