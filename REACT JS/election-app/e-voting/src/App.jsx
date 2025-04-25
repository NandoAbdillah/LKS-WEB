import "./App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./context/AuthContext";
import Modal from "./components/Modals";
import Loader from "./components/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AppRoutes() {
  let routes = useRoutes(router);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Modal />
        <Loader />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
