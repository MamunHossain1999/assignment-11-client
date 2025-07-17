import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
      <Helmet>
        <title>FoodCard</title>
      </Helmet>

      {/* Image Section */}
      <figure className="h-64 overflow-hidden">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </figure>

      {/* Content Section */}
      <div className="p-4 bg-gray-100 text-black space-y-2">
        <h2 className="text-lg font-bold">{food.foodName}</h2>
        <p>
          <strong>Food Quantity:</strong> {food.foodQuantity}
        </p>
        <p>
          <strong>Expire Date:</strong>{" "}
          {new Date(food.expireDate).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {food.foodStatus || "available"}
        </p>

        <div className="pt-2">
          <Link to={`/food/${food._id}`}>
            <button className="btn bg-orange-300 border-none text-white hover:bg-orange-400 w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
