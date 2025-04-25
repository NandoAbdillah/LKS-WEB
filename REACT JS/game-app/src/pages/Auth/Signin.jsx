import { useRef, useState } from "react";
import { useStateContext } from "../../utils/ContextProvider";
import axiosClient from "../../utils/axios-client";
import { NavLink } from "react-router-dom";

export default function Signin() {

  const {setAccessToken, setUserRole} = useStateContext();
  const [error, setError] = useState();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const doSignin = (e) => {
    e.preventDefault();

    const payload = {
        username : usernameRef.current.value,
        password : passwordRef.current.value
    }

    axiosClient
    .post('auth/signin', payload)
    .then((res)=> {
      const data = res.data,
      token = data.token,
      role = data.role;

      setAccessToken(token);
      setUserRole(role);
    })
    .catch((err)=> {
      const data = err.data;
      setError(data.message);
    })
  }
  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-center mb-4">Gaming Portal</h1>
              <div className="card card-default">
                <div className="card-body">
                  <h3 className="mb-3">Sign In</h3>

                 {
                  error && (
                    <div className=" alert alert-danger fw-bold" role="alert">{error}</div>
                  )
                 }

                  <form onSubmit={doSignin}>
                    <div className="form-group my-3">
                      <label htmlFor="username" className="mb-1 text-muted">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        ref={usernameRef}
                        className="form-control"
                        autoFocus
                      />
                    </div>

                    <div className="form-group my-3">
                      <label htmlFor="password" className="mb-1 text-muted">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        className="form-control"
                      />
                    </div>

                    <div className="mt-4 row">
                      <div className="col">
                        <button type="submit" className="btn btn-primary w-100">
                          Sign In
                        </button>
                      </div>
                      <div className="col">
                        <NavLink
                          to="/signup"
                          className="btn btn-danger w-100"
                        >
                          Sign up
                        </NavLink>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
