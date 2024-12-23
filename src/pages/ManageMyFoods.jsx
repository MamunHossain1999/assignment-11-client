import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext); 
  const [foods, setFoods] = useState([]); 
  const navigate = useNavigate(); 

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
          setFoods(foods.filter((food) => food._id !== id)); 
        })
        .catch((error) => console.error('Error deleting food:', error));
    }
  };

  // Navigate to Update Food Page
  const handleUpdate = (id) => {
    navigate(`/update-food/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Manage My Foods</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2">Food Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {foods.map((food) => (
              <tr key={food._id} className="hover:bg-gray-100 transition-all duration-200">
                <td className="border px-4 py-2">{food.foodName}</td>
                <td className="border px-4 py-2">{food.foodQuantity}</td>
                <td className="border px-4 py-2">
                  <button
                    className="btn btn-warning btn-sm mr-2 text-yellow-600 hover:bg-yellow-300 transition-all duration-200"
                    onClick={() => handleUpdate(food._id)} 
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm text-red-600 hover:bg-red-300 transition-all duration-200"
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
    </div>
  );
};

export default ManageMyFoods;
