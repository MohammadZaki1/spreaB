import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import ResetPassword from "./pages/ResetPassword.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/Profile-Home.jsx";
import ProfileHome from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/Faq.jsx";

import ScrollToTop from "./components/ui/ScrollToTop.jsx";

import HelpCenterSpreadB from "./pages/help.jsx";
import FAQCategory from "./pages/FAQcategory.jsx";
import SearchResults from "./pages/Searchresults.jsx";

import SuccessStories from "./pages/SuccessStories.jsx";
import AgreementPage from "./pages/AgreementPage.jsx";
import BrandOwnerAgreement from "./pages/BrandAgreement.jsx";

import FreeBusinessTools from './pages/FreeBusinessTools.jsx';
import Blogs from './pages/Blogs.jsx';

import Notification from "./pages/Notifications.jsx";
import PromotionForm from "./pages/PromotionForm.jsx"
import PromotionDisplay from "./pages/PromotionDisplay.jsx";
import MyPromotions from "./pages/MyPromotions.jsx";
import EditPromotion from "./pages/Editpromotion.jsx";
import InfluencerDashboard from "./pages/InfluencerDashboard.jsx";
import InfluencerPromotionDisplay from "./pages/InfluencerPromotionDisplay.jsx";
import AppliedPromotions from "./pages/AppliedPromotions.jsx"

import InfluencerProfileForm from "./pages/InfluencerProfileForm";

import BrandProfilePage from "./pages/Brand-profile.jsx";
import BrandEditProfileForm from "./pages/BrandEditProfile.jsx";

import InfluencerProfilePage from "./pages/Influencer-profile.jsx"
import InfluencerEditProfile from "./pages/InfluencerEditProfile.jsx";

import Careers from "./pages/Careers.jsx";
import { BrandProvider } from './context/BrandContext.jsx';
import { InfluencerProvider } from "./context/InfluencerContext.jsx";

// Initialize React Query
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* Fix 1: Corrected typo from InfulencerProvider to InfluencerProvider */}
      {/* Fix 2: Properly nested providers */}
      <BrandProvider>
        <InfluencerProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/free-tools" element={<FreeBusinessTools />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/help/category/:categoryId" element={<FAQCategory />} />
              <Route path="/help/search" element={<SearchResults />} />
              <Route path="/help" element={<HelpCenterSpreadB />} />
              <Route path="/agreement" element={<AgreementPage />} />
              <Route path="/brandowneragreement" element={<BrandOwnerAgreement />} />

              {/* Auth Routes */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Profile Routes */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile-home" element={<ProfileHome />} />
              <Route path="/notifications" element={<Notification />} />

              {/* Brand Routes */}
              <Route path="/brand-profile" element={<BrandProfilePage />} />
              <Route path="/brandeditprofile" element={<BrandEditProfileForm />} />

              {/* Influencer Routes - Fixed paths */}
              <Route path="/influencer-profile" element={<InfluencerProfilePage />} />
              <Route path="/influencereditprofile" element={<InfluencerEditProfile />} />
              
              {/* Other Influencer Routes */}
              <Route path="/influencer/profile" element={<InfluencerProfileForm />} />
              <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
              <Route path="/influencer/promotion/:id" element={<InfluencerPromotionDisplay />} />
              <Route path="/influencer/applied" element={<AppliedPromotions />} />

              {/* Promotion Routes */}
              <Route path="/my-promotions" element={<MyPromotions />} />
              <Route path="/promotion" element={<PromotionForm />} />
              <Route path="/promotion/:id" element={<PromotionDisplay />} />
              <Route path="/edit-promotion/:id" element={<EditPromotion />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </InfluencerProvider>
      </BrandProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;