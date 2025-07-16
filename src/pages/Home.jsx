import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import Carousel from "./Carousel";
import { Helmet } from "react-helmet";

const fetchFoods = async () => {
  const res = await axios.get("http://localhost:5000/foods");
  return res.data;
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAll, setShowAll] = React.useState(false);

  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  console.log(foods);
  const handleViewDetails = (foodId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/food/${foodId}`);
    }
  };

  const displayedFoods = showAll ? foods : foods.slice(0, 8);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-300">
      <Helmet>
        <title>HomePage</title>
      </Helmet>

      <div className="relative">
        <div className="carousel w-full">
          <Carousel />
        </div>
      </div>

      {/* Featured Foods Section */}
      <div className="container mx-auto pb-7">
        <h2 className="text-3xl font-bold mb-3 text-center text-black">
          Featured Foods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedFoods?.map((food) => (
            <div key={food._id} className="card bg-base-100 shadow-md ">
              <figure>
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-64 object-cover ease-in-out hover:scale-105  transform transition duration-300 "
                />
              </figure>
              <div className="card-body bg-white ">
                <h2 className="card-title text-lg font-semibold text-gray-800">
                  {food.foodName}
                </h2>
                <p className="text-gray-600">{food.additionalNotes}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn bg-orange-300 border-none text-white hover:bg-orange-400"
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
          <div className="text-center py-4">
            <button
              onClick={() => setShowAll(true)}
              className="btn bg-orange-300 border-none text-white hover:bg-orange-400"
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
