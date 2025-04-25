import { useRef, useState } from "react";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";

export default function Login() {

  const { login } = useStateContext();

  const idCardNumberRef = useRef(),
    passwordRef = useRef();

  const [error, setError] = useState(null);

  const onLogin = (e) => {
    e.preventDefault();

    const payload = {
      id_card_number: idCardNumberRef.current.value,
      password: passwordRef.current.value
    }

    console.log(payload);

    axiosClient
      .post('auth/login', payload)
      .then((res) => {
        const data = res.data,
          token = data.token;

        login(data, token);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;
        setError(message);
      });


  }
  return (
    <main>
      <header className="jumbotron">
        <div className="container text-center">
          <h1 className="display-4">Job Seekers Platform</h1>
        </div>

      </header>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form className="card card-default">
              <div className="card-header">
                <h4 className="mb-0">Login</h4>
              </div>

              {
                error && (
                  <div className="container mt-3">
                    <div className="alert alert-danger fw-bold" role="alert">{error}</div>
                  </div>
                )
              }
              <div className="card-body">
                <div className="form-group row align-items-center">
                  <div className="col-4 text-right" >ID Card Number</div>
                  <div className="col-8">
                    <input type="text" className="form-control" ref={idCardNumberRef} placeholder="input id card number" />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <div className="col-4 text-right" >Password</div>
                  <div className="col-8">
                    <input type="password" className="form-control" ref={passwordRef} placeholder="input password"  />
                  </div>
                </div>
                <div className="form-group row align-items-center mt-4">
                  <div className="col-4"></div>
                  <div className="col-8">
                    <button className="btn btn-primary" onClick={onLogin}>Login</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
