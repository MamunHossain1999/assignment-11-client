import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

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

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isValidLength) {
      setError(
        "Password must contain at least 1 uppercase, 1 lowercase and be 6+ characters."
      );
      return;
    }

    try {
      await createUser(email, password, name, photoURL);
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <Helmet>
        <title>Register Page</title>
      </Helmet>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">
          Create an Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full bg-gray-200 p-3"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input input-bordered w-full bg-gray-200 p-3"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full bg-gray-200 p-3"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full bg-gray-200 p-3 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn bg-orange-400 border-none text-white hover:bg-orange-500"
          >
            Register
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
