import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code'; // Import QRCode from react-qr-code

function Verification() {
  const [qrData, setQrData] = useState(''); 

  useEffect(() => {
    // Generate QR code data with a dynamic value (e.g., timestamp)
    const generatedQrData = `Waste Registration Data`; // Unique value based on timestamp
    setQrData(generatedQrData); // Set the QR data to state
  }, []); // Empty dependency array ensures it runs only once after the initial render

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900">
      <div className="text-center">
        <h1 className="text-white text-2xl mb-4">Generated QR Code</h1>

        {/* QR Code Display */}
        <div className="mt-4">
          {qrData && <QRCode value={qrData} size={256} />} {/* Conditionally render QR code */}
        </div>

        {/* The URL of the generated QR code */}
        {qrData && (
          <div className="mt-4 text-white">
            <h2>Generated QR Code URL:</h2>
            <p>{qrData}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verification;
