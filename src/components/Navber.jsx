import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext); // Auth context for user and logout
  const navigate = useNavigate();

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
    <div className="navbar bg-gray-400 w-full mx-auto">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-[1]"
          >
            <li>
              <NavLink to="/" className="hover:bg-primary">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/available-foods" className="hover:bg-primary">
                Available Foods
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-food" className="hover:bg-primary">
                Add Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-my-foods" className="hover:bg-primary">
                Manage My Foods
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-food-request" className="hover:bg-primary">
                My Food Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:bg-primary">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:bg-primary">
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Food Sharing</a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink to="/" className="hover:bg-primary">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/available-foods" className="hover:bg-primary">
              Available Foods
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-food" className="hover:bg-primary">
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-my-foods" className="hover:bg-primary">
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-food-request" className="hover:bg-primary">
              My Food Request
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        <NavLink to="/register">
          <button className="btn">SignUp</button>
        </NavLink>
        <div className="flex items-center gap-4">
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
              className="btn bg-yellow-300 hover:bg-yellow-400 text-black dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-yellow-300 hover:bg-yellow-400 text-black dark:bg-yellow-500 dark:hover:bg-yellow-600"
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
