import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiRobot3Line } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

export default function Nav() {
    return (
        <nav>
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-zinc-800 text-white h-14 max-h-14 flex justify-around items-center">
                <Link to={"/"} className="flex flex-col items-center">
                    <GoHome size={25} />
                    <span>Home</span>
                </Link>
                <Link to={"/ai"} className="flex flex-col items-center">
                    <RiRobot3Line size={25} />
                    <span>Cleanse</span>
                </Link>
                <Link to={"/profile"} className="flex flex-col items-center">
                    <FaRegUserCircle size={25} />
                    <span>Profile</span>
                </Link>
            </div>
            <div className="hidden sm:flex fixed bg-zinc-800 text-white h-full w-16 max-w-16 flex-col justify-around items-center">
                <Link to={"/"} className="flex flex-col items-center">
                    <GoHome size={25} />
                    <span className="text-sm">Home</span>
                </Link>
                <Link to={"/ai"} className="flex flex-col items-center">
                    <RiRobot3Line size={25} />
                    <span className="text-sm">Cleanse</span>
                </Link>
                <Link to={"/profile"} className="flex flex-col items-center">
                    <FaRegUserCircle size={25} />
                    <span className="text-sm mt-1">Profile</span>
                </Link>
            </div>
        </nav>
    );
}