import React, { useState, useEffect } from "react";
import axios from "axios";

const AnalysisPage = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [averageReservations, setAverageReservations] = useState(null);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [reservationDistribution, setReservationDistribution] = useState(null);
  const [averageBookingLeadTime, setAverageBookingLeadTime] = useState(null);
  const [travelClassPreferences, setTravelClassPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(
            "http://localhost:3010/api/reservations/total-revenue-by-agency"
          ),
          axios.get(
            "http://localhost:3010/api/reservations/average-reservations-per-day"
          ),
          axios.get(
            "http://localhost:3010/api/reservations/most-popular-destinations"
          ),
          axios.get(
            "http://localhost:3010/api/reservations/reservation-distribution-by-date"
          ),
          axios.get(
            "http://localhost:3010/api/reservations/average-booking-lead-time"
          ),
          axios.get(
            "http://localhost:3010/api/reservations/travel-class-preferences"
          ),
        ]);

        setTotalRevenue(responses[0].data);
        console.log("Average Reservations Data:", responses[1].data);
        setAverageReservations(responses[1].data);
        setPopularDestinations(responses[2].data);
        setReservationDistribution(responses[3].data);
        setAverageBookingLeadTime(responses[4].data);
        setTravelClassPreferences(responses[5].data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Travel Analysis</h1>

      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Total Revenue by Agency</h2>
        {totalRevenue &&
          totalRevenue.map((agency) => (
            <p key={agency._id} className="mb-1">
              <span className="font-medium">{agency._id}:</span> $
              {agency.totalRevenue}
            </p>
          ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Average Reservations Per Day</h2>
        {averageReservations ? (
          typeof averageReservations === "number" ? (
            <p>{averageReservations.averageCount}</p> // If it's a single number
          ) : (
            <p>{averageReservations.averageCount}</p>
          ) // Replace 'someKey' with the actual key
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">
          Most Popular Destinations
        </h2>
        <ul>
          {popularDestinations.map((dest) => (
            <li key={dest._id} className="mb-1">
              <span className="font-medium">{dest._id}:</span> {dest.count}{" "}
              bookings
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Reservation Distribution by Date
        </h2>
        {reservationDistribution ? (
          Array.isArray(reservationDistribution) ? (
            reservationDistribution.map((item) => (
              <p key={item.date}>
                {item.date}: {item.count}
              </p>
            )) // Replace 'date' and 'count' with actual keys
          ) : (
            <p>{reservationDistribution.someKey}</p>
          ) // Replace 'someKey' with the actual key
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Average Booking Lead Time</h2>
        {averageBookingLeadTime ? (
          <p>{averageBookingLeadTime._id} days</p> // If it's a single value representing days
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Travel Class Preferences</h2>
        {travelClassPreferences ? (
          // Assuming it's an array of objects
          travelClassPreferences.map((preference) => (
            <p key={preference._id}>
              {preference._id}: {preference.count}
            </p>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;
