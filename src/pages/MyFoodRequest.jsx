import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/food-requests?email=${user.email}`)
        .then((response) => {
          setRequests(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching food requests:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        My Food Requests
      </h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border px-4 py-2 text-left">Donor Name</th>
                <th className="border px-4 py-2 text-left">Pickup Location</th>
                <th className="border px-4 py-2 text-left">Expire Date</th>
                <th className="border px-4 py-2 text-left">Request Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-100 transition-all duration-200">
                  <td className="border px-4 py-2">{request.donatorName}</td>
                  <td className="border px-4 py-2">{request.pickupLocation}</td>
                  <td className="border px-4 py-2">{request.expireDate}</td>
                  <td className="border px-4 py-2">
                    {new Date(request.requestDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;
