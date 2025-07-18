import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState({
    foodName: '',
    foodQuantity: '',
  });

  useEffect(() => {
    axios
      .get(`https://food-hazel-three.vercel.app/foods/${id}`, { withCredentials: true })
      .then((response) => setFood(response.data))
      .catch((error) => console.error('Error fetching food details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://food-hazel-three.vercel.app/foods/${id}`, food, { withCredentials: true })
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Food updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/manage-my-foods');
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update food. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Error updating food:', error);
      });
  };

  return (
    <div className=" flex items-center justify-center p-4 pt-12">
      <Helmet>
        <title>Update Food</title>
      </Helmet>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-black">Update Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={food.foodName}
              onChange={handleChange}
              className="w-full px-4 py-2 border bg-gray-300 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter food name"
              required
            />
          </div>
          <div>
            <label htmlFor="foodQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              Food Quantity
            </label>
            <input
              type="number"
              id="foodQuantity"
              name="foodQuantity"
              value={food.foodQuantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 bg-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter food quantity"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-300 text-white font-semibold py-2 rounded-md hover:bg-orange-400 transition duration-300"
          >
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
