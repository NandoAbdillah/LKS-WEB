import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import '../App.css';

export default function DefaultLayout()
{
    const {user, token, setUser, setToken, notification}  = useStateContext();

    if(!token) {
        return <Navigate to='/signin' />;
    } 
    return (
        
        <Outlet />
    )

    
}