import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleSelectionCard } from "../components/RoleSelectionCard"; // Custom component for card display
import { Button } from "../components/ui/button"; // Custom Button component



const Index = () => {
  const navigate = useNavigate(); // React Router navigate hook to navigate to other pages
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role

  // Handle create account click event
  const handleCreateAccount = () => {
    if (selectedRole) {
      navigate(`/signup?role=${selectedRole}`); // Redirect to the signup page with selected role as a query param
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Logo */}
          <div className="flex items-center mx-5 my-5 gap-6">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-14 w-auto" // or h-10, h-12 depending on your needs
            /> </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="w-full max-w-2xl space-y-8">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground">
            Join as a Brand owner or Influencer
          </h1>

          {/* Role Selection Cards */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch">
            {/* Brand Role Card */}
            <RoleSelectionCard
              icon="brand"
              title="I'm a Brand owner, hiring for Influencers, Promoters"
              description=""
              selected={selectedRole === "Brand Owner"}
              onClick={() => setSelectedRole("Brand Owner")}
            />
            {/* Influencer Role Card */}
            <RoleSelectionCard
              icon="influencer"
              title="I'm an Influencer, Promoter, looking for work"
              description=""
              selected={selectedRole === "Influencer"}
              onClick={() => setSelectedRole("Influencer")}
            />
          </div>

          {/* Create Account Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              onClick={handleCreateAccount} // Trigger account creation on click
              disabled={!selectedRole} // Disable the button if no role is selected
              size="lg"
              className="px-8 font-semibold bg-purple-800 rounded-[100px] text-white text-[15px]"
            >
              Create Account
            </Button>

            {/* Login Link */}
            <p className="text-sm text-black">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")} // Navigate to login page
                className="text-purple-800 hover:text-primary/80 font-medium underline underline-offset-2 transition-colors"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
