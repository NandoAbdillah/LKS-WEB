import { NavLink } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";

export default function Users() {
  const {formatDate} = useStateContext();
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get("users")
      .then((res) => {
        const data = res.data,
          content = data.content;

        setUsers(content);
      })
      .then((err) => {
        const data = err.data,
          message = data.message;

        setError(message);
      });
  }, []);
  return (
    <div>
      <NavBar />

      <main>
        <div className="hero py-5 bg-light">
          <div className="container">
            <NavLink to="/add-user" className="btn btn-primary">
              Add User
            </NavLink>
          </div>
        </div>

        <div className="list-form py-5">
          <div className="container">
            <h6 className="mb-3">List Users</h6>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Created at</th>
                  <th>Last login</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item, index) => (
                    <tr>
                      <td>
                        <NavLink to={`/profile/${item.username}`} target="_blank"  rel="noopener noreferrer">
                          {item.username}
                        </NavLink>
                      </td>
                      <td>{formatDate(item.created_at)}</td>
                      <td>{item.last_login_at ?? 'Never Login'}</td>
                      <td>
                      {
                        item.last_login_at != null ? (
                          <span className="bg-success text-white p-1  d-inline-block">Active</span>
                        ) : (
                          <span className=" bg-danger text-white p-1 d-inline-block">Inactive</span>
                        )
                      }
                       
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Lock
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                type="submit"
                                className="dropdown-item"
                                name="reason"
                                value="spamming"
                              >
                                Spamming
                              </button>
                            </li>
                            <li>
                              <button
                                type="submit"
                                className="dropdown-item"
                                name="reason"
                                value="cheating"
                              >
                                Cheating
                              </button>
                            </li>
                            <li>
                              <button
                                type="submit"
                                className="dropdown-item"
                                name="reason"
                                value="other"
                              >
                                Other
                              </button>
                            </li>
                          </ul>
                        </div>
                        <a
                          href="users-form.html"
                          className="btn btn-sm btn-secondary"
                        >
                          Update
                        </a>
                        <a href="#" className="btn btn-sm btn-danger">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
