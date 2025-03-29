import React, { useEffect, useState } from "react";
import Card from "./Card"; // Import the Card component
import axios from "axios";
import Loading from "./Loading";

export default function Business() {

  const [userDetails, setUserDetails] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      try{
        const { data } = await axios.get(`http://localhost:3000/api/user-details`);
        setUserDetails(data.userDetails);
      }catch(error){
        console.log(error);
      }finally{
        setUserLoading(false)
      }
    }
    fetchAllUsers();
  }, []);
  
  if (userLoading) {
    return (
      <Loading/>
    );
  }

  // Function to handle order status updates
  const handleOrderStatus = (id, status) => {
    setUserDetails((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, status } : user
      )
    );
    console.log(`Order ${id} has been ${status.toLowerCase()}.`);
  };
  console.log(userDetails)
  return (
    <div>
      <h1 className="text-3xl font-bold text-white p-4 bg-gray-700 shadow-md rounded-lg mt-0 sm:text-xl pl-2">
        Business Dashboard
      </h1>
      {userDetails.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 pb-16">
          {userDetails.map((user) => (
            <Card key={user._id} user={user} handleOrderStatus={handleOrderStatus} />
          ))}
        </div>
      ):(<div className="flex justify-center items-center">
          <p className="text-white text-xl">Nothing to Recycle!</p>
        </div>
      )}
    </div>
  ); 
}