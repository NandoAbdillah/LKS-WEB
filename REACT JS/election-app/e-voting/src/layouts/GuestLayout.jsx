import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function GuestLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user, navigate]);
  return (
    <div className="min-vh-100 w-100 d-flex justify-content-center align-items-center">
      <Outlet />
    </div>
  );
}
