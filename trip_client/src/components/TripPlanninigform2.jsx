import React, { useState } from 'react';

const TripPlanningForm2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    gender: '',
    ageRange: { min: '', max: '' },
    drinking: '',
    smoking: '',
    foodPreference: '',
    sleepingHabits: '',
    personalityType: '',
    activityInterests: [],
    musicPreference: '',
    idVerificationRequired: null,
    emergencyContact: '',
    emergencyContactSharing: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name.includes('ageRange')) {
      const ageType = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        ageRange: { ...prevData.ageRange, [ageType]: value },
      }));
    } else if (name === 'idVerificationRequired' && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        idVerificationRequired: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      let response;
      if (formData.idVerificationRequired) {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key === 'ageRange' || key === 'activityInterests') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else if (key === 'idVerificationRequired') {
            formDataToSend.append('idVerification', formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });

        response = await fetch('http://localhost:7000/solo-trip', {
          method: 'POST',
          body: formDataToSend,
          credentials: "include",
        });
      } else {
        response = await fetch('http://localhost:7000/solo-trip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include',
        });
      }

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Trip Plan submitted successfully!');
        setFormData({
          name: '',
          phoneNumber: '',
          gender: '',
          ageRange: { min: '', max: '' },
          drinking: '',
          smoking: '',
          foodPreference: '',
          sleepingHabits: '',
          personalityType: '',
          activityInterests: [],
          musicPreference: '',
          idVerificationRequired: null,
          emergencyContact: '',
          emergencyContactSharing: false,
        });
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    }

    setLoading(false);
  };


  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 min-h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl z-20">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Plan Your Trip</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-6 z-20">
            <label className="block text-lg font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Gender Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any</option>
            </select>
          </div>

          {/* Age Range Fields */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Age Range</label>
            <div className="flex space-x-4">
              <input
                type="number"
                name="ageRange.min"
                value={formData.ageRange.min}
                onChange={handleChange}
                placeholder="Min Age"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="number"
                name="ageRange.max"
                value={formData.ageRange.max}
                onChange={handleChange}
                placeholder="Max Age"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Drinking Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Drinking</label>
            <select
              name="drinking"
              value={formData.drinking}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          </div>

          {/* Smoking Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Smoking</label>
            <select
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          </div>

          {/* Food Preference Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Food Preference</label>
            <select
              name="foodPreference"
              value={formData.foodPreference}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          {/* Sleeping Habits Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Sleeping Habits</label>
            <select
              name="sleepingHabits"
              value={formData.sleepingHabits}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Early Riser">Early Riser</option>
              <option value="Night Owl">Night Owl</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          {/* Personality Type Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Personality Type</label>
            <select
              name="personalityType"
              value={formData.personalityType}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Introvert">Introvert</option>
              <option value="Extrovert">Extrovert</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          {/* Activity Interests Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Activity Interests</label>
            <textarea
              name="activityInterests"
              value={formData.activityInterests.join(', ')}
              onChange={(e) => setFormData({ ...formData, activityInterests: e.target.value.split(', ') })}
              placeholder="e.g. Hiking, Beach, Adventure"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Music Preference Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Music Preference</label>
            <select
              name="musicPreference"
              value={formData.musicPreference}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Option</option>
              <option value="Loud Music">Loud Music</option>
              <option value="Calm Music">Calm Music</option>
              <option value="No Preference">No Preference</option>
            </select>
          </div>

          {/* ID Verification Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Upload ID for Verification</label>
            <input
              type="file"
              name="idVerificationRequired"
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Emergency Contact Sharing Field */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Enter Emergency Contact Number"
              className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Checkbox for Sharing Emergency Contact */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name="emergencyContactSharing"
              checked={formData.emergencyContactSharing}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-lg text-gray-700">Shared Emergency Contact</label>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripPlanningForm2;
