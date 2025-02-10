import { useState } from "react";
import { FaEye, FaEyeSlash, FaSignOutAlt, FaUserEdit, FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const user = {
    profilePic: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    trips: 15,
    phone: "+91 9876543210",
    city: "Mumbai",
    address: "123, Park Street",
    state: "Maharashtra",
    country: "India",
    zip: "400001",
    bio: "Travel enthusiast, love exploring new cultures and cuisines.",
    password: "mysecurepassword",
  };

  // Go back to the previous page
  const handleBack = () => {
    window.history.back();
  };

  // Handle account deletion (can be replaced with actual functionality)
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deleted!");
      // Add actual deletion logic here
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#213667]">
      {/* Back Button */}
      <div className="absolute top-12 left-6">
        <button
          onClick={handleBack}
          className="flex items-center text-white bg-transparent border border-white rounded-full p-2 hover:bg-white hover:text-gray-800 transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center items-center px-8 py-12 flex-grow mt-40">
        <div className="max-w-6xl w-full bg-transparent p-12 rounded-3xl shadow-lg">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg"
            />
            <h1 className="text-3xl font-semibold text-white mt-4">{user.name}</h1>
            <p className="text-lg text-white">{user.email}</p>
          </div>

          {/* Profile Form */}
          <form className="space-y-12">
            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">📍 City</label>
              <input
                type="text"
                value={user.city}
                className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">📞 Phone</label>
              <input
                type="text"
                value={user.phone}
                className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">🚀 No. of Trips</label>
              <input
                type="text"
                value={user.trips}
                className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">🏡 Address</label>
              <input
                type="text"
                value={`${user.address}, ${user.state}, ${user.country}`}
                className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">📦 Zip Code</label>
              <input
                type="text"
                value={user.zip}
                className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">🔒 Password</label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-4 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-2xl text-white font-semibold mb-2">📝 Bio</label>
              <textarea
                value={user.bio}
                className="w-full p-6 text-3xl rounded-lg border-2 border-gray-300 text-white bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-500 h-36 resize-none"
                readOnly
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-8 mt-8">
            <button className="flex items-center bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
              <FaUserEdit className="mr-2" />
              Edit Profile
            </button>
            <button
              className="flex items-center bg-red-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
              onClick={() => alert("Logging out...")}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
            <button
              className="flex items-center bg-red-700 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-800 transition duration-300"
              onClick={handleDeleteAccount}
            >
              <FaTrashAlt className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
