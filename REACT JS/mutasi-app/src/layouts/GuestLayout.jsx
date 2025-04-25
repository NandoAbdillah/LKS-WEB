import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {

  const {token} = useStateContext();
  const navigate = useNavigate();

  if(token) navigate('/');
  return (
    <div className=" min-vh-100 w-100 d-flex justify-content-center align-items-center">
      <Outlet />
    </div>
  );
}
