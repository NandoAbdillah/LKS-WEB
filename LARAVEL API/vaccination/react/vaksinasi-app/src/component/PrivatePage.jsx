import { useEffect } from "react"
import AppNavbar from "./AppNavbar"

const PrivatePage = ({children}) => {
    useEffect(() => {
        let userData = localStorage.getItem("user")
        if (!userData){
            window.location.href = "#login"
        }
    },[])

    return (
        <>
            <AppNavbar/>    
            {children}
        </>
    )
}

export default PrivatePage;