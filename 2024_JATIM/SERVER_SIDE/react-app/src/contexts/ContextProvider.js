import { useContext } from "react";

const { useState } = require("react");
const { createContext } = require("react");

const StateContext = createContext({
    currentUser : null,
    token : null,
    setUser : ()=> {},
    setToken  : ()=> {},
    setNotification : ()=> {}
});


export const ContextProvider = ({children}) => {


    //  Baca json yang diambil dari localstorage karena yang di localstorage bentukny jsonString
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER_DATA')) || {});

    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const [notification, _setNotification] = useState("");


    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }
         else {
            localStorage.removeItem('ACCESS_TOKEN');
         }
    }

    const updateUser = (userData) => {
        // Langsung pas data ke state user karena sudah berupa json saat ambil di axios
        setUser(userData)

        if(userData) {
            // Menyimpannya ke localStrorage dan mentransaltekan dari Json ke json String agar bisa disimpan
            localStorage.setItem('USER_DATA', JSON.stringify(userData));
        } else {
            localStorage.removeItem('USER_DATA')
        }
    }

    const setNotification = (notification) => {
        _setNotification(notification);
        setTimeout(()=> {
            _setNotification('');
        }, 5000)
    }


    return (
        <StateContext.Provider value={{
            user,
            setUser : updateUser,
            token,
            setToken,
            notification,
            setNotification
          }} >
                {children}
        </StateContext.Provider>
    )

    
}

export const useStateContext = () => useContext(StateContext);





