import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateFood = () => {
  const { id } = useParams(); // Food ID from URL params
  const navigate = useNavigate();
  const [food, setFood] = useState({
    foodName: '',
    foodQuantity: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/foods/${id}`)
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
      .put(`http://localhost:5000/foods/${id}`, food)
      .then(() => {
        alert('Food updated successfully!');
        navigate('/manage-my-foods'); // Redirect to Manage My Foods page
      })
      .catch((error) => console.error('Error updating food:', error));
  };

  return (
    <div className="container mx-auto p-4">
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
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
