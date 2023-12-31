import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdAirplaneTicket, MdMenu } from "react-icons/md";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { authData, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  console.log("Auth Data: ", authData);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-custom-orange flex justify-between py-3 px-4 items-center shadow-xl">
      <div className="flex gap-2 items-center text-2xl font-bold">
        <MdAirplaneTicket className="text-5xl" />
        EasyTravel
      </div>
      <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <MdMenu className="text-4xl" />
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col md:flex-row md:flex gap-5`}
      >
        {/* Navigation Links */}
        <div className="flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-500" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/flights"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-500" : ""
            }
          >
            Flights
          </NavLink>
          <NavLink
            to="/buses"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-500" : ""
            }
          >
            Buses
          </NavLink>
          <NavLink
            to="/trains"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-500" : ""
            }
          >
            Trains
          </NavLink>
          <NavLink
            to="/manage-bookings"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-500" : ""
            }
          >
            Manage Bookings
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-blue-500" : ""
            }
          >
            Analysis
          </NavLink>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col md:flex-row md:flex items-center gap-2`}
      >
        {authData ? (
          <div className="flex items-center gap-2">
            <span className="text-white">{authData.username}</span>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
