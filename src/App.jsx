import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Nav from "./components/Nav";
import Home from "./page/Home";
import Auth from "./page/Auth";
import User from "./page/User";
import Business from "./page/Business";
import AI from "./page/AI";
import Profile from "./page/Profile";
import NotFound from "./page/NotFound";

export default function App() {
    return (
        <div className="flex flex-col sm:flex-row">
            <Nav />
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/ai" element={<AI />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </div>
    );
}