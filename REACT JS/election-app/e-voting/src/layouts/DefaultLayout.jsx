import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

//   useEffect(() => {
//     if (user === null) navigate("/login");
//   }, [user, navigate]);


  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
}
