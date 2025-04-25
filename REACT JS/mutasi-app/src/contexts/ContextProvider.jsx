import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN"),
      storedUser = localStorage.getItem("USER_TYPE");

    setUser(storedUser);
    setToken(storedToken);
  }, []);

  const updateUser = (userData) => {
    localStorage.setItem("USER_TYPE",userData);
    setUser(userData);
  };

  const updateToken = (userToken) => {
    localStorage.setItem("ACCESS_TOKEN", userToken);
    setToken(userToken);
  }


  return (
    <StateContext.Provider
      value={{
        user,
        updateUser,
        updateToken,
        token,
        notification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
