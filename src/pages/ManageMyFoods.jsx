import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext); // User context
  const [foods, setFoods] = useState([]); // Foods state
  const navigate = useNavigate(); // For navigation

  // Fetch user's foods
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-foods?email=${user.email}`)
        .then((response) => setFoods(response.data))
        .catch((error) => console.error('Error fetching foods:', error));
    }
  }, [user]);

  // Delete food
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this food?');
    if (confirm) {
      axios
        .delete(`http://localhost:5000/foods/${id}`)
        .then(() => {
          alert('Food deleted successfully!');
          setFoods(foods.filter((food) => food._id !== id)); // Remove food from state
        })
        .catch((error) => console.error('Error deleting food:', error));
    }
  };

  // Navigate to Update Food Page
  const handleUpdate = (id) => {
    navigate(`/update-food/${id}`); // Navigate to update page with food ID
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage My Foods</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Food Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td className="border px-4 py-2">{food.foodName}</td>
              <td className="border px-4 py-2">{food.foodQuantity}</td>
              <td className="border px-4 py-2">
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleUpdate(food._id)} // Pass food ID
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMyFoods;
