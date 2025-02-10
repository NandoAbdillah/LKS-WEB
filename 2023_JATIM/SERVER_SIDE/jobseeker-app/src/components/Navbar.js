import { useAuth } from "../context/AuthContext";
import { Link } from "../router/CustomRouter";

export default function Navbar() {
  const { currentPath, logout, user, namePage } = useAuth();


  return (
    <div>
      <nav
        className="position-fixed navbar navbar-expand-lg navbar-dark bg-primary shadow w-100 pt-4 px-3 pb-3"
        style={{
          zIndex : 9999
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#!">
            Jobseeker Platform
          </a>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Navbar Toggle"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#!" className="nav-link fw-bolder">
                    {user.name ?? 'Guest'}
                </a>
              </li>

              <li className="nav-item">
                <a href="#!" onClick={()=>logout()} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>

            <div className="d-flex">
              {/* <Link to='/profile'>
                <img src="/img/vaccines.png" alt="img" style={{ 
                  width : '30px',
                  height : '30px'
                 }} />
            </Link> */}
            </div>
          </div>
        </div>
      </nav>

      <div className="position-relative container-fluid bg-light d-flex justify-content-start  align-items-center" style={{ 
        minHeight : '150px',
        top : '5rem', 
        zIndex : -1
       }}>
          <p className="ms-3 fs-3"> {namePage ?? "Unknow Page"} </p>
       </div>
    </div>
  );
}
