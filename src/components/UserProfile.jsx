import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaTrash} from "react-icons/fa"

export default function UserProfile(){
    const [showLogout, setShowLogout] = useState(false)
    const { user, logout } = useAuth();
    const [showDetails, setShowDetails] = useState(null); // State to track which request's details are visible
    const navigate = useNavigate(); // Hook for navigation
    const [userProfile, setUserProfile] = useState([]);
    // const [userPendingItems, setUserPendingItems] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaStates, setCaptchaStates] = useState({});


        // Function to generate random captcha string
        const generateCaptcha = () => {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
            let captcha = '';
            for (let i = 0; i < 6; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return captcha;
        };
    
        const handleShowCaptcha = (requestId) => {
            const newCaptcha = generateCaptcha();
            setCaptchaStates(prev => ({
                ...prev,
                [requestId]: {
                    show: true,
                    value: newCaptcha
                }
            }));
        };
    
    
    useEffect(() => {
        const fetchUserProfile = async () => {
          try{
            const { data } = await axios.get(`http://localhost:3000/api/user-profile/${user._id}`);
            if(data.success){
                setUserProfile(data.recycleDetails);
            }
            // if(userProfile.length === 0){
            //     const { data } = await axios.get(`http://localhost:3000/api/user-profile/pending/${user._id}`);
            //     if(data.success){
            //         setUserPendingItems(data.pendingItems);
            //     }
            // }
          }catch(error){
            console.log(error);
          }finally{
            setUserLoading(false)
          }
        }
        fetchUserProfile();
    }, []);
    console.log(userProfile)
    const recyclingHistory = [
        { id: 1, date: '2023-10-01', items: ['Laptop', 'Smartphone']},
        { id: 2, date: '2023-09-25', items: ['Tablet', 'Printer']},
        { id: 3, date: '2023-09-18', items: ['Monitor', 'Keyboard']},
    ];

    const pendingRequests = [
        {
          id: 1,
          items: ["Wires", "Batteries"],
          status: "Pending",
          qrData: "PendingRequest1", // Unique QR data for each request
        },
        {
          id: 2,
          items: ["Old Phone"],
          status: "Accepted",
          qrData: "AcceptedRequest2", // Unique QR data for each request
        },
    ];

    let userDetails = {};
    if(user){
        userDetails = {
            name: user.username,
            email: user.email,
            profilePicture: 'https://picsum.photos/200/300?random=4',
            totalRecycled: recyclingHistory.length,
            pendingRequest: pendingRequests.length,
        };
    }
    


    // Toggle details visibility for a specific request
    const toggleDetails = (requestId) => {
        setShowDetails((prev) => (prev === requestId ? null : requestId)); // Toggle details visibility
    };

    return (
        <div className="h-full">
            <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
                <div className="relative p-6 rounded-lg bg-stone-900">
                    <div className="flex items-center space-x-4">
                        <img
                            src={userDetails.profilePicture}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-2 border-white flex-shrink-0"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-white">{userDetails.name}</h1>
                            <p className="text-gray-400 break-all">{userDetails.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowLogout(!showLogout)}
                        className="absolute top-1 right-1 p-2 text-gray-400 hover:text-white focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                        </svg>
                    </button>

                    {showLogout && (
                    <div className="absolute top-12 right-3 bg-stone-800 p-2 rounded-lg">
                        <button
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                            onClick={() => {
                                logout();
                            }}
                        >
                        Logout
                        </button>
                    </div>
                    )}
                </div>

                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-stone-900">
                        <p className="text-sm text-gray-400">Total Recycled</p>
                        <p className="text-2xl font-bold text-white">{userDetails.totalRecycled} items</p>
                    </div>
                    <div className="p-4 rounded-lg bg-stone-900">
                        <p className="text-sm text-gray-400">Pending Request</p>
                        <p className="text-2xl font-bold text-white">{userDetails.pendingRequest} items</p>
                    </div>
                    </div>
                </div>

                {/* Pending Requests Section */}
                <div className="mt-3">
                    <h2 className="text-xl font-bold mb-4 text-gray-300">Pending Requests</h2>
                    <div className="space-y-3">
                        {(userProfile.length === 0) && <div className="bg-stone-900 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">No pending request!</p>
                        </div>}
                        {userProfile.map((request) => (
                            <div key={request._id} className="bg-stone-900 p-4 rounded-lg relative">
                                {request.userStatus === "pending" &&(<button onClick={() => deleteRequest(request._id)} className="absolute right-4 top-7 text-gray-400 hover:text-red-400">
                                    <FaTrash className="h-5 w-5" />
                                </button>)}
                                <p className="text-sm text-gray-400">Request Status: <span className={`text-sm ${request.userStatus === "accepted" ? "text-green-400" : "text-red-400"}`}>{request.userStatus || request.status}</span></p>
                                <p className="text-lg font-semibold text-white">
                                    <span className="font-semibold text-gray-300">Items: </span>{request.eWasteType.join(", ")}
                                </p>

                                {/* captcha Icon on the right side */}
                                {request.userStatus === "accepted" && (
                                    <div className="absolute top-4 right-4">
                                        {captchaStates[request._id]?.show ? (
                                            <div className="p-2 text-white bg-stone-900 rounded">
                                                {captchaStates[request._id].value}
                                            </div>
                                        ) : (
                                            <button
                                                className="p-2  text-gray-400 hover:text-white focus:outline-none"
                                                onClick={() => handleShowCaptcha(request._id)}
                                            >   
                                                <label htmlFor="" className="text-sm sm:text-lg">View Captcha</label>
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* View Details Button (only for accepted requests) */}
                                {request.userStatus === "accepted" && (
                                    <div className="mt-2">
                                        <button
                                            className="text-blue-400 hover:text-blue-500"
                                            onClick={() => toggleDetails(request._id)} // Toggle details visibility
                                        >
                                            View Details
                                        </button>
                                    </div>
                                )}

                                {/* Hardcoded Details (only for accepted requests) */}
                                {showDetails === request._id && request.userStatus === "accepted" && (
                                    <div className="mt-2 p-2 bg-stone-800 text-gray-100 rounded-lg">
                                        <p className="text-sm"><span className="font-semibold text-gray-400">Organization Name: </span>{request.businessName}</p>
                                        <p className="text-sm"><span className="font-semibold text-gray-400">Name of collector: </span>{request.businessName}</p>
                                        <p className="text-sm"><span className="font-semibold text-gray-400">Contact Number: </span>{request.phoneNumber}</p>
                                        <p className="text-sm"><span className="font-semibold text-gray-400">Email: </span>{request.businessEmail}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-3">
                    <h2 className="text-xl font-bold mb-4 text-gray-300">Recent Recycling History</h2>
                    <div className="space-y-3">
                    {recyclingHistory.map((entry) => (
                        <div key={entry.id} className="bg-stone-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-400">{entry.date}</p>
                        <p className="text-lg font-semibold text-white">{entry.items.join(', ')}</p>
                        {/* <p className="text-sm text-green-500">+{entry.pointsEarned} points</p> */}
                        </div>
                    ))}
                    </div>
                </div>

            </div>
        </div>
    );
}