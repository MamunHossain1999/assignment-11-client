import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => { // food প্রপস হিসেবে নিচ্ছে
    return (
        <div key={food.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{food.foodName}</h2>
              <p>{food.additionalNotes}</p>
              <div className="card-actions justify-end">
                <Link to={`/food/${food._id}`}>
                  <button className="btn btn-primary">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
        </div>
    );
};

export default FoodCard;
