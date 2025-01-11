import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2"; // Import SweetAlert2

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://food-hazel-three.vercel.app/foods/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setFood(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch food details.",
        }); // SweetAlert error message
      });
  }, [id]);

  // Handle food request
  const handleRequest = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You must log in to make a request.",
      }); // SweetAlert warning
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
      .post("https://food-hazel-three.vercel.app/foodData", requestData, {
        withCredentials: true,
      })
      .then(() => {
        axios
          .put(
            `https://food-hazel-three.vercel.app/foods/${food._id}`,
            {
              ...food,
              foodStatus: "requested",
            },
            { withCredentials: true }
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Request Successful",
              text: "Your food request has been submitted.",
            }); // SweetAlert success message
            setShowModal(false);
            navigate("/my-food-request");
          })
          .catch((error) => {
            console.error("Error updating food status:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to update food status.",
            }); // SweetAlert error message
          });
      })
      .catch((error) => {
        console.error("Error requesting food:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to request food.",
        }); // SweetAlert error message
      });
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto p-4 my-4 justify-center items-center">
      <Helmet>
        <title>FoodDetails</title>
      </Helmet>
      <div className="w-full max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg space-y-6">
        {/* Food Image */}
        <div className="w-full">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Food Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">{food.foodName}</h2>
          <p className="text-gray-600">{food.additionalNotes}</p>

          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Pickup Location:</strong> {food.pickupLocation}
            </p>
            <p className="text-gray-700">
              <strong>Expire Date:</strong> {new Date(food.expireDate).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <strong>Donator:</strong> {food.donatorName} ({food.donatorEmail})
            </p>
          </div>
        </div>

        {/* Request Button */}
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary w-full py-3 mt-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Request
        </button>
      </div>

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
                <input type="text" value={new Date().toLocaleString()} readOnly />
              </div>
              <div>
                <label>Additional Notes</label>
                <textarea value={food.additionalNotes} readOnly />
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
