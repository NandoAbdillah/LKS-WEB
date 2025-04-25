import { createContext, useContext, useState } from "react";


const StateContext = createContext();


export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    const setUserData = (userData) => {
        localStorage.setItem('USER_DATA', JSON.stringify(userData));
        setUser(userData);
    }

    const setUserToken = (userToken) => {
        localStorage.setItem('ACCESS_TOKEN', userToken);
        setToken(token)
    }

    const login = (userData , userToken) => {
        if(userData) {
            setUserData(userData)
        }
        if(userToken) {
            setUserToken(userToken);
        }
    }

    const logout = () => {
        // localStorage.setItem('USER_DATA', JSON.stringify(userData));
        // setUser(userData);


    }

    return (
        <StateContext.Provider
            value={{
                login,
                logout,
                user,
                token
            }}
        >{children}</StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);