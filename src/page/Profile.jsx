import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import UserProfile from "../components/UserProfile";
import BusinessProfile from "../components/BusinessProfile";

export default function Profile(){
    const { user } = useAuth();
    
    return (
        <div className="w-full sm:ml-16 p-2 pb-16 sm:p-2">
            {user.role === "user" ? <UserProfile/> : <BusinessProfile/>}
        </div>
    );
}