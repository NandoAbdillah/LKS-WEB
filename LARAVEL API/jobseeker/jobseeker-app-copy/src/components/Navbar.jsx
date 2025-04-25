import { useStateContext } from "../utils/ContextProvider";

export default function Navbar() {

  const {user, logout} = useStateContext();

  return user &&  (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">
          Job Seekers Platform
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {
                  user.name
                }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
