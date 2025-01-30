import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        console.log(username, password, "in authProvider")
        if(username = null){
            try{
                const { data } = await axios.post("http://localhost:3000/api/login", {username, password});;
            }catch(error){
                console.error("Login failed!", error);
            }
        }
    }

    const register = async (signUpDetails) => {
        if(signUpDetails.username){
            console.log("register\n", signUpDetails);
        }
    }

    return (
        <AuthContext.Provider value={{user, login, isRegistered, register}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);