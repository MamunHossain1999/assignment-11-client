import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

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

    const donatorData = {
      donatorName: user.displayName,
      donatorEmail: user.email,
      donatorImage: user.photoURL || '',
    };

    const dataToSubmit = { ...formData, ...donatorData };

    axios
      .post('https://food-hazel-three.vercel.app/foods', dataToSubmit, { withCredentials: true })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Food added successfully!',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true,
        });

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
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Failed to add food. Please try again later.',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto sm:p-10 bg-slate-400 dark:bg-slate-800 rounded-lg shadow-md py-10">
      <Helmet>
        <title>Add Food</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-white dark:text-gray-100 mb-8">
        Add a Food
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Enter food name"
            className="input input-bordered w-full p-3 rounded-md text-gray-700 dark:text-gray-300 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
            Food Image URL
          </label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full p-3 rounded-md text-gray-700 dark:text-gray-300 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
            Food Quantity
          </label>
          <input
            type="text"
            name="foodQuantity"
            value={formData.foodQuantity}
            onChange={handleChange}
            placeholder="Enter quantity (e.g., 5 plates)"
            className="input input-bordered w-full p-3 rounded-md text-gray-700 dark:text-gray-300 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
            Pickup Location
          </label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Enter pickup location"
            className="input input-bordered w-full p-3 rounded-md text-gray-700 dark:text-gray-300 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
            Expire Date/Time
          </label>
          <input
            type="datetime-local"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            className="input input-bordered w-full p-3 rounded-md text-gray-700 dark:text-gray-300 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200">
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Enter any additional information"
            className="textarea textarea-bordered w-full p-3 rounded-md text-gray-700 dark:text-gray-300 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full p-3 rounded-md text-white transition duration-300"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
