import { useRef, useState } from "react";
import axiosClient from "../../utils/axios-client";
import { NavLink, useNavigate } from "react-router-dom";

export default function AddUser() {
  const [error, setError] = useState(null);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("users", payload)
      .then((res) => {
        const data = res.data,
          status = data.status;

        navigate("/users");
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  };

  return (
    <div>
      <main>
        <div className="hero py-5 bg-light">
          <div className="container text-center">
            <h2 className="mb-3">Manage User - Administrator Portal</h2>
            <div className="text-muted">
              Please fill username and password field to add new user !
            </div>
          </div>
        </div>

        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-lg-5 col-md-6">
                {error && (
                  <div className=" alert alert-danger fw-bold" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={onSubmit}>
                  <div className="form-item card card-default my-4">
                    <div className="card-body">
                      <div className="form-group">
                        <label for="username" className="mb-1 text-muted">
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
                        <label for="password" className="mb-1 text-muted">
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
                      <button className="btn btn-primary w-100" type="submit">
                        Submit
                      </button>
                    </div>
                    <div className="col">
                      <NavLink to="/" className="btn btn-danger w-100">
                        Back
                      </NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
