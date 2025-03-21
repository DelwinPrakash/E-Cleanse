import React from "react";
import { useNavigate } from "react-router-dom";

export default function CheckEmail(){
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center w-full h-screen bg-zinc-950 z-20">
            <div className="max-w-md w-full md:bg-zinc-900 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-100 mb-4">
                    Verify Your Email
                </h1>
                <p className="text-lg text-center text-gray-300 mb-6">
                    {/* Please check your email inbox for a verification link. */}
                    We've sent a verification link to your email address
                </p>
                <p className="text-lg text-center text-gray-300 mb-6">
                    You might need to <span className="font-bold text-gray-200">check your spam folder</span>
                </p>
                <div className="text-center">
                    {/* <button
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Resend Verification Email
                    </button> */}
                    <p className="mt-4 text-sm text-gray-500">
                            Already verified? <span className="font-medium text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Go to login</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

