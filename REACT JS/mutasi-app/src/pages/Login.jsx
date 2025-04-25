import { useRef, useState } from "react"
import axiosClient from "../utils/axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login()
{   
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error,setError]  = useState(null);
    const {updateUser, updateToken} = useStateContext();

    const handleSubmit = (ev) =>   {
        ev.preventDefault();
        setError(null);

        const payload = {
           email : emailRef.current.value,
           password : passwordRef.current.value,
        };

        axiosClient
        .post('auth/login', payload)
        .then((response)=> {
            const data = response.data
            updateToken(data.token);
            updateUser(data.user_type);
        })
        .catch((err)=> {
            const response = err.response,
            message = response.data.message,
            status = response.status;
            setError(status + " " + message);
        })
    }

    return (
        <div className="card  p-3 "  style={{ width : '30rem' }}>
           <h2 className="mb-4 text-center">Login</h2>

           {error && (
             <div className="alert alert-danger fw-bold" role="alert">
                {error}
             </div>
           )}

           <form onSubmit={handleSubmit}>
              <div className="mb-3">
                 <label className="form-label" htmlFor="email">Email</label>
                 <input type="email" id="email" name="email" className="form-control" placeholder="Masukkan email" ref={emailRef} required />
              </div>
              
              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Masukkan password" ref={passwordRef} required />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
           </form>
        </div>
    )
}