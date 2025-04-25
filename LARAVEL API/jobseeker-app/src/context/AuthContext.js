import { createContext, useContext, useEffect, useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    // const navigate = useNavigate();

    // Untuk Notifikasi 
    const [notification, setNotification] = useState(null);

    // Untuk Nama Tab
    const [namePage, setNamePage] = useState('Dashboard');

    useEffect(()=> {
        const storedUser = localStorage.getItem('USER');
        const storedToken = localStorage.getItem('TOKEN');

        setUser(JSON.parse(storedUser)|| null);
        setToken(storedToken || null);
    }, [])

    // useEffect(()=> {
    //     if(user && token) {
    //         navigate('/');
    //     } else {
    //         navigate('/signup');
    //     }
    // }, [user, token])

    const login = (userData, userToken) => {
        
        localStorage.setItem('USER', JSON.stringify(userData));
        localStorage.setItem('TOKEN', userToken);

        setUser(userData);
        setToken(userToken);
    }

    const logout = () => {
        localStorage.removeItem('USER');
        localStorage.removeItem('TOKEN');

        setUser(null);
        setToken(null);
    }

    const showNotification = (type, message) => {
        setNotification({type, message});
        setTimeout(()=> {
            setNotification(null);
        }, 3000);
    }
    



    return (
        <AuthContext.Provider value={{ user, token,  login, logout , notification, showNotification, namePage, setNamePage}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);