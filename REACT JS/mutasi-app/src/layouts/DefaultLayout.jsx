import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider"

export default function DefaultLayout()
{
    const {token} = useStateContext();
    const navigate = useNavigate();

    if(!token) navigate('/login');
    return (
        <div>
        {/* Ini DefaultLayout  */}
            <Outlet/>
        </div>
    )
}