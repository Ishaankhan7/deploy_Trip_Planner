import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:7000/api/user/signup", formData);
      setSuccess(response.data.message);
      
      // Redirect to OTP verification page
      navigate("/verifyotp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2C416E] to-[#A8ABB2]">
      <div className="container mx-auto relative flex flex-col lg:flex-row items-center justify-center px-4 lg:px-12">
        <div className="flex flex-col items-center lg:items-start text-black mb-8 lg:mb-0 lg:mr-8 w-full lg:w-auto">
          <div className="flex items-center space-x-4 ml-0 sm:ml-10">
            <img
              src="/safarsathi_logo.jpg"
              alt="SafarSathi Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full"
            />
            <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left">
              SafarSathi
            </h1>
          </div>

          <div className="mt-4 w-full max-w-sm lg:mr-56 md:max-w-md backdrop-blur-sm bg-[#928ba8] p-6 rounded-[30px] sm:rounded-[70px] shadow-lg opacity-80">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
              Please Enter Your Details
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-pink-100 text-black ring-2 ring-black" />
              <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-pink-100 text-black ring-2 ring-black" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-pink-100 text-black ring-2 ring-black" />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-pink-100 text-black ring-2 ring-black" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-pink-100 text-black ring-2 ring-black" />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-pink-100 text-black ring-2 ring-black" required>
                <option value="" disabled>Select Role</option>
                <option value="user">user</option>
                <option value="guide">guide</option>
              </select>
              <button type="submit" className="w-full bg-[#2C416E] text-white py-2 rounded-lg hover:bg-[#1A2C47] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">Sign Up</button>
            </form>

            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            {success && <p className="mt-4 text-center text-green-600">{success}</p>}

            <p className="mt-4 text-center text-white">
              Already have an account? <Link to="/" className="text-blue-800 hover:underline">Login here.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;