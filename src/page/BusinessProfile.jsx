import React, { useState } from "react";

export default function BusinessProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order for personal details

  // Sample orders data
  const orders = [
    {
      user: "John Doe",
      type: "Mobile Phones",
      status: "Accepted",
      color: "text-green-400",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Recycling Lane, Green City, Eco State, 987654",
    },
    {
      user: "Jane Smith",
      type: "Batteries",
      status: "Rejected",
      color: "text-red-400",
      email: "jane.smith@example.com",
      phone: "+0987654321",
      address: "456 Green Avenue, Eco City, Green State, 123456",
    },
  ];

  // Function to toggle modal and set selected order
  const toggleModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gray-500 text-white flex flex-col p-2 sm:ml-16 mb-14 sm:mb-0">
      {/* Dashboard Title */}
      {/* <h2 className="text-3xl font-bold text-center mb-6">Business Profile</h2> */}

      {/* Profile Information Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-5">
        <h3 className="text-xl font-semibold mb-4">Business Profile</h3>
        <div className="space-y-4">
          {[
            { label: "Organization Name", value: "Tech Recycling Co." },
            { label: "Email Address", value: "contact@techrecycling.com" },
            { label: "Business Registration Number", value: "BR123456789" },
            { label: "Contact Number", value: "+1234567890" },
          ].map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-400">{item.label}</h4>
              <p className="text-gray-200">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
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
                <th className="pb-2">User</th>
                <th className="pb-2">E-Waste Type</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2">{order.user}</td>
                  <td className="py-2">{order.type}</td>
                  <td className={`py-2 ${order.color}`}>{order.status}</td>
                  <td className="py-2">
                    {order.status === "Accepted" && ( // Only show "View Details" for accepted orders
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

      {/* Modal for Personal Details */}
      {isModalOpen && selectedOrder && (
        <div className="fixed sm:ml-16 sm:p-2 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Personal Details</h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">User:</span> {selectedOrder.user}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {selectedOrder.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {selectedOrder.phone}
              </p>
              <p>
                <span className="font-semibold">Full Address:</span> {selectedOrder.address}
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
    </div>
  );
}