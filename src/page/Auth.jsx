import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import { authRedirect } from "../auth/authRedirect";

export default function Auth(){
    const isLoggedIn = authRedirect().isLoggedIn;
    const navigate = useNavigate();
    useEffect(() => {
        if(isLoggedIn){
            return navigate("/");
        }
    },[])
    return(
        <div className="w-full p-2 pb-16 sm:p-2 h-screen bg-zinc-950 z-20">
            <SignIn/>
        </div>
    );
}