import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext); // User context
  const [foods, setFoods] = useState([]); // Foods state
  const [selectedFood, setSelectedFood] = useState(null); // For update modal

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

  // Update food (open modal)
  const handleUpdate = (food) => {
    setSelectedFood(food); // Set selected food to state
  };

  // Submit updated food
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/foods/${selectedFood._id}`, selectedFood)
      .then(() => {
        alert('Food updated successfully!');
        setSelectedFood(null); // Close modal
        setFoods(foods.map((food) => (food._id === selectedFood._id ? selectedFood : food)));
      })
      .catch((error) => console.error('Error updating food:', error));
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
                  onClick={() => handleUpdate(food)}
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

      {/* Update Food Modal */}
      {selectedFood && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Food</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Food Name</label>
                <input
                  type="text"
                  value={selectedFood.foodName}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, foodName: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Food Quantity</label>
                <input
                  type="text"
                  value={selectedFood.foodQuantity}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, foodQuantity: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedFood(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
