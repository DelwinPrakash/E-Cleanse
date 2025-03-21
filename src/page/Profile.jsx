import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Profile(){
    const [showLogout, setShowLogout] = useState(false)
    const { user, logout } = useAuth();
    
    const recyclingHistory = [
        { id: 1, date: '2023-10-01', items: ['Laptop', 'Smartphone'], pointsEarned: 200 },
        { id: 2, date: '2023-09-25', items: ['Tablet', 'Printer'], pointsEarned: 150 },
        { id: 3, date: '2023-09-18', items: ['Monitor', 'Keyboard'], pointsEarned: 100 },
    ];

    let userDetails = {};
    if(user){
        userDetails = {
            name: user.name,
            email: user.email,
            profilePicture: 'https://picsum.photos/200/300?random=4',
            totalRecycled: recyclingHistory.length,
            points: recyclingHistory.reduce((sum, record) => sum+record.pointsEarned, 0),
        };
    }
    
    return (
        <div className="w-full sm:ml-16 p-2 pb-16 sm:p-2">
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
                            onClick={() => setShowLogout(!showLogout)} // Toggle logout button visibility
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
                            <p className="text-sm text-gray-400">Points Earned</p>
                            <p className="text-2xl font-bold text-white">{userDetails.points} pts</p>
                        </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h2 className="text-xl font-bold mb-4 text-gray-300">Recent Recycling History</h2>
                        <div className="space-y-3">
                        {recyclingHistory.map((entry) => (
                            <div key={entry.id} className="bg-stone-900 p-4 rounded-lg">
                            <p className="text-sm text-gray-400">{entry.date}</p>
                            <p className="text-lg font-semibold text-white">{entry.items.join(', ')}</p>
                            <p className="text-sm text-green-500">+{entry.pointsEarned} points</p>
                            </div>
                        ))}
                        </div>
                    </div>

                </div>
            </div>
            {/* Logout Button */}
            {/* <div className="fixed bottom-16 w-full left-0 bg-yellow-500 flex align-center">
                <button className="max-w-11/12 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                Logout
                </button>
            </div> */}
        </div>
    );
}

