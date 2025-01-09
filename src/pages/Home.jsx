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
      .get("https://food-hazel-three.vercel.app/foods", {withCredentials: true})
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
  const displayedFoods = showAll ? foods : foods.slice(0, 8);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto bg-gray-100 dark:bg-gray-900">
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
    </div>
  );
};

export default Home;
