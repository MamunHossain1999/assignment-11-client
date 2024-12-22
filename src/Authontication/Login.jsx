import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); // For navigation
  const location = useLocation();
  const from = location?.state || "/"; // Redirect back after login

  // Google SignIn
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("SignIn Successful");
      navigate(from || "/home", { replace: true }); // Redirect to home page if not from any page
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Email Password SignIn
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;

    // Validate password (uppercase and lowercase)
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);

    if (!hasUppercase || !hasLowercase) {
      setPasswordError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }

    try {
      // User Login
      await signIn(email, pass);
      toast.success("Signin Successful");
      navigate(from || "/home", { replace: true }); // Redirect to home page if not from any page
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Forgot Password
  const handleForgotPassword = async (email) => {
    if (!email) {
      toast.error("Please enter your email address to reset the password.");
      return;
    }
    try {
      await resetPassword(email);
      toast.success("Password reset email sent successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full pr-10"
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
                  onClick={() => {
                    const email = document.querySelector(
                      'input[name="email"]'
                    ).value;
                    handleForgotPassword(email);
                  }}
                >
                  Forgot password?
                </button>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>

            <div className="form-control mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-secondary"
              >
                Google Login
              </button>
            </div>
            <div className="form-control mt-6">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  register
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
