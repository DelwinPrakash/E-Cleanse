// import React from "react";

// export default function Profile(){
//     return(
//         <div className="w-full sm:ml-16 p-4">
//             <h1 className="bg-zinc-900 text-yellow-400 text-2xl p-4">Profile</h1>
//         </div>
//     );
// }

import React, { useState } from 'react';

const Profile = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      // Request location permission
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          // Error callback
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className='text-white'>Access Current Location</h2>
        <button className='bg-blue-500 rounded-lg p-2 text-white' onClick={getLocation}>Get My Location</button>
        {location.latitude && location.longitude ? (
            <div className='flex flex-col items-center '>
                <p className='text-white'>Latitude: {location.latitude}</p>
                <p className='text-white'>Longitude: {location.longitude}</p>
            </div>
        ) : (
            <p className='text-white'>No location data available.</p>
        )}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Profile;