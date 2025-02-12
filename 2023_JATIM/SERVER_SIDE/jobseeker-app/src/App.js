import logo from "./logo.svg";
import "./App.css";
import { Router } from "./router/CustomRouter";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SIgnUp";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Default/Home";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import RequestDataValidation from "./pages/Default/RequestDataValidation";
import JobVacancies from "./pages/Default/JobVacancies";
import DetailJobVacancy from "./pages/Default/DetailJobVacancy";

function App() {
  const { user, notification } = useAuth();
  return (
    <div className="p-0 m-0 ">
      {/* Guest Layout */}
      <div>
        <Router path="/signin" component={SignIn} />
        <Router path="/signup" component={SignUp} />
      </div>

      {/* Authenticated Layout */}

      {user && (
        <div className="w-100 min-vh-100 ">
          <Navbar />
          <div
          className="mx-3"
            style={{
              position: "relative",
              top: "120px",
              marginBottom : '20rem',
              overflowX  : 'hidden'
            }}
          >
            <Router path="/" component={Home} />
            <Router
              path="/add-request-validation"
              component={RequestDataValidation}
            />
            <Router path='/job-vacancies' component={JobVacancies} />
            <Router path='/detail-job/:id' component={DetailJobVacancy} />

          </div>
        </div>
      )}

      {notification && (
        <Toast message={notification.message} status={notification.type} />
      )}
    </div>
  );
}

export default App;
