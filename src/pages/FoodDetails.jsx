import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

// Fetch food details function
const fetchFoodDetails = async (id) => {
  const res = await axios.get(`https://food-hazel-three.vercel.app/foods/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

const FoodDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: food,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["foodDetails", id],
    queryFn: () => fetchFoodDetails(id),
  });

  const handleRequest = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You must log in to make a request.",
      });
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

    try {
      setLoading(true);
      await axios.post("https://food-hazel-three.vercel.app/foodData", requestData, {
        withCredentials: true,
      });

      await axios.put(
        `https://food-hazel-three.vercel.app/foods/${food._id}`,
        {
          ...food,
          foodStatus: "requested",
        },
        {
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Request Successful",
        text: "Your food request has been submitted.",
      });
      setShowModal(false);
      navigate("/my-food-request");
    } catch (err) {
      console.error("Request Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while requesting food.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load food details: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto md:py-8 bg-gray-50">
        <Helmet>
          <title>Food Details</title>
        </Helmet>

        <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg space-y-6 p-5">
          <div>
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-gray-800">
              {food.foodName}
            </h2>
            <p className="text-gray-600">{food.additionalNotes}</p>

            <p className="text-gray-700">
              <strong>Pickup Location:</strong> {food.pickupLocation}
            </p>
            <p className="text-gray-700">
              <strong>Expire Date:</strong>{" "}
              {new Date(food.expireDate).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <strong>Donator:</strong> {food.donatorName}
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="btn bg-orange-300 hover:bg-orange-400 w-full text-white border-none rounded-md transition"
            >
              Request
            </button>
          </div>
        </div>

        {/* Request Modal */}
        {showModal && (
          <div className="modal modal-open fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold text-black mb-4">
                Request Food
              </h2>

              <div className="flex justify-center mb-4">
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-52 object-cover rounded-md"
                />
              </div>

              <form className="space-y-3">
                {[
                  { label: "Food Name", value: food.foodName },
                  { label: "Food ID", value: food._id },
                  { label: "Donator Email", value: food.donatorEmail },
                  { label: "Donator Name", value: food.donatorName },
                  {
                    label: "User Email",
                    value: user ? user.email : "Not Logged In",
                  },
                  {
                    label: "Request Date",
                    value: new Date().toLocaleString(),
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="text-sm font-medium">{item.label}</label>
                    <input
                      type="text"
                      value={item.value}
                      readOnly
                      className="input input-bordered w-full bg-gray-100"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium">
                    Additional Notes
                  </label>
                  <textarea
                    value={food.additionalNotes}
                    readOnly
                    className="textarea textarea-bordered w-full bg-gray-100"
                  />
                </div>
              </form>

              <div className="modal-action mt-4 flex justify-end gap-2">
                <button
                  className="btn bg-orange-300 hover:bg-orange-400 text-white border-none"
                  onClick={handleRequest}
                  disabled={loading}
                >
                  {loading ? "Requesting..." : "Confirm Request"}
                </button>
                <button
                  className="btn btn-error text-white"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
