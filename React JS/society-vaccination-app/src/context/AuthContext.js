import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "../utils/CustomRouter";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [notification, setNotification]  = useState(null);
    const {navigate} = useRouter();

    useEffect(()=> {
        const storedUser = localStorage.getItem('USER_DATA');
        const storedToken = localStorage.getItem('TOKEN');
        

        setUser(JSON.parse(storedUser));
        setToken(storedToken);

    
    }, []);

    useEffect(()=> {
        if(user && token) {
            navigate('/')
        } else {
            navigate('/signin');
        }
    }, [user, token]);


    const login = (userData, token) => {
        localStorage.setItem('USER_DATA', JSON.stringify(userData));
        localStorage.setItem('TOKEN', token);

        setUser(userData);
        setToken(token);
    }

    const logout = () => {
       setUser(null);
       setToken(null);

       localStorage.removeItem('USER_DATA');
       localStorage.removeItem('TOKEN');

       showNotification("Logged out successfully", "info");
    }

    
    const showNotification = (message,type) => {
        setNotification({message, type});

        setTimeout(()=> {
            setNotification(null)
        }, 3000);
    }

    const formattedTimestamp = (timestamp) => {
        const date = new Date(timestamp);

        const formattedDate = new Intl.DateTimeFormat("en-US", {
            day : 'numeric',
            month : 'long',
            year : 'numeric'
        }).format(date);

        return formattedDate;
    }


    return (
        <AuthContext.Provider value={{ user, token, notification, login, logout , showNotification, formattedTimestamp}}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext);