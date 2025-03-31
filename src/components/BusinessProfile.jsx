import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import QrScanner from "react-qr-scanner"; // Import react-qr-scanner
import { FaQrcode, FaSignOutAlt } from "react-icons/fa"; // Import QR code and logout icons from react-icons
import { useAuth } from "../context/AuthProvider";
import Loading from "./Loading";
import axios from "axios";

export default function BusinessProfile() {
  const { user, businessDetail, logout } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order for personal details
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Track QR Scanner modal visibility
  const [scannedData, setScannedData] = useState(""); // Store scanned QR data
  const [selectedHistory, setSelectedHistory] = useState(null); // Track selected recycling history for details
  const [businessProfile, setBusinessProfile] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try{
        const { data } = await axios.get(`http://localhost:3000/api/business-profile/${user._id}`);
        if(data.success){
          setBusinessProfile(data.recycleDetails);
        }
      }catch(error){
        console.log(error);
      }finally{
        setUserLoading(false)
      }
    }
    fetchBusinessProfile();
  }, []);
  
  if (userLoading){
    return (
      <Loading/>
    );
  }
  
  const recyclingHistory = [
    {
        id: 1,
      date: "2023-10-01",
      items: ["Laptop", "Smartphone"],
      points: 200,
      details: {
          location: "Recycling Center A",
        weight: "5.2 kg",
        notes: "Devices were in good condition.",
      },
    },
    {
        id: 2,
      date: "2023-09-25",
      items: ["Tablet", "Printer"],
      points: 150,
      details: {
        location: "Recycling Center B",
        weight: "3.8 kg",
        notes: "Printer had minor damage.",
    },
    },
    {
      id: 3,
      date: "2023-09-18",
      items: ["Monitor", "Keyboard"],
      points: 100,
      details: {
        location: "Recycling Center C",
        weight: "7.1 kg",
        notes: "Monitor screen was cracked.",
      },
    },
  ];
  
  // Function to toggle modal and set selected order
  const toggleModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(!isModalOpen);
};

// Function to toggle recycling history details modal
  const toggleHistoryDetails = (history) => {
    setSelectedHistory(history);
  };

  // Function to handle QR code scan
  const handleScan = (data) => {
    if (data) {
      setScannedData(data.text); // Extract scanned data
      setIsScannerOpen(false); // Close scanner after successful scan
      alert(`Scanned Data: ${data.text}`); // Display scanned data
    }
  };
  
  // Function to handle QR scanner errors
  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
};

// Function to handle logout
const handleLogout = () => {
    navigate("/login"); // Navigate to the login page
  };
  return (
    <div className="text-white flex flex-col">
      {/* Profile Information Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-5">
        {/* Header with Icons */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-100"></h3>
          <div className="flex space-x-4">
            {/* QR Code Icon */}
            <div
              onClick={() => setIsScannerOpen(true)}
              className="p-2 bg-blue-500 h-10 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              <FaQrcode className="text-2xl" /> {/* QR Code Icon */}
            </div>

            {/* Logout Button */}
            <div
              onClick={handleLogout}
              className="p-2 bg-red-500 h-10 text-white rounded-lg hover:bg-red-600 cursor-pointer group relative"
            >
              <FaSignOutAlt className="text-2xl" onClick={() => logout()}/> {/* Logout Icon */}
              <span className="absolute top-10 right-0 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Logout
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          {[
            { label: "Organization Name", value: `${businessDetail.businessName}` },
            { label: "Email Address", value: `${user.email}` },
            { label: "Business Registration Number", value: `${businessDetail.businessRegNumber}` },
            { label: "Contact Number", value: `${businessDetail.phoneNumber}` },
          ].map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-400">{item.label}</h4>
              <p className="text-gray-200">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-center">
        {[
          { label: "Total Orders", value: "128", color: "text-white" },
          { label: "Accepted Orders", value: "86", color: "text-green-400" },
          { label: "Rejected Orders", value: "42", color: "text-red-400" },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{stat.label}</h3>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="mt-5 bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-center">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-2 text-gray-300">User</th>
                <th className="pb-2 text-gray-300">E-Waste Type</th>
                <th className="pb-2 text-gray-300">Status</th>
                <th className="pb-2 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businessProfile.map((order, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2">{order.userDetails.fullName}</td>
                  <td className="py-2">{order.userDetails.eWasteType.join(", ")}</td>
                  <td className={`py-2 ${order.status === "accepted" ? "text-green-400" : "text-red-400"}`}>{order.status}</td>
                  <td className="py-2">
                    {order.status === "accepted" && ( // Only show "View Details" for accepted orders
                      <button
                        onClick={() => toggleModal(order)}
                        className="text-blue-400 hover:text-blue-500 font-semibold"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recycling History Section */}
      <div className="mt-5 bg-gray-800 py-6 px-2 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-center">Recycling History</h3>
        <div className="space-y-3 mt-4">
          {recyclingHistory.map((entry) => (
            <div key={entry.id} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">{entry.date}</p>
              <p className="text-lg font-semibold text-white">
                Items: {entry.items.join(", ")}
              </p>
              <button
                onClick={() => toggleHistoryDetails(entry)}
                className="text-blue-400 hover:text-blue-500 font-semibold"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Personal Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Personal Details</h3>
            <div className="space-y-2 text-gray-100">
              <p>
                <span className="font-semibold text-gray-400">User:</span> {selectedOrder.userDetails.fullName}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Email:</span> {selectedOrder.userInfo.email}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Phone:</span> {selectedOrder.userDetails.phoneNumber}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Full Address:</span> {selectedOrder.userDetails.pickupAddress}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Recycling History Details */}
      {selectedHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Recycling Details</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">Date:</span> {selectedHistory.date}
              </p>
              <p>
                <span className="font-semibold">Items:</span> {selectedHistory.items.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Points:</span> {selectedHistory.points}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {selectedHistory.details.location}
              </p>
              <p>
                <span className="font-semibold">Weight:</span> {selectedHistory.details.weight}
              </p>
              <p>
                <span className="font-semibold">Notes:</span> {selectedHistory.details.notes}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedHistory(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Scanner Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Scan QR Code</h3>
            {/* <QrScanner
              delay={300} // Delay between scans
              onError={handleError} // Handle errors
              onScan={handleScan} // Handle successful scans
              style={{ width: "100%" }} // Styling for the scanner
            /> */}
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsScannerOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ); 
}