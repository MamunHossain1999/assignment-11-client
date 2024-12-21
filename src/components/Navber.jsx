

const Navber = () => {
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a href="/">Home</a></li>
              <li><a href="/available-foods">Available Foods</a></li>
              <li><a href="/add-food">Add Food</a></li>
              <li><a href="/manage-my-foods">Manage My Foods</a></li>
              <li><a href="/my-food-request">My Food Request</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Signup</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl hidden md:flex">Food Sharing</a>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/">Home</a></li>
            <li><a href="/available-foods">Available Foods</a></li>
            <li><a href="/add-food">Add Food</a></li>
            <li><a href="/manage-my-foods">Manage My Foods</a></li>
            <li><a href="/my-food-request">My Food Request</a></li>
          
          </ul>
        </div>
        
        <div className="navbar-end gap-3">
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
        </div>
      </div>
      
      
    );
};

export default Navber;