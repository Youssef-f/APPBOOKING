import mongoose from "mongoose";
import Reservation from "./models/Reservation.js"; // Adjust the path to your model
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URL);

async function updateReservationsWithAgency() {
  const agencyNames = ["Agency1", "Agency2", "Agency3"]; // Example agency names

  const reservations = await Reservation.find();

  for (const reservation of reservations) {
    // Assign a random agency from the list
    const randomAgency =
      agencyNames[Math.floor(Math.random() * agencyNames.length)];
    reservation.agency = randomAgency;

    await reservation.save();
  }

  console.log("All reservations updated with agency info");
}

updateReservationsWithAgency()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error("Error updating reservations:", err);
    mongoose.disconnect();
  });
