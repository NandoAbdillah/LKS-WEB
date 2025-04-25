import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axiosClient from "../../utils/axios-client";
import { useStateContext } from "../../utils/ContextProvider";

export default function Admins() {
  const {formatDate} = useStateContext();
  const [admins, setAdmins] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get("admins")
      .then((res) => {
        const data = res.data,
          content = data.content;

        setAdmins(content);
      })
      .catch((err) => {
        const error = err.data,
          message = error.message;

        setError(message);
      });
  }, []);
  return (
    <div>
      <NavBar />

      <main>
        <div className="list-form py-5">
          <div className="container">
            <h6 className="mb-3">List Admin Users</h6>
            {admins && (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Created at</th>
                    <th>Last login</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <tr key={index}>
                      <td>{admin.username}</td>
                      <td>{formatDate(admin.created_at)}</td>
                      <td>{admin.last_login_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
