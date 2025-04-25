import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Default() {
  
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!user) {
            navigate('/signin')
        }
    }, [user, navigate]);

    return user && (<div className="w-100 min-vh-100">
        <Navbar/>

        <div className="mx-3" style={{ 
            position : "relative",
            top : "120px",
            marginBottom : "20rem",
            overflowX : "hidden"
         }}>
            <Outlet/>
        </div>

    </div>)
}
