import { useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (loginDetails) => {
        if(loginDetails.email && loginDetails.password){
            // console.log(loginDetails)
            try{
                const { data, status } = await axios.post("http://localhost:3000/api/login", loginDetails);
                if(status === 200){
                    alert("login success!");
                    navigate("/");                
                }
            }catch(error){
                console.error("Login failed!", error);
                if(error.response.status == 401){
                    alert(error.response.data.message)
                }
            }
        }
    }

    const register = async (signUpDetails) => {
        if(signUpDetails.username && signUpDetails.email && signUpDetails.password){
            console.log("register\n", signUpDetails);
            try{
                const { data } = await axios.post("http://localhost:3000/api/signup", signUpDetails);
            }catch(error){
                console.log("Registering failed!", error);
                if(error.response.status === 409){
                    alert(error.response.data.message)
                } 
            }
        }
    }

    return (
        <AuthContext.Provider value={{user, isRegistered, login, register}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);