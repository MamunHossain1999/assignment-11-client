import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  return (
    <div key={food.id} className="card bg-base-100 shadow-xl">
      <Helmet>
        <title>FoodCard</title>
      </Helmet>
      <figure>
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{food.foodName}</h2>
        <p>
          <strong>Food Quantity:</strong> {food.foodQuantity}
        </p>
        <p>
          <strong>Expire Date:</strong>{" "}
          {new Date(food.expireDate).toLocaleString()}
        </p>
        <p className="mt-2">
          <strong>Status:</strong> {food.foodStatus || "available"}
        </p>
        <div className=" ">
          <Link to={`/food/${food._id}`}>
            <button className="btn btn-primary  px-10">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
