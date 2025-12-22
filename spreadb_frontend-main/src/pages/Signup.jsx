import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

import { Eye, EyeOff, Apple } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

/* Reusable Input Field Component */
const InputField = ({ id, label, type = "text", value, onChange, error, placeholder, showToggle, toggleState, onToggle }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Input
        id={id}
        type={showToggle ? (toggleState ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pr-10 focus-visible:ring-purple-800 focus-visible:border-purple-800 ${error ? "border-red-700" : ""}`}
/>
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={toggleState ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {toggleState ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

/* Reusable Checkbox Component */
const CheckboxField = ({ id, checked, onChange, label, error }) => (
  <div className="flex items-start space-x-3">
    <Checkbox id={id} checked={checked} onCheckedChange={(val) => onChange(!!val)} 
    className="
    mt-1 
    border-black
    data-[state=checked]:bg-purple-800 
    data-[state=checked]:border-purple-800" />
    <Label htmlFor={id} className="text-sm font-normal leading-relaxed cursor-pointer">
      {label}
    </Label>
    {error && <p className="text-xs text-destructive pl-7">{error}</p>}
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "india",
    emailTips: true,
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    //else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    // Password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (!strongPasswordRegex.test(formData.password))
      newErrors.password =
        "Password must include uppercase, lowercase, number & special character.";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.country) newErrors.country = "Please select a country";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
      ...formData,
      role: role,  // <-- PERFECT
    });
    //  SAVE EMAIL + ROLE + USER DETAILS FOR OTP PAGE
    localStorage.setItem("Email", formData.email);
    localStorage.setItem("Role", role);
    localStorage.setItem("FirstName", formData.firstName);
    localStorage.setItem("LastName", formData.lastName);
    localStorage.setItem("authMode", "signup");

      toast.success(res.data.message);
      navigate("/verify-email");

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // const handleOAuthSignup = (provider) => {
  //   toast.info(`${provider === "apple" ? "Apple" : "Google"} sign-in coming soon!`);
  // };

  const handleOAuthSignup = () => {
    window.location.href = 
      `${process.env.REACT_APP_BACKEND_URL}/google?role=${role}`;
};


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 border-b border-border gap-4 sm:gap-0">
        <div 
          className="flex items-center gap-6 cursor-pointer"  
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-14 w-auto"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-foreground">
            {role === "Influencer" ? "Here to hire talent?" : "Looking for work?"}
          </span>
          <button
            onClick={() =>
              navigate(
                role === "Influencer"
                  ? "/signup?role=Brand%20Owner"
                  : "/signup?role=Influencer"
              )
            }
            className="text-purple-800 hover:text-primary/80 font-medium transition-colors"
          >
            {role === "Influencer"
              ? "Apply as Brand owner"
              : "Apply as Influencer"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
            {role === "Influencer" ? "Sign up to find work you love" : "Sign up to hire talent"}
          </h1>

          {/* OAuth Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="default"
              onClick={() => handleOAuthSignup("apple")}
              className="flex-1 bg-black text-white hover:bg-purple/90 font-medium rounded-full"
              size="lg"
            >
              <Apple className="w-7 h-7 mr-2" fill="currentColor" />
              Continue with Apple
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuthSignup("google")}
              className="flex-1 border-2 font-medium rounded-full"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button> */}
            <Button
              type="button"
              variant="outline"
              onClick={handleOAuthSignup}
              className="flex-1 border-2 font-medium rounded-full"
              size="lg"
            >
              Continue with Google
            </Button>

          </div>

          {/* Divider */}
        <div className="relative my-4">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-border"></div>
  </div>

  <div className="relative flex justify-center text-sm">
    <span className="px-4 bg-white text-muted-foreground z-10 font-semibold">
      or
    </span>
  </div>
</div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />
              <InputField
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
            </div>

            <InputField
              id="email"
              label="Work Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <InputField
              id="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              placeholder="Password (8 or more characters)"
              showToggle={true}
              toggleState={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              placeholder="Re-enter password"
              showToggle={true}
              toggleState={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <div className="space-y-4 pt-2">
              <CheckboxField
                id="emailTips"
                checked={formData.emailTips}
                onChange={(val) => setFormData({ ...formData, emailTips: val })}
                label="Send me emails with tips on finding talent that fits my needs"
              />
              <CheckboxField
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(val) => setFormData({ ...formData, agreeTerms: val })}
                label={
                  <>
                    Yes, I understand and agree to the{" "}
                    <a href="/terms" className="text-purple-800 hover:text-primary/80 underline underline-offset-2">
                      Terms and Conditions
                    </a>
                  </>
                }
                error={errors.agreeTerms}
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button type="submit" size="lg" className="px-8 font-semibold bg-purple-800 rounded-full text-white text-[15px]">
                Create Account
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-sm text-foreground text-center sm:text-left">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-800 hover:text-primary/80 font-medium underline underline-offset-2"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
