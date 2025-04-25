import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../utils/ContextProvider";
import { useEffect } from "react";

export default function GuestLayout()
{
   const {token} = useStateContext();
   const navigate = useNavigate();

   useEffect(()=> {
     if(token) {
        navigate("/")
     }
   }, [token])

    return (
        <>
            <Outlet/>
        </>
    )
}