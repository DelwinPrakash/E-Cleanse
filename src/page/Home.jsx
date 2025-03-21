import { React} from "react";
import Hero from "../components/Hero";
import { useAuth } from "../context/AuthProvider";
import Business from "../components/Business";

export default function Home(){
    const { user } = useAuth();
    return(
        <div className="w-full sm:ml-16 p-2 pb-16 sm:p-2 h-screen bg-zinc-950">
            {user.role === "user" ? <Hero/> : <Business/>}
        </div>
    );
}