import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useStateContext } from "../utils/ContextProvider";

export default function DefaultLayout() {
  const { token } = useStateContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate])
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
