import { use, useRef, useState } from "react";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";
import { NavLink } from "react-router-dom";

export default function Signup() {

  const {setAccessToken, setUserRole} = useStateContext();
  const [error, setError] = useState();


  const usernameRef = useRef();
  const passwordRef = useRef();

  const onSignup  = (e) => {
    e.preventDefault();

    const payload = {
      username : usernameRef.current.value,
      password : passwordRef.current.value
    }


    axiosClient
    .post("auth/signup", payload)
    .then((res) => {
        const data = res.data,
        token = data.token;

        setAccessToken(token);
        setUserRole("user")
    })
    .catch((err)=> {
      const data = err.data,
      message = data.message;

      setError(message);
     
    });




  }
  return (
    <main>
      <div className="hero py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-3">Sign Up - Gaming Portal</h2>
          <div className="text-muted">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-5 col-md-6">
            {
              error && (
                 <div className=" alert alert-danger fw-bold" role="alert">{error}</div>
              )
            }
              <form onSubmit={onSignup}>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="username" className="mb-1 text-muted">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        name="username"
                        ref={usernameRef}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-item card card-default my-4">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="password" className="mb-1 text-muted">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="userpasswordname"
                        ref={passwordRef}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 row">
                  <div className="col">
                    <button className="btn btn-primary w-100">Sign Up</button>
                  </div>
                  <div className="col">
                    <NavLink to="/signin" className="btn btn-danger w-100">
                      Sign In
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
