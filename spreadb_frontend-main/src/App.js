// src/App.jsx
import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import ResetPassword from "./pages/ResetPassword.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import routing components
import {
  ProtectedRoute,
  PublicOnlyRoute,
  RoleBasedRedirect,
  ProfileSetupCheck
} from './components/routing';

// Import pages
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

import Profile from "./pages/Profile-Home.jsx";
import ProfileHome from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Managework from "./pages/Managework.jsx";
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
import HowToHire from './pages/HowToHire.jsx';

import Notification from "./pages/Notifications.jsx";
import PromotionForm from "./pages/PromotionForm.jsx"
import PromotionDisplay from "./pages/PromotionDisplay.jsx";
import EditPromotion from "./pages/Editpromotion.jsx";
import InfluencerDashboard from "./pages/InfluencerDashboard.jsx";
import InfluencerPromotionDisplay from "./pages/InfluencerPromotionDisplay.jsx";
//import FindPromotions from "./pages/FindPromotions.jsx"
import InfluencerProfileForm from "./pages/InfluencerProfileForm";
import Careers from "./pages/Careers.jsx";
import TalentMarketPlace from "./pages/TalentMarketPlace.jsx";
import ProjectCatalog from "./pages/ProjectCatalog.jsx";
import HireAnAgency from "./pages/HireAnAgency.jsx";
import Enterprise from "./pages/Enterprise.jsx";
import Wallet from "./pages/WalletPage.jsx";
import BrandOwnerDashboard from "./pages/BrandOwnerDashboard.jsx";

