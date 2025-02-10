import { useState } from "react";
import { httpClient } from "../utils/httpClient";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const {login, showNotification} = useAuth();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirationPassword] = useState('');


  const handleSignup = async(e) => {
    e.preventDefault();

    if(inputValidator) {
        console.log(`username : ${username} password: ${password}`)
         
         
        try {
            const response = await httpClient('http://127.0.0.1:8000/api/v1/auth/signup', {
                method : "POST",
                body : {username, password},
            });

            const data = response.data;
            login({username : username , ...data}, data.token);
            showNotification('Signup successful', 'success');
        }
         catch(err) {
            const errorMessages = Object.values(err.violations).map(err => err.message).join('\n');
            showNotification(`Signup failed ${errorMessages}`, 'danger');
         }
    }
  }

  const inputValidator = () => {
    if(username.length < 4 ||  password.length>8 || username.length <4) {
        return false;
    }
    return true;
  }


  return (
   <div className="position-absolute top-50 start-50 translate-middle shadow-lg p-5 rounded-3 bg-body col-10  col-md-8 col-lg-6 col-xl-4 ">
        <h2 className="h2 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
            <div className="mb-3">
                <label className="form-label" htmlFor="username">
                    Username
                </label>
                <input type="text" id="username"  aria-describedby="usernameHelp" onChange={(e)=> setUsername(e.target.value)} className={`form-control ${ username === '' ? '' : username.length >= 4 ? 'is-valid' : 'is-invalid'}`} required />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                    Your username must be at least 4 characters long
                </div>
                {/* <div id="usernameHelp" className="form-text">
                    Your username must be at least 4 characters long
                </div> */}
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="password">
                    Password
                </label>
                <input id="password" type="password" aria-describedby="passwordHelp" 
                onChange={(e)=> setPassword(e.target.value)} className={`form-control ${password === '' ? '' : password.length >= 5 && password.length <=8 ? 'is-valid' : 'is-invalid' }`} required />

                <div className="valid-feedback">
                    Looks good !
                </div>
                <div className="invalid-feedback">
                    Password must be at least 5 characters and no more than 8 characters
                </div>

                <div className="form-text" id="passwordHelp"></div>
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="passwordConfirmation">
                    Confirm Password
                </label>
                <input type="password" id="passwordConfirmation" onChange={(e)=> setConfirationPassword(e.target.value)} className={`form-control ${confirmationPassword === '' ? '' : password === confirmationPassword ? 'is-valid' : 'is-invalid' }`} required />

                <div className=" valid-feedback">Looks good!</div>
                <div className=" invalid-feedback">
                    Passwords do not match
                </div>
            </div>

            <div className="mb-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
        </form>
   </div>
  );
};

export default Signup;
