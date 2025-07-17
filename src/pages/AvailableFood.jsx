import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Waypoint } from "react-waypoint";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FoodCard from "./FoodCard";

const fetchAvailableFoods = async () => {
  const res = await axios.get("http://localhost:5000/foods", {
    // withCredentials: true,
  });
  // Filter only available foods
  return res.data.filter((food) => food.foodStatus === "available");
};

const AvailableFood = () => {
  const [search, setSearch] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(6);

  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availableFoods"],
    queryFn: fetchAvailableFoods,
  });

  console.log(foods);
  const [sortedFoods, setSortedFoods] = useState([]);

  // Sort on mount
  React.useEffect(() => {
    if (foods.length) {
      setSortedFoods(foods);
    }
  }, [foods]);

  // Sort by expiry date
  const handleSort = () => {
    const sorted = [...sortedFoods].sort(
      (a, b) => new Date(a.expiredDate) - new Date(b.expiredDate)
    );
    setSortedFoods(sorted);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    const filteredFoods = foods.filter((food) =>
      food.foodName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedFoods(filteredFoods);
  };

  const toggleLayout = () => {
    setIsThreeColumn(!isThreeColumn);
  };

  const loadMore = () => {
    setVisibleIndex((prevIndex) => prevIndex + 6);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load foods: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8 bg-gray-100">
        <Helmet>
          <title>Available Foods</title>
        </Helmet>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered bg-gray-100 border border-black text-black w-full sm:w-1/3 p-3"
            value={search}
            onChange={handleSearch}
          />

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              className="btn bg-orange-300 hover:bg-orange-400 border-none text-white text-base w-full sm:w-auto"
              onClick={handleSort}
            >
              Sort by Expiry Date
            </button>
            <button
              className="btn w-full sm:w-auto"
              onClick={toggleLayout}
            >
              {isThreeColumn ? "Four Column" : "Three Column"}
            </button>
          </div>
        </div>

        {/* Food Grid */}
        <div
          className={`grid gap-4 pt-5 ${
            isThreeColumn
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {sortedFoods.slice(0, visibleIndex).map((food) => (
            <div
              key={food._id}
              className="transform hover:scale-105 transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <FoodCard food={food} />
            </div>
          ))}
        </div>

        {/* Infinite Scroll */}
        {visibleIndex < sortedFoods.length && <Waypoint onEnter={loadMore} />}
      </div>
    </div>
  );
};

export default AvailableFood;
