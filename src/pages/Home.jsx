import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // স্টেট যা বলে কিভাবে ডেটা দেখানো হবে

  useEffect(() => {
    fetch('http://localhost:5000/foods')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);  // ডেটা লোড হয়ে গেলে লোডিং বন্ধ
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // ডেটা লোড না হলে লোডিং দেখাবে
  }

  // প্রথম ৬টি ডেটা দেখানোর জন্য স্লাইস
  const displayedData = showAll ? data : data.slice(0, 6);

  return (
    <div className='w-full'>
      <Carousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {displayedData.map((food) => (
          <div key={food.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={food.foodImage}  // food এর ছবি এখানে ব্যবহার হবে
                alt={food.foodName}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{food.foodName}</h2>
              <p>{food.additionalNotes}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      {!showAll && (
        <div className="text-center mt-4">
          <button 
            onClick={() => setShowAll(true)} 
            className="btn btn-primary">
            See All
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
