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
      .get("https://food-hazel-three.vercel.app/foods", {withCredentials: true})
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
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 mx-auto py-8">
      <Helmet>
        <title>AvailableFoods</title>
      </Helmet>
      {/* Search and button section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full sm:w-1/3"
          value={search}
          onChange={handleSearch}
        />
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button className="btn btn-primary" onClick={handleSort}>
            Sort by Expiry Date
          </button>
          <button className="btn btn-secondary" onClick={toggleLayout}>
            Change Layout
          </button>
        </div>
      </div>

      {/* Food grid layout */}
      <div
        className={`grid gap-4 pt-5 ${
          isThreeColumn
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-3"
        }`}
      >
        {sortedFoods.slice(0, visibleIndex).map((food) => (
          <div
            key={food.id}
            className="transform hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gray-200 p-4 rounded-lg shadow-lg animate__animated animate__fadeIn"
          >
            <FoodCard food={food} />
            <Waypoint onEnter={loadMore} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;
