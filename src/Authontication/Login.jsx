import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Sign-In Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-In Failed: " + err.message);
    }
  };

  // Email & Password Sign-In
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }
    setPasswordError("");

    try {
      await signIn(email, password);
      toast.success("Login Successful!");
      navigate(from || "/home");
    } catch (err) {
      console.error(err);
      toast.error("Login Failed: " + err.message);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    const email = document.querySelector('input[name="email"]').value;
    if (!email) {
      toast.error("Please enter your email to reset the password.");
      return;
    }
    try {
      await resetPassword(email);
      toast.success("Password reset email sent successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send password reset email: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <Helmet>
        <title>Login Page</title>
      </Helmet>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">
          Login to Your Account
        </h1>

        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-200 p-3"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-gray-200 p-3 pr-12"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline mt-2"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full btn bg-orange-400 border-none text-white hover:bg-orange-500"
          >
            Login
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Login with Google
          </button>

          {/* Register Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
