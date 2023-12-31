import React, { useState, useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3010/api/transports?type=Flight"
        );
        setFlights(response.data);
      } catch (err) {
        setError("Error fetching flights");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);
  const handleBookNow = (transportId) => {
    navigate(`/book/${transportId}`);
  };

  if (isLoading) return <p className="text-center">Loading flights...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Flights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flights.map((flight) => (
          <div key={flight._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{flight.company}</h2>
            <p>Departure: {format(new Date(flight.departureTime), "PPP")}</p>
            <p>Arrival: {format(new Date(flight.arrivalTime), "PPP")}</p>
            <p>Seats: {flight.totalSeats}</p>
            <p>Price: {flight.price}</p>
            <p>Destination: {flight.destination}</p>
            {/* Add more details as necessary */}
            <button
              onClick={() => handleBookNow(flight._id)}
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightsPage;
