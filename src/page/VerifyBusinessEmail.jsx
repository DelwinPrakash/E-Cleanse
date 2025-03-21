import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyBusinessEmail() {
    const [message, setMessage] = useState("Verifying your email...");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            console.log("verifyEmail page", token)
            axios.get(`http://localhost:3000/api/verify-business-email?token=${token}`).then((response) => {
                setMessage(response.data.message);
            }).catch((error) => {
                setMessage(error.response?.data?.message || "Something went wrong!"); 
            });
        }else{
            setMessage("Invalid verification link!");
        }
        setTimeout(() => {
            navigate("/login");
        }, 5000);
    }, [token, navigate]);

    return (
        <div className="w-full h-screen bg-zinc-950 z-20">
            <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-3 text-xl text-white">{message}</p>
            </div>
        </div>
    )
}