import axios from "axios";
import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SearchTravel = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBooking = (transportId) => {
    // Navigate to the booking completion page and pass the transport ID
    navigate(`/book/${transportId}`);
  };
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3010/api/search", {
        params: { destination, date },
      });

      // Fetch available seats for each transport
      const resultsWithSeats = await Promise.all(
        response.data.map(async (transport) => {
          const availableSeats = await fetchAvailableSeats(transport._id);
          return { ...transport, availableSeats };
        })
      );

      setSearchResults(resultsWithSeats);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchAvailableSeats = async (transportId) => {
    try {
      const response = await axios.get(
        `http://localhost:3010/api/transports/${transportId}/available-seats`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching available seats:", error);
      return []; // Return an empty array in case of error
    }
  };

  return (
    <>
      <section>
        <div className="search-travel-section flex mt-8   max-w-md mx-auto gap-4 items-center">
          <input
            type="text"
            placeholder="Destination"
            onChange={(e) => setDestination(e.target.value)}
          />
          <input type="date" onChange={(e) => setDate(e.target.value)} />

          <button onClick={handleSearch}>Search</button>
        </div>
      </section>
      <div>
        {/* Search form inputs and button */}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {searchResults && (
          <div className="grid grid-cols-3 m-2 mt-32 border py-5 px-5 rounded-xl">
            {searchResults.map((result) => (
              <div key={result._id}>
                <h2 className="text-2xl">{result.type}</h2>
                <p>{result.company}</p>
                <p>{format(new Date(result.departureTime), "PPPp")}</p>
                <p>{format(new Date(result.arrivalTime), "PPPp")}</p>
                <p>{result.origin}</p>
                <p>Available Seats: {result.availableSeats.length}</p>{" "}
                {/* Display available seats */}
                <button
                  onClick={() => handleBooking(result._id)}
                  className="mt-2"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchTravel;
