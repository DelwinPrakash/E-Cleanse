import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({children}){
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    // const navigate = useNavigate();
    // const loc = useLocation();

    // useEffect(() => {
    //     if(!isLoggedIn && loc.pathname !== "/auth"){
    //         navigate("/auth")
    //     }
    // },[isLoggedIn])

    // return { AuthContext }, isLoggedIn
    // console.log("hi")
    const [user, setUser] = useState(null);
    const login = async (username, password) =>{
        console.log(username, password)
        // try{
        //     const { data } = await axios.post("http://localhost:5173/api/login", {username, password});;
        // }catch(error){
        //     console.error("Login failed!", error);
        // }
    }

    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);