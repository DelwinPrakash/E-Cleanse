import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Auth from "./page/Auth";
import User from "./page/User";
import Business from "./page/Business";
import AI from "./page/AI";
import Profile from "./page/Profile";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user" element={<User />} />
            <Route path="/business" element={<Business />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}