import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await fetch(
        `https://food-hazel-three.vercel.app/api/food-requests?email=${user.email}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch food requests");
      }
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Error: {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>MyFoodRequest</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        My Food Requests
      </h2>

      {users?.length === 0 ? (
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
              {users?.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
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

      {/* Mobile Responsive Section */}
      <div className="lg:hidden mt-6">
        <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">Mobile View</h3>
        {users?.map((request) => (
          <div key={request._id} className="border p-4 mb-4 shadow-lg rounded-lg bg-white">
            <h4 className="font-semibold text-lg text-gray-800">{request.donatorName}</h4>
            <p className="text-gray-600">Pickup Location: {request.pickupLocation}</p>
            <p className="text-gray-600">Expire Date: {request.expireDate}</p>
            <p className="text-gray-600">Request Date: {new Date(request.requestDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoodRequest;
