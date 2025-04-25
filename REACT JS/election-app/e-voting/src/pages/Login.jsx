import { createRef, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setProgressShow, userData, login } = useAuth();

  const [isAdministrator, setIsAdministrator] = useState(false);
  const [errors, setErrors] = useState(null);

  const [loading, setLoading] = useState(false);

  const nikRef = useRef();
  const passwordRef = useRef();

  const idRef = useRef();
  const tokenRef = useRef();

  const submitLogin = (e) => {
    e.preventDefault();
    setProgressShow(true);
    setLoading(true);
    setTimeout(() => {
      if (!isAdministrator) {
        const payload = {
          nik: nikRef.current.value,
          password: passwordRef.current.value,
        };

        const theData = userData[0];
        if (theData.nik != payload.nik) {
          setErrors("NIK anda tidak ditemukan");
        } else if (
          theData.password != payload.password &&
          theData.nik == payload.nik
        ) {
          setErrors("Password tidak valid");
        } else {
            // setErrors("Valid semua");
          login(theData);
        }
      }
      else {
        const payload = {
           id : idRef.current.value,
           accessToken : tokenRef.current.value,
           password : passwordRef.current.value
        }

        const theData = userData[1];
        if(theData.id != payload.id) {
            setErrors("ID anda tidak ditemukan")
        } else if(theData.id == payload.id && theData.accessToken != payload.accessToken) {
            setErrors("Akses Token tidak valid")
        } else if(theData.id == payload.id && theData.password != payload.password) {
            setErrors("Password salah")
        } else {
            setErrors("Valid Semua");
        }
      }

      setLoading(false);
    }, 3000);
  };
  return (
    <div className="card shadow-lg p-5 " style={{ width: "25rem" }}>
      {isAdministrator ? (
        <form onSubmit={submitLogin}>
          <div className="mb-3 text-center">
            <h2 className="m-0 p-0 text-center">Masuk </h2>
            <div className=" form-text">Masuk sebagai Administrator</div>

            {errors && (
              <div className="alert alert-danger " role="alert">
                {errors}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3">
              <label htmlFor="nik" className="form-label">
                ID Administrator
              </label>
              <input
                placeholder="Masukkan ID"
                type="number"
                className="form-control"
                id="nik"
                ref={idRef}
                // maxLength="16"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="accessCode" className="form-label">
                Kode Akses
              </label>
              <input
                placeholder="Masukkan Kode"
                type="number"
                className="form-control"
                ref={tokenRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                placeholder="Masukkan Password"
                type="password"
                className="form-control "
                id="password"
                ref={passwordRef}
              />
            </div>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className={`btn btn-primary w-100 ${loading ? "disabled" : ""}`}
            >
              Login
            </button>
          </div>

          <div className="mb-3 text-start">
            <a
              href="#admin"
              className=" text-decoration-none text-danger form-text "
              onClick={() => setIsAdministrator(false)}
            >
              ← Masuk sebagai Pemilih
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={submitLogin}>
          <div className="mb-3 text-center">
            <h2 className="m-0 p-0 text-center">Masuk </h2>
            <div className=" form-text">
              Masuk untuk dapat melakukan pemilihan
            </div>
            {errors && (
              <div className="alert alert-danger p-1 mt-2" role="alert">
                {errors}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3">
              <label htmlFor="nik" className="form-label">
                Nomor Induk Kependudukan
              </label>
              <input
                placeholder="Masukkan NIK"
                type="number"
                className="form-control"
                id="nik"
                maxLength="16"
                ref={nikRef}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                placeholder="Masukkan Password"
                type="password"
                className="form-control "
                id="password"
                ref={passwordRef}
              />
            </div>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className={`btn btn-primary w-100 ${loading ? "disabled" : ""}`}
            >
              Login
            </button>
          </div>

          <div className="mb-3 text-end">
            <a
              href="#admin"
              className=" text-decoration-none text-danger form-text "
              onClick={() => setIsAdministrator(true)}
            >
              Masuk sebagai Administrator →
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
