import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function ProtectedRoute({children}){
    const {user, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loading && !user){
            navigate("/login");
        }
    }, [user, navigate, loading])
    
    if (loading) {
        return (
            <Loading/>
        );
    }
    
    return user ? children : null;
}