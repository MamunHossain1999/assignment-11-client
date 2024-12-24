import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';

const AddFood = () => {
  const { user } = useContext(AuthContext); 
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodQuantity: '',
    pickupLocation: '',
    expireDate: '',
    additionalNotes: '',
    foodStatus: 'available', 
  });

  // Input field update handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Donator details from user context
    const donatorData = {
      donatorName: user.displayName,
      donatorEmail: user.email,
      donatorImage: user.photoURL || '', 
    };

    const dataToSubmit = { ...formData, ...donatorData }; 

    // Send data to the server (POST request)
    axios.post('http://localhost:5000/foods', dataToSubmit)
      .then((response) => {
        alert('Food added successfully!');
        setFormData({
          foodName: '',
          foodImage: '',
          foodQuantity: '',
          pickupLocation: '',
          expireDate: '',
          additionalNotes: '',
          foodStatus: 'available',
        });
      })
      .catch((error) => {
        console.error('Error adding food:', error);
        alert('Failed to add food.');
      });
  };

  return (
    <div className="w-full mx-auto p-8 shadow-lg bg-gradient-to-r from-teal-300 via-rose-200 to-indigo-300 rounded-lg">
      <Helmet>
        <title>AddFood</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Add a Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">Food Name</label>
          <input 
            type="text" 
            name="foodName" 
            value={formData.foodName} 
            onChange={handleChange} 
            className="input input-bordered w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">Food Image URL</label>
          <input 
            type="text" 
            name="foodImage" 
            value={formData.foodImage} 
            onChange={handleChange} 
            className="input input-bordered w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">Food Quantity</label>
          <input 
            type="text" 
            name="foodQuantity" 
            value={formData.foodQuantity} 
            onChange={handleChange} 
            className="input input-bordered w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">Pickup Location</label>
          <input 
            type="text" 
            name="pickupLocation" 
            value={formData.pickupLocation} 
            onChange={handleChange} 
            className="input input-bordered w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">Expire Date/Time</label>
          <input 
            type="datetime-local" 
            name="expireDate" 
            value={formData.expireDate} 
            onChange={handleChange} 
            className="input input-bordered w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400" 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-lg font-medium text-gray-700">Additional Notes</label>
          <textarea 
            name="additionalNotes" 
            value={formData.additionalNotes} 
            onChange={handleChange} 
            className="textarea textarea-bordered w-full p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-full p-3 rounded-md bg-teal-500 text-white font-semibold hover:bg-teal-600 transition duration-300"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
