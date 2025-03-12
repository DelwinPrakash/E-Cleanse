import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log("Token from localStorage: ", token);
        if(token){
            axios.get("http://localhost:3000/api/verify", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(({data}) => {
                setUser(data.user);
            }).catch((error) => {
                console.error("Token verification failed!!", error);
                localStorage.removeItem("authToken");
                setUser(null);
            }).finally(() => {
                setLoading(false);
            })
        }else{
            setLoading(false);
        }
    }, []);
    
    const login = async (loginDetails) => {
        if(loginDetails.email && loginDetails.password){
            // console.log(loginDetails)
            try{
                const { data, status } = await axios.post("http://localhost:3000/api/login", loginDetails);
                if(status === 200){
                    console.log(data);
                    localStorage.setItem("authToken", data.token);
                    setUser(data.user);
                    alert("login success!");
                    navigate("/");                
                }
            }catch(error){
                console.error("Login failed!", error);
                // if(error.response.status == 401){
                //     alert(error.response.data.message)
                // }
                throw new Error(error.response?.data?.message || "Login failed. Please try again.");
            }
        }
    }

    const register = async (signUpDetails) => {
        if(signUpDetails.username && signUpDetails.email && signUpDetails.password){
            console.log("register\n", signUpDetails);
            try{
                const { data, status } = await axios.post("http://localhost:3000/api/signup", signUpDetails);
                if(status === 201){
                    localStorage.setItem("authToken", data.token);
                    setUser(data.user);
                    alert("Registration success!");
                    navigate("/");
                }
            }catch(error){
                console.log("Registering failed!", error);
                // if(error.response.status === 409){
                //     alert(error.response.data.message)
                // } 
                throw new Error(error.response?.data?.message || "Login failed. Please try again.");
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        alert("Logged out successfully!");
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{user, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);