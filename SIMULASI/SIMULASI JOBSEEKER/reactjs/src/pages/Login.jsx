import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/ContextProvider"
import { useEffect, useRef, useState } from "react";
import client from "../utils/axios-client";

export default function Login() {

    const { user, login } = useAuthContext();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const idCardNumberRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate]);


    const onLogin = (e) => {

        e.preventDefault();

        const payload = {
            id_card_number: idCardNumberRef.current.value,
            password: passwordRef.current.value
        }

        client
            .post('auth/login', payload)
            .then((res) => {
                const data = res.data;

                alert("Successfully login !");

                login(data, data.token);
            })
            .catch((err) => {
                const data = err.data,
                    message = data.message;

                setError(message);
            })
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
                        <form className="card card-default" onSubmit={onLogin}>
                            <div className="card-header">
                                <h4 className="mb-0">Login</h4>
                            </div>
                            <div className="card-body">
                                {
                                    error && (
                                        <div className="form-group row align-items-center">
                                            <div className="alert alert-danger fw-bold">{error}</div>
                                        </div>

                                    )
                                }
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">ID Card Number</div>
                                    <div className="col-8"><input type="text" className="form-control" placeholder="input your username" ref={idCardNumberRef} required /></div>
                                </div>
                                <div className="form-group row align-items-center">
                                    <div className="col-4 text-right">Password</div>
                                    <div className="col-8"><input type="password" placeholder="input your password" className="form-control" ref={passwordRef} required /></div>
                                </div>
                                <div className="form-group row align-items-center mt-4">
                                    <div className="col-4"></div>
                                    <div className="col-8"><button className="btn btn-primary" type="submit">Login</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )

}