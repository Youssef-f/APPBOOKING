import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/homePage";
import BookingCompletionPage from "./components/BookingCompletionPage";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { AuthProvider } from "./AuthContext";
import ManageBookingsPage from "./components/ManageBookingPage";
import EditBookingPage from "./components/EditBookingPage";
import FlightsPage from "./components/Flights";
import BusesPage from "./components/Buses";
import TrainsPage from "./components/Trains";
import AnalysisPage from "./components/AnalysisPage";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="/book/:transportId"
            element={<BookingCompletionPage />}
          />
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-bookings" element={<ManageBookingsPage />} />
          <Route
            path="/edit-booking/:bookingId"
            element={<EditBookingPage />}
          />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/buses" element={<BusesPage />} />
          <Route path="/trains" element={<TrainsPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
