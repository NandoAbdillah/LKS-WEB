import { createContext, useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axiosClient from "./axios-client";

const StateContext = createContext({});

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const thumbUrl  = "http://127.0.0.1:8000/storage/thumbnails";


 

    const fetchMe = () => {

        axiosClient
        .get('me')
        .then((res)=> {
            const data = res.data,
            me = data.me,
            role = data.role;

            setUserData(me);
            setUserRole(role);
            console.log(me);
        })
        .catch((err)=> {
            const data = err.data,
            message = data.message;
            console.log(message);
        })
    }

    const setUserData = (userData) => {
        localStorage.setItem("USER_DATA", JSON.stringify(userData));
        setUser(userData);
    }

    const setAccessToken = (userToken) => {
        localStorage.setItem("ACCESS_TOKEN", userToken);
        setToken(userToken);
    }

    const setUserRole = (userRole) => {
        localStorage.setItem("USER_ROLE", userRole);
        setRole(userRole);
    }

    const logout = () => {
        localStorage.removeItem("USER_DATA");
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER_ROLE");

        setUser(null);
        setToken(null);
        setRole(null);

    }

    const formatDate = (dateString) => {
        const formatted = dateString.split('.')[0].replace('T', ' ');

        return formatted;

    }

    

    useEffect(()=> {
        const storedUser = JSON.parse(localStorage.getItem("USER_DATA"));
        const storedToken = localStorage.getItem("ACCESS_TOKEN") ;
        const storedRole = localStorage.getItem("USER_ROLE");
        
        setUser(storedUser);
        setToken(storedToken);
        setRole(storedRole);
    }, []);

    useEffect(()=>{
        if(token) {
            fetchMe();
        }
    }, [token])


    return (
        <StateContext.Provider value={{ 
            user,
            role,
            setUserRole,
            setUserData,
            setAccessToken,
            token,
            logout,
            formatDate,
            thumbUrl

         }}>{children}</StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);