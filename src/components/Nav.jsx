import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiRobot3Line } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

export default function Nav() {

    const loc = useLocation();

    return (
        <nav>
            <div className="fixed bg-zinc-800 text-white flex sm:flex-col justify-around items-center w-full sm:w-16 h-14 sm:h-full bottom-0 sm:bottom-auto sm:left-0 z-10">
                <Link to={"/"} className={`flex flex-col items-center ${loc.pathname === "/" ? "text-white" : "text-gray-500"}`}>
                    <GoHome size={25} />
                    <span className="text-sm sm:text-xs">Home</span>
                </Link>
                <Link to={"/ai"} className={`flex flex-col items-center ${loc.pathname === "/ai" ? "text-white" : "text-gray-500"}`}>
                    <RiRobot3Line size={25} />
                    <span className="text-sm sm:text-xs">Cleanse</span>
                </Link>
                <Link to={"/profile"} className={`flex flex-col items-center ${loc.pathname === "/profile" ? "text-white" : "text-gray-500"}`}>
                    <FaRegUserCircle size={25} />
                    <span className="text-sm sm:text-xs sm:mt-1">Profile</span>
                </Link>
            </div>
        </nav>
    );
}