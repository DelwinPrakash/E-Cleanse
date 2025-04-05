import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [businessDetail, setBusinessDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [businessLoading, setBusinessLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log("Token from localStorage: ", token);
        if(token){
            axios.get("http://localhost:3000/api/verify", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(({data}) => {
                setUser(data.user);
                if(data.user.role === "business"){
                    fetchBusinessDetails(data.user._id);
                    // fetchAllUsers();
                }
            }).catch((error) => {
                console.error("Token verification failed!", error);
                localStorage.removeItem("authToken");
                setUser(null);
                setBusinessDetail(null)
            }).finally(() => {
                setLoading(false);
            })
        }else{
            setLoading(false);
        }
    }, []);
    
    const login = async (loginDetails) => {
        if(loginDetails.email && loginDetails.password){
            try{
                const { data, status } = await axios.post("http://localhost:3000/api/login", loginDetails);
                if(status === 200){
                    console.log(data);
                    localStorage.setItem("authToken", data.token);
                    setUser(data.user);
                    if(data.user.role === "business"){
                        await fetchBusinessDetails(data.user._id);
                    }
                    alert("login success!");
                    if(data.redirectTo == "/complete-business-profile"){
                        navigate('/complete-business-profile');
                    }else{
                        navigate("/");                
                    }
                }
            }catch(error){
                console.error("Login failed!", error);
                throw new Error(error.response?.data?.message || "Login failed. Please try again.");
            }
        }
    }

    const register = async (signUpDetails) => {
        if(signUpDetails.email && signUpDetails.password){
            console.log("register\n", signUpDetails);
            try{
                const { data, status } = await axios.post("http://localhost:3000/api/signup", signUpDetails);
                if(status === 201){
                    alert("Registration success!, check your email");
                    navigate("/check-email");
                }
            }catch(error){
                console.log("Registration failed!", error);
                throw new Error(error.response?.data?.message || "Registration failed. Please try again.");
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setBusinessDetail(null);
        alert("Logged out successfully!");
        navigate("/login");
    }

    const fetchBusinessDetails = async(userID) => {
        try{
            const { data } = await axios.get(`http://localhost:3000/api/business-details/${userID}`);
            setBusinessDetail(data.businessDetails);
        }catch(error){
            console.log(error);
        }finally{
            setBusinessLoading(false)
        }
    }

    // const fetchAllUsers = async () => {
    //     try{
    //         const { data } = await axios.get(`http://localhost:3000/api/user-details`);
    //         setUserDetails(data.userDetails);
    //     }catch(error){
    //         console.log(error);
    //     }finally{
    //         setUserLoading(false)
    //     }

    // } 

    return (
        // <AuthContext.Provider value={{user, setUser, login, register, logout, loading, businessDetail, businessLoading, userDetails, userLoading}}>
        <AuthContext.Provider value={{user, setUser, login, register, logout, loading, businessDetail, businessLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);