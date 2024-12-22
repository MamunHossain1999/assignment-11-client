import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const AddFood = () => {
  const { user } = useContext(AuthContext); // Logged-in user data
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    foodQuantity: '',
    pickupLocation: '',
    expireDate: '',
    additionalNotes: '',
    foodStatus: 'available', // Default status
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
      donatorImage: user.photoURL || '', // Optional
    };

    const dataToSubmit = { ...formData, ...donatorData }; // Combine form data with donator data

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
    <div className="w-full max-w-md mx-auto p-4 shadow-md bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Add a Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Food Name</label>
          <input 
            type="text" 
            name="foodName" 
            value={formData.foodName} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Food Image URL</label>
          <input 
            type="text" 
            name="foodImage" 
            value={formData.foodImage} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Food Quantity</label>
          <input 
            type="text" 
            name="foodQuantity" 
            value={formData.foodQuantity} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Pickup Location</label>
          <input 
            type="text" 
            name="pickupLocation" 
            value={formData.pickupLocation} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Expire Date/Time</label>
          <input 
            type="datetime-local" 
            name="expireDate" 
            value={formData.expireDate} 
            onChange={handleChange} 
            className="input input-bordered w-full" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Additional Notes</label>
          <textarea 
            name="additionalNotes" 
            value={formData.additionalNotes} 
            onChange={handleChange} 
            className="textarea textarea-bordered w-full" 
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
