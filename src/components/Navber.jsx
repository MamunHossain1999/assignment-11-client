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
    <div className="navbar bg-gradient-to-r dark:bg-slate-800  from-blue-400 to-green-400 w-full mx-auto sticky top-0 z-50">
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-[1] ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
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

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="w-12 rounded-full hidden md:!block"
            src={companyLogo}
            alt="Company Logo"
          />
          <p className="text-4xl text-transparent hidden md:!block bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500">
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
      <div className="navbar-end gap-3">
        <div className="flex items-center gap-4">
          <div>
            <ThemeController />
          </div>
          {/* User Avatar */}
          <div className="w-14 h-14">
            {user && user.photoURL ? (
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt="User Avatar"
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border bg-gray-500 flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
            )}
          </div>

          {/* Login/Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn bg-[rgb(34,193,195)] hover:bg-[rgb(62,153,126)] text-black dark:bg-[rgb(233,30,99)] dark:hover:bg-[rgb(250,82,82)]"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-[rgb(72,61,139)] hover:bg-[rgb(103,194,115)] text-[rgb(255,255,255)]"
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
