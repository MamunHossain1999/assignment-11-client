import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import ThemeController from "../themeControl/ThemeCortroller";
import companyLogo from "../assets/foodCompanyLogo.png";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
      });
  };

  return (
    <div className="w-full bg-gray-400 dark:bg-slate-800 sticky top-0 z-50 bg-opacity-40 backdrop-blur-md">
      <div className="navbar w-11/12 mx-auto text-white p-4">
        
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          
          {/* Dropdown for Mobile */}
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white bg-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              className={`absolute left-0 top-14 w-52 p-2 shadow-lg bg-gray-500 rounded-box z-10 ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <NavLink
                  to="/"
                  className="hover:bg-indigo-600 hover:text-white"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/available-foods"
                  className="hover:bg-indigo-600 hover:text-white"
                >
                  Available Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-food"
                  className="hover:bg-indigo-600 hover:text-white"
                >
                  Add Food
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manage-my-foods"
                  className="hover:bg-indigo-600 hover:text-white"
                >
                  Manage My Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-food-request"
                  className="hover:bg-indigo-600 hover:text-white"
                >
                  My Food Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="hover:bg-indigo-600 hover:text-white"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img
              className="w-12 rounded-full hidden md:block"
              src={companyLogo}
              alt="Company Logo"
            />
            <p className="text-3xl text-transparent hidden md:block bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500">
              Food Sharing
            </p>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <NavLink to="/" className="hover:bg-indigo-600 hover:text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/available-foods"
                className="hover:bg-indigo-600 hover:text-white"
              >
                Available Foods
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-food"
                className="hover:bg-indigo-600 hover:text-white"
              >
                Add Food
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manage-my-foods"
                className="hover:bg-indigo-600 hover:text-white"
              >
                Manage My Foods
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-food-request"
                className="hover:bg-indigo-600 hover:text-white"
              >
                My Food Request
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-4">
          <ThemeController />

          {/* User Avatar */}
          {user ? (
            <div className="flex items-center gap-4">
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="btn bg-red-500 border-none w-16 h-8 hover:bg-red-400 text-black dark:bg-pink-500 dark:hover:bg-pink-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-primary hover:bg-purple-600 border-none text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
