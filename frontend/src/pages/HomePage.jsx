import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchTravel from "../components/SearchTravel";

const HomePage = () => {
  const [bestDeals, setBestDeals] = useState([]);
  const [busiestRoutes, setBusiestRoutes] = useState([]);
  const [averagePrices, setAveragePrices] = useState([]);

  useEffect(() => {
    const fetchBestDeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3010/api/best-deals"
        );
        console.log(response.data._id);
        setBestDeals(response.data);
      } catch (error) {
        console.error("Error fetching best deals:", error);
      }
    };

    const fetchBusiestRoutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3010/api/routes/busiest"
        );
        setBusiestRoutes(response.data);
      } catch (error) {
        console.error("Error fetching busiest routes:", error);
      }
    };

    const fetchAveragePrices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3010/api/best-deals/averageprice"
        );
        setAveragePrices(response.data);
      } catch (error) {
        console.error("Error fetching average prices:", error);
      }
    };

    fetchBestDeals();
    fetchBusiestRoutes();
    fetchAveragePrices();
  }, []);
  const renderCard = (data, title, bgColor) => {
    return (
      <div className={`card shadow-lg rounded-lg ${bgColor} p-4 m-4`}>
        <div className="card-header text-xl font-bold mb-2">{title}</div>
        <div className="card-body">
          <p>Destination: {data._id.destination}</p>
          <p>Price: {data._id.transportType}</p>
          <p>
            Average Price:{" "}
            {data.averagePrice ? `$${data.averagePrice.toFixed(2)}` : "N/A"}
          </p>
          <p>Reservations Count: {data.count}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <SearchTravel />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center font-bold my-4">
          Travel Deals and Insights
        </h1>
        <div className="flex flex-wrap justify-center text-xl">
          {bestDeals.map((deal, index) =>
            renderCard(deal, "Best Deal", "bg-blue-200")
          )}
          <div className="flex flex-wrap justify-center text-xl">
            {busiestRoutes.map((route, index) =>
              renderCard(route, "Busiest Route", "bg-orange-200")
            )}
          </div>
          <div className="flex flex-wrap justify-center text-xl">
            {averagePrices.map((price, index) =>
              renderCard(price, "Average Price", "bg-green-200")
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
