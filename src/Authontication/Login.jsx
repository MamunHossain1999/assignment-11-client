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
    <div className="hero bg-base-200 min-h-screen">
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse gap-6 p-4 sm:p-6">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-sm mx-auto p-6 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <h1 className="text-3xl lg:text-5xl font-bold">Login now!</h1>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered p-4"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered p-4 w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
              <label className="label">
                <button
                  type="button"
                  className="label-text-alt link link-hover text-blue-500"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary btn-wide">Login</button>
            </div>

            {/* Google Sign-In */}
            <div className="form-control mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-secondary btn-wide"
              >
                Google Login
              </button>
            </div>

            {/* Register Redirect */}
            <div className="form-control mt-6">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
