import React, { useEffect, useState } from "react";
import Card from "./Card"; // Import the Card component
import axios from "axios";
import Loading from "./Loading";
import { useAuth } from "../context/AuthProvider";

export default function Business() {

  const [userDetails, setUserDetails] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const { user } = useAuth();

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

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  // Function to handle order status updates
  const handleOrderStatus = async (id, userID, status, userInfo) => {
    console.log(userInfo)
    try{
      const { data } = await axios.put(`http://localhost:3000/api/user-details/${id}`, {status, businessID: user._id});
      console.log(data)
    }catch(error){
      console.log(error || error.response?.data?.message);
    }
    const verifyCaptcha = generateCaptcha()
    try{
      const { data } = await axios.post(`http://localhost:3000/api/recycle-item`, {
        userID: userID,   //from user collection
        businessID: user._id,
        // status,
        fullName: userInfo.fullName,
        phoneNumber: userInfo.phoneNumber,
        pickupAddress: userInfo.pickupAddress,
        eWasteType: userInfo.eWasteType,
        preferredDate: userInfo.preferredDate,
        preferredTime: userInfo.preferredTime,
        verifyCaptcha
      });
      console.log("userinfo", data);
    }catch(error){
      console.log(error || error.response?.data?.message);
    }

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
        (() => {
          const filteredUsers = userDetails.filter(
            // (user) => user.status !== "accepted" && user.status !== "rejected" && user.status !== "ready" && user.status !== "collected"
            (user) => user.status === "pending"
          );
          return filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 pb-16">
              {filteredUsers.map((user) => (
                <Card key={user._id} user={user} handleOrderStatus={handleOrderStatus} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 mt-2 p-4 rounded-lg">
              <p className="text-sm text-gray-400">No items available for recycling!</p>
            </div>
          );
        })()
      ):(<div className="bg-gray-900 mt-2 p-4 rounded-lg">
          <p className="text-sm text-gray-400">No items available for recycling!</p>
        </div>
      )}
    </div>  
  ); 
}