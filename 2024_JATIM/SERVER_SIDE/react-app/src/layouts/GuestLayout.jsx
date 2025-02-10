import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 ">
       {/* Berfungsi sebagai wadah childern */}
      <Outlet />
    </div>
  );
}
