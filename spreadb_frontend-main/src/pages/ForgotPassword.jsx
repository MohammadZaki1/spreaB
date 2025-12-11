import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; 
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res =await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgot-password`,
        {email}
      )
      toast.success(res.data.message);
      console.log("Reset link sent to:", email);
    }catch(err){
      toast.error(err.response?.data?.message || "Failed to send reset email");

    }
   

    // Show popup
    setShowPopup(true);
  };

  const handleOkClick = () => {
    setShowPopup(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      {/* MAIN PAGE */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Forgot Password
          </h2>

          <p className="text-gray-600 mb-6">
            Enter the email address or username associated with your Upwork account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Send Reset Link
            </button>
          </form>

          <p className="mt-6 text-center">
            <a href="/login" className="text-purple-600 hover:underline">
              Back to Login
            </a>
          </p>
        </div>
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-3">Check your email</h3>

            <p className="text-gray-700 mb-4">
              We've sent you an email with instructions to reset your password.
            </p>

            <p className="text-gray-700 mb-6">
              Please check your inbox and follow the steps.
            </p>

            <button
              onClick={handleOkClick}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
