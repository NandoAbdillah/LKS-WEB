import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, userToken) => {
    localStorage.setItem("USER_DATA", JSON.stringify(userData));
    localStorage.setItem("USER_TOKEN", userToken);

    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("USER_TOKEN");

    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("USER_DATA")) || [];
    const stroedToken = localStorage.getItem("USER_TOKEN");

    setUser(storedUser);
    setToken(stroedToken);
  }, []);

  return <StateContext.Provider value={{
    user,
    token,
    login,
    logout
  }}>{children}</StateContext.Provider>;
};

export const useStateContext = ()=> useContext(StateContext);
