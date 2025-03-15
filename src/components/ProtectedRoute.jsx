import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function ProtectedRoute({children}){
    const {user, loading} = useAuth();
    const navigate = useNavigate();
    console.log("user from protected route:", user);
    useEffect(() => {
        if(!loading && !user){
            navigate("/login");
        }else if(!loading && user && !user.verified){
            console.log("user verified?", user.verified);
            navigate("/check-email");
        }
    }, [user, navigate, loading])
    
    if (loading) {
        return (
            <Loading/>
        );
    }
    
    return user && user.verified ? children : null;
}