import { React} from "react";
import Hero from "../components/Hero";
// import AuthContext from "../context/AuthContext";

export default function Home(){
    // AuthContext();
    return(
        // <div className="w-full sm:ml-16 p-4">
        <div className="w-full sm:ml-16 p-2 pb-12 sm:p-2 h-screen bg-zinc-950">
            {/* <h1 className="bg-zinc-900 text-yellow-400 text-2xl p-4">Home</h1> */}
            <Hero/>
        </div>
    );
}