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
    <div className="container mx-auto p-4">
      <Helmet>
        <title>UpdateFood</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Update Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="foodName" className="block font-semibold">
            Food Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={food.foodName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="foodQuantity" className="block font-semibold">
            Food Quantity
          </label>
          <input
            type="number"
            id="foodQuantity"
            name="foodQuantity"
            value={food.foodQuantity}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
