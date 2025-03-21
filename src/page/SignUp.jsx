import {React, useState} from "react";
import UserSignUp from "../components/UserSignUp";
import BusinessSignUp from "../components/BusinessSignUp";
import { useNavigate } from "react-router-dom";
export default function SignIn(){
    const [isUser, setIsUser] = useState(true);
    
    const navigate = useNavigate();
	return (
        <div className="w-full p-2 pb-16 sm:p-2 h-screen bg-zinc-950 overflow-y-scroll z-20">
            <div className="flex flex-col items-center h-full">
                <div className="my-4 flex flex-col w-full items-center">
                    <p className="text-white text-xl">Sign Up for {isUser? "user" : "business"}</p>
                    <div className="flex justify-center my-4">
                        <button
                            className={`px-8 py-2 ${isUser ? "bg-blue-500 text-white" : "bg-zinc-600 text-gray-400"} rounded-l-lg`}
                            onClick={() => {
                                setIsUser(true);
                                navigate("/signup/user");
                            }}
                        >
                            User
                        </button>
                        <button
                            className={`px-4 py-2 ${!isUser ? "bg-blue-500 text-white" : "bg-zinc-600 text-gray-400"} rounded-r-lg`}
                            onClick={() => {
                                setIsUser(false);
                                navigate("/signup/business");
                            }}
                        >
                            Business
                        </button>
                    </div>
                </div>
                {isUser ? <UserSignUp /> : <BusinessSignUp />}
            </div>
		</div>
	);
};
