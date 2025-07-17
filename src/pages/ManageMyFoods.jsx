import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2'; 

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext); 
  const [foods, setFoods] = useState([]); 
  const navigate = useNavigate(); 

  // Fetch user's foods
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-foods?email=${user.email}`, {withCredentials: true})
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
          .delete(`http://localhost:5000/foods/${id}`, {withCredentials: true})
          .then(() => {
            Swal.fire('Deleted!', 'Food has been deleted.', 'success');
            setFoods(foods.filter((food) => food._id !== id)); 
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
    <div className="bg-gray-100 mx-auto p-4">
      <Helmet>
        <title>ManageMyFoods</title>
      </Helmet>
      <h2 className="md:text-3xl text-xl font-bold text-black text-center py-6">Manage My Foods</h2>
      
      {/* Desktop View */}
      <div className="container mx-auto overflow-x-auto hidden pb-12 lg:block">
        <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
          <thead className="bg-orange-400 text-white">
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
                <td className="border px-4 py-2 flex justify-between">
                  <button
                    className="btn bg-orange-300 border-none text-white btn-sm mr-2 hover:bg-orange-400 transition-all duration-200"
                    onClick={() => handleUpdate(food._id)} 
                  >
                    Update
                  </button>
                  <button
                    className="btn bg-red-600 btn-sm text-white border-none hover:bg-red-700 transition-all duration-200"
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

      {/* Mobile View */}
      <div className="lg:hidden mt-6">
      
        {foods.map((food) => (
          <div key={food._id} className="border p-4 mb-4 shadow-lg rounded-lg bg-white">
            <h4 className="font-semibold text-lg text-gray-800">{food.foodName}</h4>
            <p className="text-gray-600">Quantity: {food.foodQuantity}</p>
            <div className="mt-4 flex justify-between gap-2">
              <button
                 className="btn bg-orange-300 border-none text-white btn-sm mr-2 hover:bg-orange-400 transition-all duration-200"
                onClick={() => handleUpdate(food._id)}
              >
                Update
              </button>
              <button
                 className="btn bg-red-600 btn-sm text-white border-none hover:bg-red-700 transition-all duration-200"
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
