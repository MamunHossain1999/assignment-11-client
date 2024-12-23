import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser } = useContext(AuthContext); 
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isValidLength) {
      setError(
        "Password must have at least one uppercase, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      // Create User
      await createUser(email, password, name, photoURL);
      toast.success("Registration Successful!");
      navigate("/login"); 
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>

            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="Your Password"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>

            {/* Link to Login */}
            <div className="form-control mt-6">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
