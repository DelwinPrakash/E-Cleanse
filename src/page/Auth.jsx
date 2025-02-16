// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import SignIn from "../components/SignIn";
// import SignUp from "../components/SignUp"; // Import SignUp component
// import { useAuth } from "../context/AuthProvider";

// export default function Auth(){
//     const { isRegistered } = useAuth();
    
//     const navigate = useNavigate();
//     const location = useLocation(); // Get the current location

//     useEffect(() => {
//         if (isRegistered) {
//             navigate("/auth"); // Redirect to dashboard if authenticated
//         }
//     }, [isRegistered, navigate]);

//     return(
//         <div className="w-full p-2 pb-16 sm:p-2 h-screen bg-zinc-950 z-20">
//             {isRegistered ? <SignIn /> : <SignUp />} {/* Switch based on path */}
//         </div>
//     );
// }