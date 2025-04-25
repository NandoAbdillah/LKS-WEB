import { Outlet, useNavigate } from "react-router";
import { useStateContext } from "../utils/ContextProvider";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { token } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
        }
    }, []);
    return (
        <Outlet />
    )
}