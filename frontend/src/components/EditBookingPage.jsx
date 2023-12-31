import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBookingPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3010/api/reservations/${bookingId}`
        );
        setBookingDetails(response.data);
        const seatsResponse = await axios.get(
          `http://localhost:3010/api/transports/${response.data.transport._id}/available-seats`
        );
        setAvailableSeats([...seatsResponse.data, response.data.seatNumber]);
        setSelectedSeat(response.data.seatNumber);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3010/api/reservations/${bookingId}`,
        { seatNumber: selectedSeat },
        { headers: { Authorization: `Bearer yourAuthToken` } }
      );
      navigate("/manage-bookings");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Booking</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {availableSeats.map((seat) => (
              <button
                key={seat}
                onClick={() => handleSeatSelection(seat)}
                className={`py-2 px-4 border rounded-lg ${
                  selectedSeat === seat
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {seat}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBookingPage;
