  import { useState } from "react";

  const TripPlanningForm = () => {
    const [formData, setFormData] = useState({
      city: "",
    interests: "",
    startDate: "",
    endDate: "",
    num_men: "",
    num_women: "",
    num_others: "",
    budget_men: "",
    budget_women: "",
    budget_others: "",
    total_budget: "",
    wantsPartner: "",
  });

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token"); // 🔥 Assuming token-based auth
  
      const requestData = {
        ...formData,
        start_date: formData.startDate, // Rename to match backend expectation
        end_date: formData.endDate,     // Rename to match backend expectation
      };
  
      delete requestData.startDate; // Remove the original camelCase keys
      delete requestData.endDate;
  
      const response = await fetch("https://trip-planner-2lxk.onrender.com/api/trip-planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 Token for authentication
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setItinerary(data.itinerary);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl">
        <h1 className="text-center mt-12 text-[50px] font-bold mb-10">
          PLAN YOUR TRIP
        </h1>

        <div className=" relative bg-white border-2 border-black p-6 sm:p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="block w-full pl-4 border-b-2 border-black bg-transparent text-black"
              required
            />

            {/* Interests */}
            <input
              type="text"
              name="interests"
              placeholder="Specify Your Interests"
              value={formData.interests}
              onChange={handleChange}
              className="block w-full pl-4 border-b-2 border-black bg-transparent text-black"
              required
            />

            {/* Date Pickers */}
            <div className="flex flex-col sm:flex-row space-x-4">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border-b-2 border-black bg-transparent text-black"
                required
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border-b-2 border-black bg-transparent text-black"
                required
              />
            </div>

            {/* Number of People */}
            <div className="flex flex-col sm:flex-row space-x-4">
              {["num_men", "num_women", "num_others"].map((name, index) => (
                <select
                  key={index}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="block w-full pl-4 pr-10 border-b-2 border-black bg-transparent text-black"
                  required
                >
                  <option value="">Select {name.replace("num_", "")}</option>
                  {[0, 1, 2, 3].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            {/* Budget */}
            <div className="flex flex-col sm:flex-row space-x-4">
              {["budget_men", "budget_women", "budget_others"].map((name, index) => (
                <select
                  key={index}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="block w-full pl-4 pr-10 border-b-2 border-black bg-transparent text-black"
                  required
                >
                  <option value="">Select Budget ({name.replace("budget_", "")})</option>
                  {["Low", "Medium", "High"].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            {/* Total Budget */}
            <input
              type="text"
              name="total_budget"
              placeholder="Total Budget"
              value={formData.total_budget}
              onChange={handleChange}
              className="block w-full pl-4 border-b-2 border-black bg-transparent text-black"
              required
            />

            {/* Wants Partner */}
            <div className="flex space-x-4">
              <span>Looking for a travel partner?</span>
              <label>
                <input
                  type="radio"
                  name="wantsPartner"
                  value="yes"
                  checked={formData.wantsPartner === "yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="wantsPartner"
                  value="no"
                  checked={formData.wantsPartner === "no"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-1/2 mt-4 py-3 bg-[#DF898B] border-2 border-black rounded-2xl text-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </form>

          {/* Display Itinerary */}
          {itinerary && (
            <div className="mt-6 p-4 bg-gray-100 border-2 border-black rounded-lg">
              <h2 className="text-lg font-bold">Your Itinerary:</h2>
              <p>{itinerary}</p>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default TripPlanningForm;
