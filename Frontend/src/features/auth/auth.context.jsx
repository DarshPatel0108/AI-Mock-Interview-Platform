import { createContext,useState, useContext } from "react";
import { logout as logoutAPI } from "./services/auth.api";
import { useNavigate } from "react-router";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutAPI()
        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading,logout: handleLogout}} >
            {children}
        </AuthContext.Provider>
    )

    
}

export const useAuth = () => useContext(AuthContext)