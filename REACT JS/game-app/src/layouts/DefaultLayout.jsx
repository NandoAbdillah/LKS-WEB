import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../utils/ContextProvider";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { token , user} = useStateContext();
  const navigate = useNavigate();


  useEffect(()=> {
     if(!token) navigate("/signin")
    console.log(token)
  }, [token, navigate])

  return user && (
    <div className="w-100 h-100">
      <Outlet />
    </div>
  );
}
