import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../utils/ContextProvider";
import NavBar from "../../components/NavBar";

export default function AdminIndex() {

  const {role, logout} = useStateContext();
  const navigate = useNavigate();

  if(role === 'admin') navigate('/');
  return (
    <div >
      <NavBar/>

      <main>
        <div className="hero py-5 bg-light">
          <div className="container text-center">
            <h1 className="mb-0 mt-0">Dashboard</h1>
          </div>
        </div>

        <div className="list-form py-5">
          <div className="container">
            <h5 className="alert alert-info">
              Welcome, Administrator. Don't forget to sign out when you are
              finished using this page
            </h5>
          </div>
        </div>
      </main>
    </div>
  );
}
