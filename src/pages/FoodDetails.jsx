import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";

const FoodDetails = () => {
  const { user } = useContext(AuthContext); 
  const { id } = useParams(); 
  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 


  useEffect(() => {
    axios
      .get(`https://food-hazel-three.vercel.app/foods/${id}`,{withCredentials: true})
      .then((response) => {
        setFood(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
      });
  }, [id]);

  // Handle food request
  const handleRequest = () => {
    if (!user) {
      alert("Please login to make a request");
      navigate("/login"); 
      return;
    }

    const requestData = {
      foodName: food.foodName,
      foodImage: food.foodImage,
      foodId: food._id, 
      donatorEmail: food.donatorEmail,
      donatorName: food.donatorName,
      userEmail: user.email, 
      requestDate: new Date().toISOString(),
      pickupLocation: food.pickupLocation,
      expireDate: food.expireDate,
      additionalNotes: food.additionalNotes,
    };


    axios
      .post("https://food-hazel-three.vercel.app/foodData", requestData, {withCredentials: true}) 
      .then(() => {
      
        axios
          .put(`https://food-hazel-three.vercel.app/foods/${food._id}`, {
            ...food,
            foodStatus: "requested", 
          },{withCredentials: true})
          .then(() => {
            alert("Request Successful!");
            setShowModal(false); 
            navigate("/my-food-request"); 
          })
          .catch((error) => {
            console.error("Error updating food status:", error);
            alert("Failed to update food status.");
          });
      })
      .catch((error) => {
        console.error("Error requesting food:", error);
        alert("Failed to request food.");
      });
  };


  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto p-4 my-4 justify-center items-center">
      <Helmet>
        <title>FoodDetails</title>
      </Helmet>
      <img
        src={food.foodImage}
        alt={food.foodName}
        className="w-96 h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold">{food.foodName}</h2>
      <p>{food.additionalNotes}</p>
      <div>
        <p>
          <strong>Pickup Location:</strong> {food.pickupLocation}
        </p>
        <p>
          <strong>Expire Date:</strong> {food.expireDate}
        </p>
        <p>
          <strong>Donator:</strong> {food.donatorName} ({food.donatorEmail})
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Request
      </button>

      {/* Request Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-semibold mb-4">Request Food</h2>
            <div className="flex justify-center mb-4">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-44 h-44 object-cover rounded-full border-4 border-primary"
              />
            </div>
            <form>
              <div>
                <label>Food Name</label>
                <input type="text" value={food.foodName} readOnly />
              </div>
              <div>
                <label>Food ID</label>
                <input type="text" value={food._id} readOnly />
              </div>
              <div>
                <label>Donator Email</label>
                <input type="email" value={food.donatorEmail} readOnly />
              </div>
              <div>
                <label>Donator Name</label>
                <input type="text" value={food.donatorName} readOnly />
              </div>
              <div>
                <label>User Email</label>
                <input type="email" value={user ? user.email : ""} readOnly />
              </div>
              <div>
                <label>Request Date</label>
                <input
                  type="text"
                  value={new Date().toLocaleString()}
                  readOnly
                />
              </div>
              <div>
                <label>Additional Notes</label>
                <textarea
                  value={food.additionalNotes}
                  readOnly
                />
              </div>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={handleRequest}>
                Confirm Request
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
