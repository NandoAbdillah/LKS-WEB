import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../utils/CustomRouter";
import { httpClient } from "../utils/httpClient";

const Signin = () => {
  const { login, showNotification } = useAuth();
  const { navigate } = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 
  const handleLogin = async (e) => {
    e.preventDefault();
    


    try {
      const response = await httpClient("http://127.0.0.1:8000/api/v1/auth/signin", {
        method: "POST",
        body: { username, password },
      });
      
      const data = response.data;
      login({username : username, ...data}, data.token)
      showNotification("Login successful!", "success");
    } catch (err) {
      showNotification(`Error ${err.status} : ${err.message}`, "danger");
      
    }
  };


  return (
    <div className="position-absolute top-50 start-50 translate-middle shadow-lg p-5 rounded-3 bg-body ">
      <h2 className="h2 text-center mb-3">Sign In</h2>
      
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${username.length >= 4  ? "is-valid" : ""} `}
            id="username"
            aria-describedby="emailHelp"
            placeholder="input your username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else
          </div> */}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${password.length >= 8 ? 'is-valid' : ''}`}
            id="password"
            aria-describedby="passwordHelp"
            onChange={(e)=> {
              setPassword(e.target.value);
            }}
            placeholder="********"
            required
          />
          <div className="valid-feedback">Looks Good!</div>
          <div id="passwordHelp" className="form-text">
            Password at least 8 character
          </div>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="agreebox" required />
          <label className="form-check-label" htmlFor="agreebox">
            I agree with terms and conditions 
          </label>
        </div>

        <div className="mb-3 d-flex justify-content-end ">
          <button type="submit" className="btn btn-primary  ">
             Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
