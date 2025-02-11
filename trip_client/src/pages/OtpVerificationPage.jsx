import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract role & email from cookies
  const searchParams = new URLSearchParams(location.search);
  const userRole = searchParams.get("role") || Cookies.get("userRole");
  const userEmail = Cookies.get("userEmail");

  const handleChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const otpValue = otp.join("");

    try {
      const response = await axios.post("https://trip-planner-2lxk.onrender.com/api/user/verify-otp", { otp: otpValue });
      setSuccess(response.data.message);

      // Redirect based on role
      if (userRole === "Guide") {
        navigate("/guide-portal");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setIsResending(true);

    try {
      const response = await axios.post("http://localhost:7000/api/user/resend-otp", { email: userEmail });
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2C416E] to-[#A8ABB2] px-4">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 lg:px-12">
        <div className="w-full max-w-md backdrop-blur-sm bg-[#928ba8] p-8 rounded-[30px] sm:rounded-[70px] shadow-lg opacity-90">
          <div className="flex items-center space-x-4 justify-center mb-6">
            <img src="/safarsathi_logo.jpg" alt="SafarSathi Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full" />
            <h1 className="text-2xl sm:text-4xl font-bold text-white">SafarSathi</h1>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-black">Verify Your Email</h2>
          <p className="text-center text-black mb-6">Please enter the OTP sent to your email to complete verification.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-between space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-bold rounded-lg bg-pink-100 text-black ring-2 ring-black focus:ring-blue-500 focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C416E] text-white py-2 rounded-lg hover:bg-[#1A2C47] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Verify OTP
            </button>
          </form>

          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          {success && <p className="mt-4 text-center text-green-600">{success}</p>}

          <p className="mt-6 text-center text-black">
            Didn’t receive the OTP?{" "}
            <button
              onClick={handleResendOTP}
              className="text-blue-800 hover:underline"
              disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          </p>
        </div>

        <div className="mt-16 flex justify-center space-x-8">
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/x_img.png" alt="Twitter" className="w-10 sm:w-14 h-10 sm:h-14" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/insta_img.png" alt="Instagram" className="w-10 sm:w-14 h-10 sm:h-14" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/yt_img.png" alt="YouTube" className="w-10 sm:w-14 h-10 sm:h-14" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/linkedin_img.png" alt="LinkedIn" className="w-10 sm:w-14 h-10 sm:h-14" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
