import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound(){
    const navigate = useNavigate();

    useEffect(() => {
        const redirectionTimeOut = setTimeout(() => {
            navigate("/");
        }, 3000)
        return () => clearTimeout(redirectionTimeOut);
    }, [navigate]);

    return(
        <main className="w-full sm:ml-16 p-4">
            <div>
                <h1 className="bg-zinc-900 text-yellow-400 text-2xl p-4">404 Not Found</h1>
            </div>
            <h2 className="mt-48 text-yellow-400 text-lg text-center">Page Not Found<br/>Redirecting to Home page...</h2>
        </main>
    );
}