import BrandProfilePage from "./pages/Brand-profile.jsx";
import BrandEditProfileForm from "./pages/BrandEditProfile.jsx";
import InfluencerProfilePage from "./pages/Influencer-profile.jsx"
import InfluencerEditProfile from "./pages/InfluencerEditProfile.jsx";
import FindBrand from "./pages/FindBrandOwner.jsx"
import { BrandProvider } from './context/BrandContext.jsx';
import { InfluencerProvider } from "./context/InfluencerContext.jsx";
import FindCreators from "./pages/InfluencersList.jsx"
import FreelancerPlus from "./pages/FreelancerPlus";
import HowToFindPromotion from "./pages/HowToFindPromotion";
import CreatorSupport from "./pages/CreatorSupport.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import ReportIssue from "./pages/ReportIssue.jsx";
import ContactSupport from "./pages/ContactSupport.jsx";
import InfluencerPromotions from "./pages/InfluncerPromotions.jsx";
import InfluencerMessagesPage from './pages/InfluencerMessagesPage';
import BrandMessagesPage from './pages/BrandMessagesPage';
import SessionManager from './utils/sessionManager';
import TermsConditions from './pages/TermsConditions.jsx'
// Initialize React Query

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Session management and auto-logout
  React.useEffect(() => {
    const isLoggedIn = SessionManager.isAuthenticated();

    if (isLoggedIn) {
      // Initialize session management
      SessionManager.init();

      // Cleanup function
      return () => {
        SessionManager.cleanup();
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          {/* WRAP ALL ROUTES INSIDE PROVIDERS (ONLY ONCE) */}
          <BrandProvider>
            <InfluencerProvider>
              <Routes>
                {/* PUBLIC ROUTES (No authentication required) */}
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />

                {/* COMMON PUBLIC PAGES */}
                <Route path="/free-tools" element={<FreeBusinessTools />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/how-to-hire" element={<HowToHire />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/marketplace" element={<TalentMarketPlace />} />
                <Route path="/project-catalog" element={<ProjectCatalog />} />
                <Route path="/agency" element={<HireAnAgency />} />
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/help" element={<HelpCenterSpreadB />} />
                <Route path="/help/category/:categoryId" element={<FAQCategory />} />
                <Route path="/help/search" element={<SearchResults />} />
                <Route path="/freelancer-plus" element={<FreelancerPlus />} />
                <Route path="/how-to-find-promotion" element={<HowToFindPromotion />} />
                <Route path="/creator-support" element={<CreatorSupport />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/report-issue" element={<ReportIssue />} />
                <Route path="/contact-support" element={<ContactSupport />} />
                <Route path="/terms" element={<TermsConditions/>} />

                {/* PUBLIC ONLY ROUTES (Redirect if already logged in) */}
                <Route path="/signup" element={
                  <PublicOnlyRoute>
                    <Signup />
                  </PublicOnlyRoute>
                } />
                <Route path="/login" element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                } />
                <Route path="/verify-email" element={
                  <PublicOnlyRoute>
                    <VerifyEmail />
                  </PublicOnlyRoute>
                } />
                <Route path="/forgot-password" element={
                  <PublicOnlyRoute>
                    <ForgotPassword />
                  </PublicOnlyRoute>
                } />
                <Route path="/reset-password" element={
                  <PublicOnlyRoute>
                    <ResetPassword />
                  </PublicOnlyRoute>
                } />

                {/* ROLE-BASED REDIRECT ROUTE */}
                <Route path="/redirect" element={<RoleBasedRedirect />} />

                {/* PROTECTED ROUTES (Authentication required for all users) */}
                <Route path="/work" element={
                  <ProtectedRoute>
                    <Managework />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <Notification />
                  </ProtectedRoute>
                } />
                <Route path="/wallet" element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/profile-home" element={
                  <ProtectedRoute>
                    <ProfileHome />
                  </ProtectedRoute>
                } />

                {/* PROTECTED MESSAGE ROUTES */}
                <Route path="/brand/message" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <BrandMessagesPage />
                  </ProtectedRoute>
                } />
                <Route path="/influncer/message" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>
                    <InfluencerMessagesPage />
                  </ProtectedRoute>
                } />

                {/* PROTECTED AGREEMENT ROUTES */}
                <Route path="/agreement" element={
                  <ProtectedRoute>
                    <AgreementPage />
                  </ProtectedRoute>
                } />
                <Route path="/brandowneragreement" element={
                  <ProtectedRoute>
                    <BrandOwnerAgreement />
                  </ProtectedRoute>
                } />

                {/* BRAND OWNER PROTECTED ROUTES */}
                <Route path="/BrandOwnerDashboard" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <ProfileSetupCheck role="Brand Owner">
                      <BrandOwnerDashboard />
                    </ProfileSetupCheck>
                  </ProtectedRoute>
                } />
                <Route path="/brand-profile" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <ProfileSetupCheck role="Brand Owner">
                      <BrandProfilePage />
                    </ProfileSetupCheck>
                  </ProtectedRoute>
                } />
                <Route path="/brandeditprofile" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <BrandEditProfileForm />
                  </ProtectedRoute>
                } />
                <Route path="/creators" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <ProfileSetupCheck role="Brand Owner">
                      <FindCreators />
                    </ProfileSetupCheck>
                  </ProtectedRoute>
                } />

                {/* BRAND PROMOTION ROUTES */}
                {/* <Route path="/my-promotions" element={
                <ProtectedRoute allowedRoles={['Brand Owner']}>
                  <ProfileSetupCheck role="Brand Owner">
                    <MyPromotions />
                  </ProfileSetupCheck>
                </ProtectedRoute>
              } /> */}
                <Route path="/promotion" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <ProfileSetupCheck role="Brand Owner">
                      <PromotionForm />
                    </ProfileSetupCheck>
                  </ProtectedRoute>
                } />
                <Route path="/promotion/:id" element={
                  <ProtectedRoute>
                    <PromotionDisplay />
                  </ProtectedRoute>
                } />
                <Route path="/edit-promotion/:id" element={
                  <ProtectedRoute allowedRoles={['Brand Owner']}>
                    <ProfileSetupCheck role="Brand Owner">
                      <EditPromotion />
                    </ProfileSetupCheck>
                  </ProtectedRoute>
                } />

                {/* INFLUENCER PROTECTED ROUTES */}
                <Route path="/influencer-profile" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>

                    <InfluencerProfilePage />

                  </ProtectedRoute>
                } />
                <Route path="/influencereditprofile" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>
                    <InfluencerEditProfile />
                  </ProtectedRoute>
                } />
                <Route path="/influencer/brand" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>

                    <FindBrand />

                  </ProtectedRoute>
                } />
                <Route path="/influencer/profile" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>
                    <InfluencerProfileForm />
                  </ProtectedRoute>
                } />
                <Route path="/influencer/dashboard" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>

                    <InfluencerDashboard />

                  </ProtectedRoute>
                } />
                <Route path="/influencer/promotion" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>

                    <InfluencerPromotions />

                  </ProtectedRoute>
                } />
                <Route path="/influencer/promotion/:id" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>

                    <InfluencerPromotionDisplay />

                  </ProtectedRoute>
                } />
                <Route path="/influencer/applied" element={
                  <ProtectedRoute allowedRoles={['Influencer']}>

                {/* <AppliedPromotions />  */}

                  </ProtectedRoute>
                } />

                {/* NOT FOUND */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </InfluencerProvider>
          </BrandProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
