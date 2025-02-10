import { Link, useRouter } from "../utils/CustomRouter";

const Navbar = () => {
  const { currentPath } = useRouter();

  return (
    <nav
      className="position-fixed navbar navbar-expand-lg navbar-dark shadow w-100 pt-4 px-3  pb-3"
      style={{
        backgroundColor: "transparent",
        zIndex: "100",
      }}
    >
      <div className="container-fluid ">
        <a href="#home" className="navbar-brand ">
          Game Portal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  currentPath === "/" || currentPath === null ? "active" : ""
                } `}
                href="/"
                aria-current="page"
              >
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                href="#!"
                className={`nav-link  dropdown-toggle ${
                  currentPath === "/games" ? "active" : ""
                }`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Discover
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#!" className="dropdown-item">
                    <Link to="/games">Play Games</Link>
                  </a>
                </li>
                <li>
                  <a href="#!" className="dropdown-item">
                    Authors
                  </a>
                </li>
                <li>
                  <a href="#!" className="dropdown-item">
                    Reviews
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="" className="nav-link">
                Comunity
              </a>
            </li>
          </ul>

          <form className="d-flex" role="search">
            {/* <input
              type="search"
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
            /> */}
            {/* <button className="btn btn-outline-light" type="submit">
              Search
            </button> */}
            <Link to="/profile">
              <img
                src="/img/ava.png"
                alt="ava"
                className=" rounded-circle"
                style={{
                  maxWidth: "2.5rem",
                  maxHeight: "2.5rem",
                  boxShadow: "8px 8px 25px rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                }}
              />
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
