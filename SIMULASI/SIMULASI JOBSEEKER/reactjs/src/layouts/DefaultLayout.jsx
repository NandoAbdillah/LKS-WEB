import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuthContext } from "../utils/ContextProvider";
import { useEffect } from "react";

export default function DefaultLayout() {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate])
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer /></>
    )

}