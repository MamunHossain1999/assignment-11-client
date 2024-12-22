import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';

const FoodDetails = () => {
  const { user } = useContext(AuthContext);  
  const { id } = useParams();  
  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch food details by id (GET request)
    axios.get(`http://localhost:5000/foods/${id}`)
      .then(response => {
        setFood(response.data);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
      });
  }, [id]);  // Re-fetch food details when the id changes

  const handleRequest = () => {
    if (!user) {
      alert('Please login to make a request');
      return;
    }

    const requestData = {
      foodName: food.foodName,
      foodImage: food.foodImage,
      foodId: food.id,
      donatorEmail: food.donatorEmail,
      donatorName: food.donatorName,
      userEmail: user.email,  // User email from context
      requestDate: new Date().toISOString(),
      pickupLocation: food.pickupLocation,
      expireDate: food.expireDate,
      additionalNotes: food.additionalNotes,
    };

    // Add to My Request Foods and change status to 'requested'
    axios.post('http://localhost:5000/my-request-foods', requestData)
      .then(() => {
        // Update food status to requested
        axios.put(`http://localhost:5000/foods/${food.id}`, {
          ...food,
          foodStatus: 'requested',
        })
          .then(() => {
            alert('Request Successful!');
            setShowModal(false);  // Hide modal after successful request
          })
          .catch(error => {
            console.error('Error updating food status:', error);
          });
      })
      .catch(error => {
        console.error('Error requesting food:', error);
      });
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto p-4 border my-4 justify-center items-center">
      <img src={food.foodImage} alt={food.foodName} className="w-96 h-64 object-cover rounded-lg" />
      <h2 className="text-2xl font-bold">{food.foodName}</h2>
      <p>{food.additionalNotes}</p>
      <div>
        <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
        <p><strong>Expire Date:</strong> {food.expireDate}</p>
        <p><strong>Donator:</strong> {food.donatorName} ({food.donatorEmail})</p>
      </div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>Request</button>

      {/* Request Modal */}
      {showModal && (
        <div className="modal modal-open"> {/* Ensure 'modal-open' class is added */}
          <div className="modal-box">
            <h2 className="text-xl font-semibold mb-4">Request Food</h2>
            
            {/* Image section with top alignment */}
            <div className="flex justify-center mb-4">
              <img 
                src={food.foodImage} 
                alt={food.foodName} 
                className="w-44 h-44 object-cover rounded-full border-4 border-primary" 
              />
            </div>
            
            <form>
              <div>
                <label>Food Name</label>
                <input type="text" value={food.foodName} readOnly />
              </div>
              <div>
                <label>Food Id</label>
                <input type="text" value={food.id} readOnly />
              </div>
              <div>
                <label>Donator Email</label>
                <input type="email" value={food.donatorEmail} readOnly />
              </div>
              <div>
                <label>Donator Name</label>
                <input type="text" value={food.donatorName} readOnly />
              </div>
              <div>
                <label>User Email</label>
                <input type="email" value={user ? user.email : ''} readOnly />
              </div>
              <div>
                <label>Request Date</label>
                <input type="text" value={new Date().toLocaleString()} readOnly />
              </div>
              <div>
                <label>Additional Notes</label>
                <textarea 
                  value={food.additionalNotes} 
                  onChange={(e) => setFood({ ...food, additionalNotes: e.target.value })}
                />
              </div>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={handleRequest}>Request</button>
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
