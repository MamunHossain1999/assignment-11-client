import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Waypoint } from "react-waypoint";
import FoodCard from "./FoodCard";
import { Helmet } from "react-helmet";

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedFoods, setSortedFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(6);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://food-hazel-three.vercel.app/foods", { withCredentials: true })
      .then((response) => {
        const availableFoods = response.data.filter(
          (food) => food.foodStatus === "available"
        );
        setFoods(availableFoods);
        setSortedFoods(availableFoods);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
        setLoading(false);
      });
  }, []);

  // Sort foods by expiry date
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-8">
      <Helmet>
        <title>Available Foods</title>
      </Helmet>
      
      {/* Search and button section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full sm:w-1/3 p-3"
          value={search}
          onChange={handleSearch}
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="btn btn-primary w-full sm:w-auto" onClick={handleSort}>
            Sort by Expiry Date
          </button>
          <button className="btn btn-secondary w-full sm:w-auto" onClick={toggleLayout}>
            {isThreeColumn ? "Two Column" : "Three Column"}
          </button>
        </div>
      </div>

      {/* Food grid layout */}
      <div
        className={`grid gap-4 pt-5 ${
          isThreeColumn
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {sortedFoods.slice(0, visibleIndex).map((food) => (
          <div
            key={food.id}
            className="transform hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-slate-700 animate__animated animate__fadeIn"
          >
            <FoodCard food={food} />
          </div>
        ))}
      </div>

      {/* Waypoint for infinite scrolling */}
      {visibleIndex < sortedFoods.length && <Waypoint onEnter={loadMore} />}
    </div>
  );
};

export default AvailableFood;
