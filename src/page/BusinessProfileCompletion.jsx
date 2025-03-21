import { React, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function BusinessProfileCompletion() {
    const { registerBusiness } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [businessDetails, setBusinessDetails] = useState({
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
            ...businessDetails,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await registerBusiness(businessDetails);
            navigate("/business");
        } catch (error) {
            setError(error.message || "An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-2 bg-zinc-950 z-20">
            <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Business Profile</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(businessDetails).map((key) => (
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
                                value={businessDetails[key]}
                                onChange={handleChange}
                                required={key !== "gstOrTaxNumber" && key !== "socialAccount"}
                            />
                        </div>
                    ))}
                    {error && <div className="mb-4 text-red-600">{error}</div>}
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-sm font-medium text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} rounded-lg focus:ring-2 focus:ring-blue-500`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
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