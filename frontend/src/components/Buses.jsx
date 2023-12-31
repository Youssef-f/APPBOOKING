import React, { useState, useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";

const BusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3010/api/transports?type=Bus"
        );
        setBuses(response.data);
      } catch (err) {
        setError("Error fetching buses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuses();
  }, []);
  const handleBookNow = (transportId) => {
    navigate(`/book/${transportId}`);
  };

  if (isLoading) return <p className="text-center">Loading buses...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Buses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buses.map((bus) => (
          <div key={bus._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{bus.company}</h2>
            <p>Departure: {format(new Date(bus.departureTime), "PPP")}</p>
            <p>Arrival: {format(new Date(bus.arrivalTime), "PPP")}</p>
            <p>Seats: {bus.totalSeats}</p>
            <p>Price: {bus.price}</p>
            <p>Destination: {bus.destination}</p>
            {/* Add more details as necessary */}
            <button
              onClick={() => handleBookNow(bus._id)}
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

export default BusesPage;
