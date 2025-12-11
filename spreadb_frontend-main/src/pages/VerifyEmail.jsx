import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const OTPInput = React.forwardRef(({ value, onChange, autoFocus, id }, ref) => {
  return (
    <input
      id={id}
      ref={ref}
      type="text"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/, ""))}
      className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black"
      autoFocus={autoFocus}
    />
  );
});
 
const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 OTP fields
  const [secondsLeft, setSecondsLeft] = useState(30);
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
 
    if (fullOtp.length !== 6)
      return alert("Please enter the complete 6-digit OTP.");
 
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-otp`, {
        email: localStorage.getItem("Email"),
        otp: fullOtp,
      });
 
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("Email", res.data.email);
      localStorage.setItem("Role", res.data.role);
    //    if (res.data.role === "Brand Owner") {
    //   navigate("/profile-home");
    // } else if (res.data.role === "Influencer") {
    //   navigate("/influencer/profile");
    // } else {
    //   navigate("/");
    // }
  
     const authMode = localStorage.getItem("authMode"); // signup or login

    if (authMode === "signup") {
      // Redirect to profile creation pages
      if (res.data.role === "Brand Owner") {
        navigate("/profile-home");
      } else if (res.data.role === "Influencer") {
        navigate("/influencer/profile");
      }
    } else if (authMode === "login") {
      // Redirect to edit profile pages
      if (res.data.role === "Brand Owner") {
        navigate("/brandeditprofile");
      } else if (res.data.role === "Influencer") {
        navigate("/influencereditprofile");
      }
    } else {
      navigate("/"); 
    }

  //localStorage.removeItem("authMode");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };
 
  // ✅ New: Resend OTP function
  const handleResend = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/resend-otp`, {
        email: localStorage.getItem("Email"),
      });
 
      setSecondsLeft(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
 
      toast.success("A new OTP has been sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };
 
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-black text-white text-center py-8 px-6">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
          <h2 className="text-sm tracking-wide uppercase">Thanks for Signing Up!</h2>
          <h1 className="text-2xl font-semibold">Verify Your E-Mail Address</h1>
        </div>
 
        <div className="p-6 space-y-6 text-gray-700">
          <p>Please use the following One Time Password (OTP):</p>
 
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <OTPInput
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(value) => handleOtpChange(index, value)}
                autoFocus={index === 0}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
 
          <p className="text-sm text-gray-600">
            This passcode will only be valid for the next{" "}
            <span className="font-semibold">{formatTime(secondsLeft)}</span>. If the passcode does
            not work, you can request a new verification link.
          </p>
 
          <button
            onClick={handleVerify}
            className="w-full py-3 bg-black text-white rounded-md hover:bg-black/20 transition"
          >
            Verify Now
          </button>
 
          {/* ✅ Show Resend OTP button when timer ends */}
          {secondsLeft === 0 && (
            <button
              onClick={handleResend}
              className="w-full py-3 border border-black rounded-md hover:bg-gray-100 transition"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default VerifyEmail;
 
 

