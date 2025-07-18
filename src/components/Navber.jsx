import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

import companyLogo from "../assets/foodCompanyLogo.png";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logout handler
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
      });
  };

  // NavLink active style
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-400 font-semibold px-3 py-2"
      : "hover:text-orange-500 px-3 py-2";

  return (
    <div className="w-full bg-green-900 sticky top-0 z-50">
      <div className="navbar container mx-auto text-white p-4">
        {/* Logo */}
        <div className="navbar-start flex items-center gap-2">
          <img
            className="w-12 rounded-full"
            src={companyLogo}
            alt="Company Logo"
          />
          <p className="text-2xl font-bold text-transparent hidden md:block bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500">
            Food Sharing
          </p>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 space-x-1">
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/available-foods" className={navLinkStyle}>
                Available Foods
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-food" className={navLinkStyle}>
                Add Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-my-foods" className={navLinkStyle}>
                Manage My Foods
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-food-request" className={navLinkStyle}>
                My Food Request
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-4">
          {/* Theme Toggle - optional */}
          {/* <ThemeController /> */}

          {/* Mobile Menu Button */}
          <div className="dropdown lg:hidden">
            <button
              className="btn btn-ghost text-white"
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

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <ul className="absolute right-4 top-14 bg-gray-600 text-white p-4 rounded-lg space-y-2 z-50 w-52">
                <li>
                  <NavLink to="/" className={navLinkStyle}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/available-foods" className={navLinkStyle}>
                    Available Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/add-food" className={navLinkStyle}>
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/manage-my-foods" className={navLinkStyle}>
                    Manage My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-food-request" className={navLinkStyle}>
                    My Food Request
                  </NavLink>
                </li>

                {/* Mobile Login/Logout */}
                {user ? (
                  <li className="flex flex-col gap-2 items-start">
                    <img
                      referrerPolicy="no-referrer"
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <button
                      onClick={handleLogout}
                      className="btn bg-red-500 border-none hover:bg-red-400 text-white w-full"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className="btn bg-orange-300 hover:bg-orange-400 border-none text-white w-full"
                    >
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Desktop Login/Logout */}
          {user ? (
            <div className="hidden lg:flex items-center gap-4">
              <img
                referrerPolicy="no-referrer"
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="btn bg-red-500 border-none hover:bg-red-400 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-orange-300 hover:bg-orange-400 border-none text-white hidden lg:flex"
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
