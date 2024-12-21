import React from "react";
import { NavLink } from "react-router-dom";

const Navber = () => {
  return (
    <div className="w-full mx-auto navbar bg-gray-400">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
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
        <a className="btn btn-ghost text-xl ">Food Sharing</a>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal p-0">
          <li>
            <NavLink
              to="/"
              activeClassName="text-primary"
              className="hover:bg-primary"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/available-foods"
              activeClassName="text-primary"
              className="hover:bg-primary"
            >
              Available Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-food"
              activeClassName="text-primary"
              className="hover:bg-primary"
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-my-foods"
              activeClassName="text-primary"
              className="hover:bg-primary"
            >
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-food-request"
              activeClassName="text-primary"
              className="hover:bg-primary"
            >
              My Food Request
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <a href="/login">Login</a>
        <a href="/register">Signup</a>
      </div>
    </div>
  );
};

export default Navber;
