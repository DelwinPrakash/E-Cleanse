import React, { useState } from "react";
import Card from "./Card"; // Import the Card component

export default function Business() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St, City, State, Zip",
      eWasteType: "Mobile Phones",
      quantity: "5 kg",
      condition: "Working",
      preferredDate: "2023-10-15",
      preferredTime: "10:00 AM",
      status: "Pending", // Can be "Pending", "Accepted", or "Rejected"
    },
    {
      id: 2,
      user: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, City, State, Zip",
      eWasteType: "Batteries",
      quantity: "10 kg",
      condition: "Non-working",
      preferredDate: "2023-10-16",
      preferredTime: "02:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      user: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, City, State, Zip",
      eWasteType: "Batteries",
      quantity: "10 kg",
      condition: "Non-working",
      preferredDate: "2023-10-16",
      preferredTime: "02:00 PM",
      status: "Pending",
    },
    {
      id: 4,
      user: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, City, State, Zip",
      eWasteType: "Batteries",
      quantity: "10 kg",
      condition: "Non-working",
      preferredDate: "2023-10-16",
      preferredTime: "02:00 PM",
      status: "Pending",
    },
    {
      id: 5,
      user: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, City, State, Zip",
      eWasteType: "Batteries",
      quantity: "10 kg",
      condition: "Non-working",
      preferredDate: "2023-10-16",
      preferredTime: "02:00 PM",
      status: "Pending",
    },
    {
      id: 6,
      user: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, City, State, Zip",
      eWasteType: "Batteries",
      quantity: "10 kg",
      condition: "Non-working",
      preferredDate: "2023-10-16",
      preferredTime: "02:00 PM",
      status: "Pending",
    },
    {
      id: 7,
      user: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, City, State, Zip",
      eWasteType: "Batteries",
      quantity: "10 kg",
      condition: "Non-working",
      preferredDate: "2023-10-16",
      preferredTime: "02:00 PM",
      status: "Pending",
    },
  ]);

  // Function to handle order status updates
  const handleOrderStatus = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
    console.log(`Order ${id} has been ${status.toLowerCase()}.`);
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-white p-4 bg-gray-700 shadow-md rounded-lg mt-0 sm:text-xl pl-2">
        Business Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 pb-16">
        {orders.map((order) => (
          <Card key={order.id} order={order} handleOrderStatus={handleOrderStatus} />
        ))}
      </div>
    </div>
  );
  
  }

