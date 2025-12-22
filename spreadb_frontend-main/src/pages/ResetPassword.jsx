import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchParams] =useSearchParams();
  const token=searchParams.get("token");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }
    try{
      const res =await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password?token=${token}`,
        {password,
         confirmPassword: confirm,
        }
      )
      toast.success(res.data.message);
      // Redirect to login after successful reset
      navigate("/login");
    }catch(err){
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Reset Your Password
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your new password below. Make sure it’s strong and secure.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NEW PASSWORD */}
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-200"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-200"
                placeholder="Re-enter new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-center">
          <a href="/login" className="text-purple-600 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
