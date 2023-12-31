import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { useContext } from "react";
import { useAuth } from "../AuthContext";

const BookingCompletionPage = () => {
  const { transportId } = useParams();
  const { authData } = useAuth(); // Assuming authToken includes userId
  const [transportDetails, setTransportDetails] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("1");
  const [passengerName, setPassengerName] = useState("");
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [price, setPrice] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };
  useEffect(() => {
    console.log("Auth Data: ", authData);
    console.log("Transport ID: ", transportId);
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch transport details
        const transportResponse = await axios.get(
          `http://localhost:3010/api/transports/${transportId}`
        );
        setTransportDetails(transportResponse.data);
        setPrice(transportResponse.data.price);

        // Fetch available seats (this endpoint needs to be implemented in your backend)
        const seatsResponse = await axios.get(
          `http://localhost:3010/api/transports/${transportId}/available-seats`
        );
        setAvailableSeats(seatsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [transportId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected Seat:", selectedSeat);
    console.log("Selected Class:", selectedClass);
    if (!authData || !authData.userId || !transportId) {
      console.error("Authentication data or transport ID is missing");
      return;
    }
    const reservationData = {
      passenger: authData.userId,
      passengerName,
      transport: transportId,
      seatNumber: selectedSeat,
      travelClass: selectedClass,
      travelDate: new Date().toISOString(),
      price, // Ensuring date format compatibility
    };
    console.log("Sending reservation data:", reservationData);
    try {
      const response = await axios.post(
        "http://localhost:3010/api/reservations",
        reservationData,
        { headers: { Authorization: `Bearer ${authData.token}` } }
      );
      // Handle successful booking
      setNotification("Booking successful!");
      setTimeout(() => {
        navigate("/"); // Redirect to home after showing notification
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center mt-12 border max-w-md mx-auto p-8 rounded-xl shadow-xl gap-4"
    >
      {notification && <p className="success-notification">{notification}</p>}
      <h1 className="text-2xl text-center mb-2 font-bold">
        Person booking information
      </h1>
      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        readOnly // Make the input read-only
      />
      <input
        type="text"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        placeholder="Passenger Name"
      />
      <label>
        Departure Date:{" "}
        {transportDetails &&
          format(new Date(transportDetails.departureTime), "PPP")}
      </label>
      {/* Dropdown or selection for seats */}
      <div className="seats-container">
        {availableSeats.map((seat) => (
          <button
            key={seat}
            type="button"
            className={`seat ${selectedSeat === seat ? "selected" : ""}`}
            onClick={() => handleSeatSelection(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      {/* Dropdown for travel class */}
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        {/* Additional classes as needed */}
      </select>

      <button className="bg-custom-blue" type="submit">
        Complete Booking
      </button>
    </form>
  );
};

export default BookingCompletionPage;
