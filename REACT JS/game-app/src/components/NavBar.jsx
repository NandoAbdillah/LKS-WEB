import { NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "../utils/ContextProvider";

export default function NavBar() {
  const { logout, user, role } = useStateContext();
  const navigate = useNavigate();

  const doLogout = () => {
    navigate("/signin")

    logout();
  }

  return  (
    <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
         {role === "user" ? "Gaming Portal" : " Administrator Portal"}
        </a>

        {role === "user" ? (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <NavLink to="/discover" className="nav-link px-2 text-white">
                Discover Games
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-games" className="nav-link px-2 text-white">
                Manage Games
              </NavLink>
            </li>
            <li>
              <NavLink to={`/profile/${user.username}`} className="nav-link px-2 text-white">
                User Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link active bg-dark" href="#">
                Welcome, {user.username}
              </a>
            </li>
            <li className="nav-item">
              <button
                onClick={logout}
                className="btn bg-white text-primary ms-4"
              >
                Sign Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <NavLink to="/admins" className="nav-link px-2 text-white">
                List Admins
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className="nav-link px-2 text-white">
                List Users
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link active bg-dark" href="#">
                Welcome, Administrator
              </a>
            </li>
            <li className="nav-item">
              <button
                onClick={doLogout}
                className="btn bg-white text-primary ms-4"
              >
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
