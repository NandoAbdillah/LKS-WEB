import { createContext, useContext, useState } from "react";
import client from "./axios-client";


const StateContext = createContext();


export const ContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useState(()=> {
        const storedUser = JSON.parse(localStorage.getItem('USER_DATA')) || null;
        const storedToken = localStorage.getItem('ACCESS_TOKEN') || null;

        setUser(storedUser);
        setToken(storedToken);
    },[])

    const login = (userData, userToken) => {
        localStorage.setItem("USER_DATA", JSON.stringify(userData));
        localStorage.setItem("ACCESS_TOKEN", userToken);

        setUser(userData);
        setToken(userToken);
    }

    const logout = () => {
        client
        .post('auth/logout')
        .then(()=> {
            localStorage.removeItem("USER_DATA");
            localStorage.removeItem("ACCESS_TOKEN");

            setUser(null)
            setToken(null);
        })
        .catch((err)=> {
            const data = err.data,
            message = data.message;
        })
    }
    

    return (
        <StateContext.Provider value={{
            user,
            token,
            login,
            logout
        }}>
            {children}
        </StateContext.Provider>
    );
}


export const useAuthContext = () => useContext(StateContext);

