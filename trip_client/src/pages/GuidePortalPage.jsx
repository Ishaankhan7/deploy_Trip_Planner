import React, { useState } from 'react';
import Navbar_TripPlanningPage from '../components/Navbar_TripPlanningPage';
import Footer from '../components/Footer';

const GuidePortalPage = () => {
  const [slots, setSlots] = useState([
    { id: 1, date: '2025-02-10', location: 'New Delhi', time: '10:00 AM' }
  ]);
  const [form, setForm] = useState({ date: '', location: '', time: '', id: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOrUpdateSlot = () => {
    if (form.date && form.location && form.time) {
      if (form.id) {
        setSlots(slots.map(slot => slot.id === form.id ? form : slot));
      } else {
        setSlots([...slots, { id: Date.now(), ...form }]);
      }
      setForm({ date: '', location: '', time: '', id: null });
    }
  };

  const deleteSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const editSlot = (slot) => {
    setForm(slot);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1D3465] to-[#CDCED1] text-white">
      <Navbar_TripPlanningPage />
      
      <div className="flex-grow mt-40 flex flex-col items-center py-6 px-6 md:px-20">
        <div className="w-full max-w-5xl  bg-white text-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Guide Slot Management</h2>
          
          {/* Form */}
          <div className="space-y-3 mb-4">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="time" name="time" value={form.time} onChange={handleChange} className="w-full p-2 border rounded" />
            <button onClick={addOrUpdateSlot} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              {form.id ? 'Update Slot' : 'Add Slot'}
            </button>
          </div>
          
          {/* Slot List */}
          <ul className="space-y-3">
            {slots.map(slot => (
              <li key={slot.id} className="flex justify-between items-center p-3 border rounded bg-gray-100">
                <span>{slot.date} - {slot.location} - {slot.time}</span>
                <div>
                  <button onClick={() => editSlot(slot)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">Edit</button>
                  <button onClick={() => deleteSlot(slot.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GuidePortalPage;
