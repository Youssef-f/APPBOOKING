import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext"; // Adjust the path as per your setup
import { format } from "date-fns";
import { Navigate, useNavigate } from "react-router-dom";

const ManageBookingsPage = () => {
  const { authData } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      console.log("Fetching bookings...");
      try {
        const response = await axios.get(
          "http://localhost:3010/api/reservations",
          {
            headers: { Authorization: `Bearer ${authData.token}` },
            params: { userId: authData.userId },
          }
        );
        console.log("Bookings fetched:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings");
      } finally {
        setIsLoading(false);
      }
    };

    if (authData && authData.userId) {
      fetchBookings();
    }
  }, [authData]);

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;
  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(
        `http://localhost:3010/api/reservations/${bookingId}/cancel`,
        {
          headers: { Authorization: `Bearer ${authData.token}` },
        }
      );
      // Remove the booking from the state or refresh the bookings list
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };
  const handleEditBooking = (bookingId) => {
    navigate(`/edit-booking/${bookingId}`); // Navigate programmatically
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg">
              <p className="text-lg font-semibold">
                Destination: {booking.transport.destination}
              </p>
              <p>Date: {format(new Date(booking.travelDate), "PPP")}</p>
              <p>Seat: {booking.seatNumber}</p>
              <div className="flex justify-end mt-2 gap-1">
                <button
                  onClick={() => handleEditBooking(booking._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookingsPage;
