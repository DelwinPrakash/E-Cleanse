import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Nav from "./components/Nav";
import Home from "./page/Home";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import AI from "./page/AI";
import Profile from "./page/Profile";
import NotFound from "./page/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import WasteRegistration from "./page/RegisterWaste"; 
import Verification from "./page/Verification.jsx"; 
import VerifyEmail from "./page/VerifyEmail";
import CheckEmail from "./page/CheckEmail";
import BusinessProfileCompletion from "./page/BusinessProfileCompletion.jsx";


export default function App() {
    return (
        <div className="flex flex-col sm:flex-row">
            <Nav />
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    
                    <Route path="/register-waste" element={<WasteRegistration />} />
                    <Route path="/register-waste/qrcode" element={<Verification />} />
                    <Route path="/verify-email" element={<VerifyEmail/>} />
                    <Route path="/complete-business-profile" element={<BusinessProfileCompletion/>} />
                    <Route path="/check-email" element={<CheckEmail/>} />
                    
                    
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/ai" element={<ProtectedRoute><AI /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    
                    <Route path="/*" element={<NotFound />} />
                    
                    {/* <Route path="/" element={<Home />} /> */}
                    {/* <Route path="/signup/business" element={<SignUp />} /> */}
                    {/* <Route path="/user" element={<User />} /> */}
                    {/* <Route path="/business" element={<Business />} /> */}
                    {/* <Route path="/ai" element={<AI />} /> */}
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    {/* <Route path="/profile/" element={<Profile />} /> */}
                    {/* <Route path="/business-profile" element={<BusinessProfile />} /> */}
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    {/* <Route path="/verify-business-email" element={<VerifyBusinessEmail/>} /> */}
                    {/* <Route path="/complete-business-profile" element={<ProtectedRoute><BusinessProfileCompletion/></ProtectedRoute>} /> */}
                </Routes>
            </AuthProvider>
        </div>
    );
}