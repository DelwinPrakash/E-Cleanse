import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterWaste() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    pickupAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    preferredDate: '',
    preferredTime: '',
    eWasteType: '',
    quantity: '',
    condition: '',
    specialHandling: '',
    pickupDescription: '',
    photos: null,
    alternateContactNumber: '',
    confirmAccuracy: false,
    agreeTerms: false,
    otp: '',
  });
  

  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate(); 

  const locationInputRef = useRef(null);

  // Generate a simple CAPTCHA
  useEffect(() => {
    const generateCaptcha = () => {
      const randomString = Math.random().toString(36).substring(7);
      setCaptcha(randomString);
    };
    generateCaptcha();
  }, []);

  // Initialize Google Places Autocomplete for pickup address
  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        locationInputRef.current,
        {
          types: ['geocode'],
          componentRestrictions: { country: 'IN' }, // Restrict to India
        }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setFormData((prevData) => ({
            ...prevData,
            pickupAddress: place.formatted_address,
          }));
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleCaptchaChange = (e) => {
    setUserCaptcha(e.target.value);
  };

  const handleSendOtp = () => {
    // Simulate OTP sending (replace with actual API call)
    alert('OTP sent to your phone number!');
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (formData.otp === '123456') {
      // Simulate OTP verification (replace with actual logic)
      setOtpVerified(true);
      alert('OTP verified successfully!');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert('Please verify your OTP before submitting.');
      return;
    }

    if (userCaptcha !== captcha) {
      alert('CAPTCHA verification failed. Please try again.');
      return;
    }

    if (!formData.confirmAccuracy || !formData.agreeTerms) {
      alert('Please confirm the accuracy of your details and agree to the terms.');
      return;
    }

    // Submit form data (replace with actual API call)
    console.log('Form Data:', formData);
    alert('Waste pickup request submitted successfully!');
  };

  return (
    <div className="w-full sm:ml-16 p-2 pb-16 sm:p-2 h-screen bg-zinc-950">
      <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-lg"
      style={{paddingBottom:"70px"}}>
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Register Your E-Waste</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Identification */}
          <div>
            <label className="block text-white mb-2" htmlFor="fullName">Item Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          {/* Pickup Details */}
          <div>
            <label className="block text-white mb-2" htmlFor="pickupAddress">Pickup Address</label>
            <input
              type="text"
              name="pickupAddress"
              id="pickupAddress"
              ref={locationInputRef}
              value={formData.pickupAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2" htmlFor="street">Street</label>
              <input
                type="text"
                name="street"
                id="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2" htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2" htmlFor="preferredDate">Preferred Pickup Date</label>
              <input
                type="date"
                name="preferredDate"
                id="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="preferredTime">Preferred Pickup Time</label>
              <input
                type="time"
                name="preferredTime"
                id="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                required
              />
            </div>
          </div>

          {/* E-Waste Details */}
          <div>
            <label className="block text-white mb-2" htmlFor="eWasteType">Type of E-Waste</label>
            <select
              name="eWasteType"
              id="eWasteType"
              value={formData.eWasteType}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            >
              <option value="">Select Type</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Batteries">Batteries</option>
              <option value="Computers">Computers</option>
              <option value="Printers">Printers</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="condition">Condition of E-Waste</label>
            <select
              name="condition"
              id="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              required
            >
              <option value="">Select Condition</option>
              <option value="Working">Working</option>
              <option value="Non-working">Non-working</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>

          {/* Additional Instructions */}
          <div>
            <label className="block text-white mb-2" htmlFor="specialHandling">Special Handling Requests</label>
            <textarea
              name="specialHandling"
              id="specialHandling"
              value={formData.specialHandling}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="E.g., Fragile items, Large items"
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="pickupDescription">Pickup Point Description</label>
            <textarea
              name="pickupDescription"
              id="pickupDescription"
              value={formData.pickupDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="E.g., Landmarks, floor, etc."
            />
          </div>

          {/* Optional Details */}
          <div>
            <label className="block text-white mb-2" htmlFor="photos">Photos of E-Waste</label>
            <input
              type="file"
              name="photos"
              id="photos"
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="alternateContactNumber">Alternate Contact Number</label>
            <input
              type="tel"
              name="alternateContactNumber"
              id="alternateContactNumber"
              value={formData.alternateContactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>

          {/* Confirmation & Consent */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="confirmAccuracy"
                id="confirmAccuracy"
                checked={formData.confirmAccuracy}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label htmlFor="confirmAccuracy" className="text-white">
                I confirm that the provided details are accurate.
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label htmlFor="agreeTerms" className="text-white">
                I agree to the terms and conditions of recycling.
              </label>
            </div>
          </div>

          {/* Security and Verification */}
          <div>
            <label className="block text-white mb-2" htmlFor="captcha">CAPTCHA: {captcha}</label>
            <input
              type="text"
              name="captcha"
              id="captcha"
              value={userCaptcha}
              onChange={handleCaptchaChange}
              className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter the CAPTCHA above"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="otp">OTP Verification</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="otp"
                id="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Send OTP
              </button>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Verify OTP
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
              onClick={() => {
                alert('Woohoo! Thanks for doing your part. 🎉');
                navigate('./qrcode');
            }}
            >
              Submit Waste Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterWaste;