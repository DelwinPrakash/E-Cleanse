import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function authRedirect(){
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const loc = useLocation();

    useEffect(() => {
        if(!isLoggedIn && loc.pathname !== "/auth"){
            navigate("/auth")
        }
    },[isLoggedIn])

    return {authRedirect, isLoggedIn}
}