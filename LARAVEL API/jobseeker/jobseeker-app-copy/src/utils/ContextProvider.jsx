import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "./axios-client";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, userToken) => {
    localStorage.setItem('USER_DATA', JSON.stringify(userData))
    localStorage.setItem("ACCESS_TOKEN", userToken);

    setUser(userData);
    setToken(userToken);
  }

  const logout = () => {
    axiosClient
      .post('auth/logout')
      .then(() => {
        localStorage.removeItem('USER_DATA');
        localStorage.removeItem('ACCESS_TOKEN');

        setUser(null);
        setToken(null);
      })
      .catch((err) => {
        const data = err.data,
          message = data.message;
        console.log(message);
      })

  }

  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    const storedUser = JSON.parse(localStorage.getItem("USER_DATA"));

    setUser(storedUser);
    setToken(storedToken);
  }, []);


  // const formatDate = (dateString) => {
  //   const formatted = dateString.split('.')[0].replace('T', ' ');
  //   return formatted;
  // }

  const formatDate = (dateString) => {
    const raw = dateString.split('.')[0];

    const date = new Date(raw);
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })

    return formatted;
  }

  return <StateContext.Provider value={{
    user,
    token,
    login,
    logout,
    formatDate
  }}>{children}</StateContext.Provider>;
};


export const useStateContext = () => useContext(StateContext)


