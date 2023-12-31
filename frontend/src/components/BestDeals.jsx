import React, { useState, useEffect } from "react";
import axios from "axios";

const BestDeals = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBestDeals = async () => {
    try {
      const response = await axios.get("http://localhost:3010/api/best-deals");
      return response.data;
    } catch (error) {
      console.error("Error fetching best deals:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getDeals = async () => {
      setIsLoading(true);
      try {
        const bestDeals = await fetchBestDeals();
        setDeals(bestDeals);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getDeals();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading best deals.</div>;

  return (
    <div>
      <h2>Best Travel Deals</h2>
      {deals.map((deal) => (
        <div key={deal.id}>
          <h3>{deal.destination}</h3>
          <p>{deal.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BestDeals;
