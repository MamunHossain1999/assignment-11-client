import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Waypoint } from "react-waypoint";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FoodCard from "./FoodCard";

const fetchAvailableFoods = async () => {
  const res = await axios.get("https://food-hazel-three.vercel.app/foods");
  return res.data.filter((food) => food.foodStatus === "available");
};

const AvailableFood = () => {
  const [search, setSearch] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(6);
  const [sortedFoods, setSortedFoods] = useState([]);

  const { data: foods = [], isLoading, isError, error } = useQuery({
    queryKey: ["availableFoods"],
    queryFn: fetchAvailableFoods,
  });

  // Initial set
  useEffect(() => {
    if (foods.length) {
      setSortedFoods(foods);
    }
  }, [foods]);

  // Handle sort
  const handleSort = () => {
    const sorted = [...sortedFoods].sort(
      (a, b) => new Date(a.expiredDate) - new Date(b.expiredDate)
    );
    setSortedFoods(sorted);
  };

  // Handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    const filtered = foods.filter((food) =>
      food.foodName.toLowerCase().includes(value.toLowerCase())
    );
    setSortedFoods(filtered);
  };

  const toggleLayout = () => setIsThreeColumn(!isThreeColumn);
  const loadMore = () => setVisibleIndex((prev) => prev + 6);

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
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>Available Foods</title>
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered bg-white border border-black text-black w-full sm:w-1/3 p-3"
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
              className="btn bg-orange-300 hover:bg-orange-400 border-none text-white text-base w-full sm:w-auto"
              onClick={toggleLayout}
            >
              {isThreeColumn ? "Switch to Four Column" : "Switch to Three Column"}
            </button>
          </div>
        </div>

        {/* Food Grid */}
        <div
          className={`grid gap-4 pt-5 ${
            isThreeColumn
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {sortedFoods.slice(0, visibleIndex).map((food) => (
            <div key={food._id}>
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
