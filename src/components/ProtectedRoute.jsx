import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function ProtectedRoute({children}){
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if(!loading){
            if(!user){
                navigate("/login");
                return;
            }
            if(!user.verified){
                navigate("/check-email");
                return;
            }
            if(user.role === "business"){
                if(!user.profileCompletion){
                    navigate("/complete-business-profile");
                    return;
                }
            }
        }
    }, [user, navigate, loading])
    
    if (loading) {
        return (
            <Loading/>
        );
    }
    
    return user && user.verified && (user.role !== "business" || user.profileCompletion) ? children : null;
}