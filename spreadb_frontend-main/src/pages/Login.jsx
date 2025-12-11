import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Eye, EyeOff, Apple } from "lucide-react";
import { toast } from "sonner"; // For displaying toast messages
import axios from "axios";
const Login = () => {
  const navigate = useNavigate(); // To navigate to another page

  // State for form fields and validation errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
      { email, password }
    );

    toast.success(res.data.message);

    // Save required fields for OTP page
    localStorage.setItem("Email", email);
    localStorage.setItem("authMode", "login");

    if (res.data.userId) {
      localStorage.setItem("UserId", res.data.userId);
    }

    if (res.data.role) {
      localStorage.setItem("Role", res.data.role);
    }

    navigate("/verify-email");

  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
  }
};


  // Simple validation function for email and password
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // Handle OAuth login button click (for Apple or Google)
  const handleOAuthLogin = (provider) => {
    toast.info(`${provider === "apple" ? "Apple" : "Google"} sign-in coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white border-b">
           <div className="flex items-center gap-6"  onClick={() => navigate("/")}>
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-14 w-auto" // or h-10, h-12 depending on your needs
            />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-700">Don't have an account?</span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:text-purple-500 font-medium transition-colors"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800">Log in to your account</h1>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-4">
            <button
              className="flex items-center justify-center w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              onClick={() => handleOAuthLogin("apple")}
            >
              <Apple className="w-5 h-5 mr-2" fill="currentColor" />
              Continue with Apple
            </button>
            <button
              className="flex items-center justify-center w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              onClick={() => handleOAuthLogin("google")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
           {/* <div className="space-y-2"> */}
  <div className="relative">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Username or Email"
      className={`w-full p-3 pl-12 border-2 rounded-lg ${
        errors.email ? "border-red-500" : "border-gray-300"
      }`}
    />

    {/* Email/User Icon */}
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </span>
  </div>

            {/* Password */}
            <div className="space-y-2">
  <div className="relative">
    {/* Password Input */}
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className={`w-full p-3 pl-12 border-2 rounded-lg ${
        errors.password ? "border-red-500" : "border-gray-300"
      }`}
    />

    {/* Password Icon (left) */}
   

    {/* Show/Hide Password Button (right) */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>

  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
</div>


            {/* Forgot Password Link */}
            <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-purple-600 hover:text-purple-500"
        >
          Forgot password?
        </button>
      </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-500"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
