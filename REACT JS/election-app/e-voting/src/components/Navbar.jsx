import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user , logout} = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg p-0">
      <div className="container-fluid px-lg-5">
        <a className="navbar-brand" href="#">
          <img src="/img/logo.png" style={{ width: "10rem" }} alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Beranda
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/information"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Informasi
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/voting"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Pemilihan
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/result"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Hasil
              </NavLink>
            </li>
          </ul>

          <div className="">
            {user !== null ? (
              <div className=" position-relative ">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
                  className=""
                  onClick={() => setShowDropdown(true)}
                />

                <div
                  className={`card shadow-sm ${
                    showDropdown ? " d-block position-absolute" : "d-none"
                  }`}
                  style={{
                    top: "50px",
                    left: "-70px",
                  }}
                >
                  <div className=" list-group list-group-flush">
                    <div className="list-group-item "><NavLink className="text-decoration-none" onClick={()=>logout()}>Logout</NavLink></div>
                    <div className=" list-group-item"><NavLink  className="text-decoration-none">Pengaturan</NavLink></div>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink to='login' className="btn btn-outline-primary" type="submit">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
