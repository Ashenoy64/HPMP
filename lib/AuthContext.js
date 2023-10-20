import { useContext, useState, createContext } from "react";
import { signOut } from "firebase/auth"
import { auth } from "./firebase"
const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [UserMail, setUserMail] = useState(null)
    const [LoginStatus, setLoginStatus]= useState(null)


    const logout = () => {
        signOut(auth)
    }
    return (
        <AuthContext.Provider value={{ UserMail,setUserMail,logout, LoginStatus,setLoginStatus }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}

