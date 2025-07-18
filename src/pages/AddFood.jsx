import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const defaultExpireDate = () => {
    const now = new Date();
    now.setHours(now.getHours() + 6); 
    return now.toISOString().slice(0, 16); 
  };

  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "Dhaka",
    expireDate: defaultExpireDate(),
    additionalNotes: "",
    foodStatus: "available",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        donatorName: user.displayName,
        donatorEmail: user.email,
        donatorImage: user.photoURL || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://lustrous-cassata-4ef2e4.netlify.app/foods", formData, { withCredentials: true })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Food added successfully!",
          timer: 3000,
          timerProgressBar: true,
        });

        setFormData({
          foodName: "",
          foodImage: "",
          foodQuantity: "",
          pickupLocation: "Dhaka",
          expireDate: defaultExpireDate(),
          additionalNotes: "",
          foodStatus: "available",
          donatorName: user.displayName,
          donatorEmail: user.email,
          donatorImage: user.photoURL || "",
        });
      })
      .catch((error) => {
        console.error("Error adding food:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to add food. Please try again later.",
        });
      });
  };

  return (
    <div className="w-full mx-auto sm:p-10 bg-gray-100 shadow-md py-10">
      <Helmet>
        <title>Add Food</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add a Food</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-3 rounded-md bg-white shadow-md"
      >
        {/* Food Name */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Enter food name"
            className="input input-bordered w-full p-3 bg-white rounded-md text-gray-800"
            required
          />
        </div>

        {/* Food Image */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">Food Image URL</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full p-3 bg-white rounded-md text-gray-800"
            required
          />
        </div>

        {/* Food Quantity */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">Food Quantity</label>
          <input
            type="text"
            name="foodQuantity"
            value={formData.foodQuantity}
            onChange={handleChange}
            placeholder="Enter quantity (e.g., 5 plates)"
            className="input input-bordered w-full p-3 bg-white rounded-md text-gray-800"
            required
          />
        </div>

        {/* Pickup Location */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">Pickup Location</label>
          <select
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="input input-bordered w-full p-3 bg-white rounded-md text-gray-800"
          >
            <option>Dhaka</option>
            <option>Chittagong</option>
            <option>Khulna</option>
            <option>Rajshahi</option>
            <option>Barisal</option>
          </select>
        </div>

        {/* Expire Date */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">Expire Date/Time</label>
          <input
            type="datetime-local"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            className="input input-bordered w-full p-3 bg-white rounded-md text-gray-800"
            required
          />
        </div>

        {/* Additional Notes */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-700">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Enter any additional information"
            className="textarea textarea-bordered w-full p-3 bg-white rounded-md text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="btn bg-orange-300 hover:bg-orange-400 border-none w-full p-3 rounded-md text-white transition duration-300"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
