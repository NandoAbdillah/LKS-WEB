import logo from "./logo.svg";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
  const { user, notification } = useAuth();
  return (
    <div className="p-0 m-0 ">
        <Outlet/>

      {/* {notification && (
        <Toast message={notification.message} status={notification.type} />
      )} */}
    </div>
  );
}

export default App;
