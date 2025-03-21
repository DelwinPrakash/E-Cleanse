import React, { useState } from "react";

export default function Card({ order, handleOrderStatus }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal visibility
  };

  return (
    <div className="relative flex justify-center rounded-lg"> 
      {/* Card */}
      <div
        className={`bg-gray-800 w-full p-6 rounded-lg shadow-md transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1 relative`}
      >
        <h2 className="text-xl font-bold text-gray-200 mb-4">
          Order #{order.id}
        </h2>
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold">E-Waste Type:</span> {order.eWasteType}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {order.quantity}
          </p>
          <p>
            <span className="font-semibold">Condition:</span> {order.condition}
          </p>
          <p>
            <span className="font-semibold">Preferred Date:</span> {order.preferredDate}
          </p>
          <p>
            <span className="font-semibold">Preferred Time:</span> {order.preferredTime}
          </p>
          <p>
            <span className="font-semibold">Location Overview:</span> {order.address}
          </p>
        </div>

        {/* Accept/Reject buttons (only if pending) */}
        {order.status === "Pending" && (
          <div className="mt-6 border-t border-gray-700">
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => handleOrderStatus(order.id, "Accepted")}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => handleOrderStatus(order.id, "Rejected")}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Status and Personal Details */}
        {order.status !== "Pending" && (
          <div className="mt-6 border-t border-gray-700 pt-4 flex justify-between items-center">
            <p className="text-gray-400">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  order.status === "Accepted"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {order.status}
              </span>
            </p>

            {/* Button to show personal details (only if accepted) */}
            {order.status === "Accepted" && (
              <button
                onClick={toggleModal}
                className="text-blue-400 hover:text-blue-500 font-semibold"
              >
                View Personal Details
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal for Personal Details */}
      {isModalOpen && (
        <div className="fixed sm:ml-16 sm:p-2 inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[1000] px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Personal Details</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">User:</span> {order.user}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {order.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {order.phone}
              </p>
              <p>
                <span className="font-semibold">Full Address:</span> {order.address}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={toggleModal}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}