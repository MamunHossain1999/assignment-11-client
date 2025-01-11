import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext); 
  const [foods, setFoods] = useState([]); 
  const navigate = useNavigate(); 

  // Fetch user's foods
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://food-hazel-three.vercel.app/my-foods?email=${user.email}`, {withCredentials: true})
        .then((response) => setFoods(response.data))
        .catch((error) => console.error('Error fetching foods:', error));
    }
  }, [user]);

  // Delete food with SweetAlert
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this food item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://food-hazel-three.vercel.app/foods/${id}`, {withCredentials: true})
          .then(() => {
            Swal.fire('Deleted!', 'Food has been deleted.', 'success');
            setFoods(foods.filter((food) => food._id !== id)); // Remove the deleted food from state
          })
          .catch((error) => {
            Swal.fire('Error!', 'There was an error deleting the food.', 'error');
            console.error('Error deleting food:', error);
          });
      }
    });
  };

  // Navigate to Update Food Page
  const handleUpdate = (id) => {
    navigate(`/update-food/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>ManageMyFoods</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-white text-center py-6">Manage My Foods</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Food Name</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Actions</th>
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

      {/* Mobile Responsiveness: Stack table data on smaller screens */}
      <div className="lg:hidden mt-6">
        <h3 className="text-xl font-bold text-purple-500 text-center py-4">Mobile View</h3>
        {foods.map((food) => (
          <div key={food._id} className="border p-4 mb-4 shadow-lg rounded-lg bg-white">
            <h4 className="font-semibold text-lg text-gray-800">{food.foodName}</h4>
            <p className="text-gray-600">Quantity: {food.foodQuantity}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="btn btn-warning btn-sm text-yellow-600 hover:bg-yellow-300"
                onClick={() => handleUpdate(food._id)}
              >
                Update
              </button>
              <button
                className="btn btn-danger btn-sm text-red-600 hover:bg-red-300"
                onClick={() => handleDelete(food._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMyFoods;
