import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import { db } from "../firebase"; // Firebase config import
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddFood = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [foodQuantity, setFoodQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [foodStatus, setFoodStatus] = useState("available");

  // Handle form submission
  const handleAddFood = async (e) => {
    e.preventDefault();
    
    if (!foodName || !foodQuantity || !pickupLocation || !expiredDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const foodCollection = collection(db, "foods");

      // Prepare data for the new food item
      const foodData = {
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,
        expiredDate,
        additionalNotes,
        foodStatus,
        donatorName: user.displayName,
        donatorEmail: user.email,
        donatorImage: user.photoURL,
      };

      // Add food to the Firestore database
      await addDoc(foodCollection, foodData);
      
      toast.success("Food added successfully!");
      navigate("/available-foods"); // Redirect to Available Foods page
    } catch (error) {
      console.error("Error adding food: ", error);
      toast.error("Failed to add food.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h2 className="text-2xl font-bold mb-4">Add Food</h2>
      <form onSubmit={handleAddFood} className="space-y-4">
        <div>
          <label className="block font-semibold">Food Name</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Food Image</label>
          <input
            type="file"
            onChange={(e) => setFoodImage(e.target.files[0])}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Food Quantity</label>
          <input
            type="number"
            value={foodQuantity}
            onChange={(e) => setFoodQuantity(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Pickup Location</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Expired Date/Time</label>
          <input
            type="datetime-local"
            value={expiredDate}
            onChange={(e) => setExpiredDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
