import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedFoods, setSortedFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const handleViewDetails = (foodId) => {
    // Navigate to the food details page
    navigate(`/food-details/${foodId}`);
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
        {sortedFoods.map(food => (
          <div key={food.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{food.foodName}</h2>
              <p>{food.additionalNotes}</p>
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleViewDetails(food.id)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFood;
