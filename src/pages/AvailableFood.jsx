import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FoodCard from './FoodCard';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedFoods, setSortedFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

const {id} = useParams();

  useEffect(() => {
    // Fetching available foods from the server
    axios.get('http://localhost:5000/foods')
      .then((response) => {
        // Filter foods where status is available
        const availableFoods = response.data.filter(food => food.foodStatus === "available");
        setFoods(availableFoods);
        setSortedFoods(availableFoods);  // Default: show all available foods
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching foods:', error);
        setLoading(false);
      });
  }, []);

  const handleSort = () => {
    // Sort foods by expiry date
    const sorted = [...sortedFoods].sort((a, b) => new Date(a.expiredDate) - new Date(b.expiredDate));
    setSortedFoods(sorted);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Filter foods based on search query
    const filteredFoods = foods.filter(food => 
      food.foodName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedFoods(filteredFoods);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-4">
      {/* Sorting Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Food"
          className="input input-bordered"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="btn btn-primary" onClick={handleSort}>
          Sort by Expiry Date
        </button>
      </div>

      {/* Foods Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedFoods.map(food => 
         <FoodCard food={food}></FoodCard>
        )}
      </div>
    </div>
  );
};

export default AvailableFood;
