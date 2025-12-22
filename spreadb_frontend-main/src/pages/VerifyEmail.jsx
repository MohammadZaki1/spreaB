// src/pages/VerifyEmail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OTPInput = React.forwardRef(({ value, onChange, autoFocus, id, disabled }, ref) => {
  return (
    <input
      id={id}
      ref={ref}
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/, ""))}
      disabled={disabled}
      className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 disabled:cursor-not-allowed"
      autoFocus={autoFocus}
    />
  );
});

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    setVerifying(true);
    try {
      const email = localStorage.getItem("Email");
      if (!email) {
        toast.error("Email not found. Please login again.");
        navigate("/login");
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-otp`, {
        email: email,
        otp: fullOtp,
      });

      // Save token and user info
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.userId || response.data._id);
      localStorage.setItem("Email", response.data.email || email);
      localStorage.setItem("Role", response.data.role);

      const authMode = localStorage.getItem("authMode"); // signup or login

      // Clear auth mode
      localStorage.removeItem("authMode");

      toast.success("Email verified successfully!");

      // Redirect based on auth mode and role
      if (authMode === "signup") {
        // Redirect to profile creation pages
        if (response.data.role === "Brand Owner") {
          navigate("/brandeditprofile");
        } else if (response.data.role === "Influencer") {
          navigate("/influencer/profile");
        } else {
          navigate("/profile-home");
        }
      } else if (authMode === "login") {
        // Redirect based on role
        if (response.data.role === "Brand Owner") {
          navigate("/brandeditprofile");
        } else if (response.data.role === "Influencer") {
          navigate("/influencereditprofile");
        } else {
          navigate("/");
        }
      } else {
        // Fallback: redirect to role-specific route
        navigate("/redirect");
      }

    } catch (err) {
      console.error('OTP verification error:', err);
      toast.error(err.response?.data?.message || "OTP verification failed. Please try again.");
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  // Resend OTP function
  const handleResend = async () => {
    setResending(true);
    try {
      const email = localStorage.getItem("Email");
      if (!email) {
        toast.error("Email not found. Please login again.");
        navigate("/login");
        return;
      }

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/resend-otp`, {
        email: email,
      });

      setSecondsLeft(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      toast.success("A new OTP has been sent to your email.");
    } catch (err) {
      console.error('Resend OTP error:', err);
      toast.error(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-8 px-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-white/20 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H8m8 4H8m6-8H8m12 8V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2h12z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-sm tracking-wide uppercase opacity-90">Verify Your Email</h2>
          <h1 className="text-2xl font-bold mt-1">Enter the OTP Code</h1>
          <p className="text-sm opacity-80 mt-2">
            Sent to {localStorage.getItem("Email") || "your email"}
          </p>
        </div>

        <div className="p-6 space-y-6 text-gray-700">
          <p className="text-center">Please enter the 6-digit One Time Password (OTP) sent to your email:</p>

          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(value) => handleOtpChange(index, value)}
                autoFocus={index === 0}
                ref={(el) => (inputRefs.current[index] = el)}
                disabled={verifying}
              />
            ))}
          </div>

          <p className="text-sm text-gray-600 text-center">
            This code will expire in{" "}
            <span className="font-semibold text-purple-600">{formatTime(secondsLeft)}</span>.
          </p>

          <button
            onClick={handleVerify}
            disabled={verifying || otp.join("").length !== 6}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {verifying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Now'
            )}
          </button>

          {/* Resend OTP section */}
          <div className="text-center">
            {secondsLeft > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP in {formatTime(secondsLeft)}
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="w-full py-3 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {resending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend OTP'
                )}
              </button>
            )}
          </div>

          {/* Back to login */}
          <div className="text-center pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;