import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

export default function BusinessProfileCompletion() {
    const [error, setError] = useState(null);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const navigate = useNavigate();
    const { user, setUser, loading } = useAuth();

    useEffect(() => {
        if(!loading && !user){
            navigate("/login");
        }
        
        if(!loading){
            if(user && user.role === "user"){
                navigate("/");
            }else if(user && user.role === "business" && user.profileCompletion){
                navigate("/");
            }
        }

    }, [user, loading, navigate]);

    const [businessDetail, setBusinessDetails] = useState({
        businessName: "",
        businessType: "",
        businessRegNumber: "",
        gstOrTaxNumber: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        socialAccount: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBusinessDetails({
            ...businessDetail,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoadingIcon(true);
        try {
            const { data, status } = await axios.post("http://localhost:3000/api/complete-business-profile", {businessDetail, userID: user._id});
            if(status === 201){
                setUser(prevUser => ({
                    ...prevUser,
                    profileCompletion: true
                }));
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.error || error.response?.data?.message || error.message || "An error occurred during registration.");
        } finally {
            setLoadingIcon(false);
        }
    };

    return (
        <div className="w-full p-2 bg-zinc-950 z-20">
            <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Business Profile</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(businessDetail).map((key) => (
                        <div className="mb-3" key={key}>
                            <label className="block text-gray-300 text-sm mb-2" htmlFor={key}>
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            <input
                                type="text"
                                id={key}
                                name={key}
                                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                                placeholder={`Enter ${key}`}
                                value={businessDetail[key]}
                                onChange={handleChange}
                                required={key !== "socialAccount"}
                            />
                        </div>
                    ))}
                    {error && <div className="mb-4 text-red-600">{error}</div>}
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-sm font-medium text-white ${loadingIcon ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} rounded-lg focus:ring-2 focus:ring-blue-500`}
                        disabled={loadingIcon}
                    >
                        {loadingIcon ? "Updating..." : "Update Profile"}
                    </button>
                </form>
                <div className="flex justify-end mt-3">
                    <a href="#" className="text-blue-400 text-sm hover:underline" onClick={() => navigate("/login")}>
                        <span className="text-gray-400">Already have an account?</span> Login
                    </a>
                </div>
            </div>
        </div>
    );
}