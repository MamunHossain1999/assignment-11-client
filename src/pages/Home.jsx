import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import Carousel from "./Carousel";
import { Helmet } from "react-helmet";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Fetch foods from backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/foods", {withCredentials: true})
      .then((response) => {
        setFoods(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (foodId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/food/${foodId}`);
    }
  };

  // Show only 6 foods at first
  const displayedFoods = showAll ? foods : foods.slice(0, 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>HomePage</title>
      </Helmet>
      <div className="relative">
        <div className="carousel w-full">
          <Carousel />
        </div>
      </div>

      {/* Featured Foods Section */}
      <div className="p-6 bg-white shadow-lg rounded-lg dark:bg-gray-900 mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center  text-gray-800">
          Featured Foods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedFoods.map((food) => (
            <div
              key={food._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105"
            >
              <figure>
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-gray-800">
                  {food.foodName}
                </h2>
                <p className="text-gray-600">{food.additionalNotes}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary text-white hover:bg-blue-700"
                    onClick={() => handleViewDetails(food._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Show All Button */}
        {!showAll && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-primary text-white hover:bg-blue-700"
            >
              See All
            </button>
          </div>
        )}
      </div>

      {/* Extra Section 1: Why Choose Us? */}
      <div className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg mb-6 shadow-lg text-white">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          Why Choose Us?
        </h3>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-center">
          We provide fresh and quality food. Your donations can make a big
          difference.
        </p>
      </div>

      {/* Extra Section 2: How It Works */}
      <div className="p-6 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500 rounded-lg mb-6 shadow-lg text-white">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          How It Works
        </h3>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-center">
          Just select the food items you wish to donate, and we will deliver
          them to the right place.
        </p>
      </div>
    </div>
  );
};

export default Home;
