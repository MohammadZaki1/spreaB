import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useNotifications from "../hooks/useNotifications";
import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  BarChart3,
  Bell,
  Wallet,
  ChevronDown,
  User,
  LogOut,
  Building2,
  Mic,
  Sparkles,
  Target,
  DollarSign,
  Settings,
  Menu,
  X,
  Crown,
  Globe,
  HelpCircle
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

// --- Nav Item Component ---
const NavItem = ({ to, icon: Icon, label, badge, isActive }) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center gap-2 px-3 py-2.5 rounded-md transition-colors group w-full lg:w-auto lg:flex-col lg:gap-1 lg:px-2 lg:py-1.5 ${
        isActive 
          ? 'bg-purple-50 text-purple-600' 
          : 'hover:bg-purple-50 text-gray-600 hover:text-purple-600'
      }`}
    >
      <div className="relative">
        <Icon className={`h-5 w-5 transition-colors ${
          isActive ? 'text-purple-600' : 'text-gray-600 group-hover:text-purple-600'
        }`} />
        {badge > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
      <span className={`text-sm lg:text-xs transition-colors whitespace-nowrap ${
        isActive ? 'text-purple-600 font-medium' : 'text-gray-600 group-hover:text-purple-600'
      }`}>
        {label}
      </span>
    </Link>
  );
};

// --- Brand Owner Profile Dropdown ---
const BrandProfileDropdown = ({ mobile, onItemClick }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("Email");
    localStorage.removeItem("Role");
    localStorage.removeItem("authMode");
    navigate("/");
    window.location.reload();
    if (onItemClick) onItemClick();
  };

  if (mobile) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-12 w-12 border-2 border-purple-100 bg-gradient-to-br from-purple-500 to-pink-500">
            <Building2 className="h-6 w-6 text-white" />
            <AvatarFallback className="bg-purple-100 text-purple-600">BR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-purple-900">Brand Dashboard</p>
            <p className="text-sm text-purple-600">Brand Owner</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Crown className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-purple-600">Premium Account</span>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="space-y-1">
          <Link to="/brand-profile" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <User className="mr-3 h-5 w-5" /> Brand Profile
            </div>
          </Link>

          <Link to="/brandeditprofile" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Settings className="mr-3 h-5 w-5" /> Edit Profile
            </div>
          </Link>

          <Link to="/BrandOwnerDashboard" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Home className="mr-3 h-5 w-5" /> Dashboard
            </div>
          </Link>

          <Link to="/work" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Target className="mr-3 h-5 w-5" /> Promotions
            </div>
          </Link>

          <Link to="/brand/message" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <MessageSquare className="mr-3 h-5 w-5" /> Messages
            </div>
          </Link>

          <Link to="/wallet" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Wallet className="mr-3 h-5 w-5" /> Wallet
            </div>
          </Link>
        </div>

        <Separator className="my-2" />

        <div 
          onClick={handleLogout}
          className="cursor-pointer py-3 px-4 hover:bg-red-50 text-red-600 hover:text-red-700 flex items-center rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex flex-col items-center gap-1 px-2 py-1.5 rounded-md hover:bg-purple-50 transition-colors group min-w-[70px]">
          <Building2 className="h-5 w-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          <div className="flex items-center gap-0.5">
            <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors">
              Brand
            </span>
            <ChevronDown className="h-3 w-3 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[280px] bg-white shadow-xl border border-purple-200">
        <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <Avatar className="h-14 w-14 bg-gradient-to-br from-purple-500 to-pink-500">
            <Building2 className="h-7 w-7 text-white" />
            <AvatarFallback className="bg-purple-100 text-purple-600">BR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-purple-900">Brand Dashboard</p>
            <p className="text-sm text-purple-600 font-medium">Brand Owner</p>
            <div className="flex items-center gap-1 mt-1">
              <Crown className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-purple-600">Premium Account</span>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="border-purple-200" />

        <div className="p-2">
          <Link to="/brand-profile">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <User className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Brand Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/brandeditprofile">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Settings className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Edit Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/BrandOwnerDashboard">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Home className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Dashboard</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/work">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Target className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Promotions</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/brand/message">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <MessageSquare className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Messages</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/wallet">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Wallet className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Wallet</span>
            </DropdownMenuItem>
          </Link>
        </div>

        <DropdownMenuSeparator className="border-purple-200" />

        <div className="p-2">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer py-3 px-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 hover:text-red-700 flex items-center transition-all duration-200 group"
          >
            <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- Influencer Profile Dropdown ---
const InfluencerProfileDropdown = ({ mobile, onItemClick }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("Email");
    localStorage.removeItem("Role");
    localStorage.removeItem("authMode");
    navigate("/");
    window.location.reload();
    if (onItemClick) onItemClick();
  };

  if (mobile) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-12 w-12 border-2 border-purple-100 bg-gradient-to-br from-purple-500 to-pink-500">
            <Mic className="h-6 w-6 text-white" />
            <AvatarFallback className="bg-purple-100 text-purple-600">CR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-purple-900">Creator Dashboard</p>
            <p className="text-sm text-purple-600">Influencer</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-purple-600">Verified Creator</span>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="space-y-1">
          <Link to="/influencer-profile" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <User className="mr-3 h-5 w-5" /> My Profile
            </div>
          </Link>

          <Link to="/influencereditprofile" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Settings className="mr-3 h-5 w-5" /> Edit Profile
            </div>
          </Link>

          <Link to="/influencer/dashboard" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Home className="mr-3 h-5 w-5" /> Dashboard
            </div>
          </Link>

          <Link to="/influencer/promotion" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <Sparkles className="mr-3 h-5 w-5" /> Promotion
            </div>
          </Link>

          <Link to="/influncer/message" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <MessageSquare className="mr-3 h-5 w-5" /> Messages
            </div>
          </Link>

          <Link to="/wallet" onClick={onItemClick}>
            <div className="cursor-pointer py-3 px-4 hover:bg-purple-50 text-gray-700 hover:text-purple-600 flex items-center rounded-md">
              <DollarSign className="mr-3 h-5 w-5" /> Earnings
            </div>
          </Link>
        </div>

        <Separator className="my-2" />

        <div 
          onClick={handleLogout}
          className="cursor-pointer py-3 px-4 hover:bg-red-50 text-red-600 hover:text-red-700 flex items-center rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex flex-col items-center gap-1 px-2 py-1.5 rounded-md hover:bg-purple-50 transition-colors group min-w-[70px]">
          <Mic className="h-5 w-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          <div className="flex items-center gap-0.5">
            <span className="text-xs text-gray-600 group-hover:text-purple-600 transition-colors">
              Creator
            </span>
            <ChevronDown className="h-3 w-3 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[280px] bg-white shadow-xl border border-purple-200">
        <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <Avatar className="h-14 w-14 bg-gradient-to-br from-purple-500 to-pink-500">
            <Mic className="h-7 w-7 text-white" />
            <AvatarFallback className="bg-purple-100 text-purple-600">CR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-purple-900">Creator Dashboard</p>
            <p className="text-sm text-purple-600 font-medium">Influencer</p>
            <div className="flex items-center gap-1 mt-1">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              <span className="text-xs text-purple-600">Verified Creator</span>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="border-purple-200" />

        <div className="p-2">
          <Link to="/influencer-profile">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <User className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">My Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/influencereditprofile">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Settings className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Edit Profile</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/influencer/dashboard">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Home className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Dashboard</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/influencer/promotion">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <Sparkles className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Promotion</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/influncer/message">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <MessageSquare className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Messages</span>
            </DropdownMenuItem>
          </Link>

          <Link to="/wallet">
            <DropdownMenuItem className="cursor-pointer py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 flex items-center transition-all duration-200 group">
              <DollarSign className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              <span className="font-medium">Earnings</span>
            </DropdownMenuItem>
          </Link>
        </div>

        <DropdownMenuSeparator className="border-purple-200" />

        <div className="p-2">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer py-3 px-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 hover:text-red-700 flex items-center transition-all duration-200 group"
          >
            <LogOut className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
            <span className="font-medium">Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- Mobile Menu Link Item ---
const MobileMenuItem = ({ to, icon: Icon, label, onClick, badge }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-purple-50 transition-colors text-gray-700"
  >
    {Icon && <Icon className="h-5 w-5 text-gray-600" />}
    <span className="flex-1">{label}</span>
    {badge > 0 && (
      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
        {badge > 99 ? '99+' : badge}
      </span>
    )}
  </Link>
);

// --- Header Component ---
const Header = () => {
  const [role, setRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const { counts, refreshCounts } = useNotifications();
  
  useEffect(() => {
    const userRole = localStorage.getItem("Role");
    setRole(userRole);
    
    if (userRole) {
      refreshCounts();
    }
  }, [location, refreshCounts]);

  const isBrandOwner = role === "Brand Owner";
  const isInfluencer = role === "Influencer";

  const brandNavItems = [
    { to: "/home", icon: Home, label: "Home", badge: 0, isActive: location.pathname === "/home" },
    { to: "/BrandOwnerDashboard", icon: BarChart3, label: "Dashboard", badge: 0, isActive: location.pathname === "/BrandOwnerDashboard" },
    { to: "/creators", icon: Users, label: "Creators", badge: 0, isActive: location.pathname === "/creators" },
    { to: "/work", icon: Briefcase, label: "Promotions", badge: counts.promotions, isActive: location.pathname === "/work" },
    { to: "/brand/message", icon: MessageSquare, label: "Messages", badge: counts.messages, isActive: location.pathname === "/brand/message" },
    { to: "/notifications", icon: Bell, label: "Alerts", badge: counts.notifications, isActive: location.pathname === "/notifications" },
    { to: "/wallet", icon: Wallet, label: "Wallet", badge: 0, isActive: location.pathname === "/wallet" },
  ];

  const influencerNavItems = [
    { to: "/home", icon: Home, label: "Home", badge: 0, isActive: location.pathname === "/home" },
    {  to: "/influencer/dashboard", icon: BarChart3, label: "Dashboard", badge: 0, isActive: location.pathname === "/influencer/dashboard" },
    { to: "/influencer/brand", icon: Building2, label: "Brands", badge: 0, isActive: location.pathname === "/influencer/brand" },
    { to: "/influencer/promotion", icon: Briefcase, label: "Promotions", badge: counts.promotions, isActive: location.pathname === "/influencer/promotion" },
    { to: "/influncer/message", icon: MessageSquare, label: "Messages", badge: counts.messages, isActive: location.pathname === "/influncer/message" },
    { to: "/notifications", icon: Bell, label: "Alerts", badge: counts.notifications, isActive: location.pathname === "/notifications" },
    { to: "/wallet", icon: Wallet, label: "Wallet", badge: 0, isActive: location.pathname === "/wallet" },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setShowMobileSearch(false);
  };

  return (
    <>
      <style>{`
        .no-border-logo {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .no-border-logo img {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      
      <header className="sticky top-0 left-0 right-0 z-50 border-b bg-white border-gray-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Left Section: Logo + Navigation Toggle */}
            <div className="flex items-center gap-1 sm:gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 hover:text-purple-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              {/* Logo */}
              <Link to="/" className="flex items-center no-border-logo">
                <img
                  src="/logo.jpeg"
                  alt="SpreadB Logo"
                  className="h-10 lg:ml-2 w-auto sm:h-12 lg:h-14 no-border-logo"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3 mr-6">
              {(isBrandOwner || isInfluencer) && (
                <>
                  {isBrandOwner && brandNavItems.map((item) => (
                    <NavItem key={item.to} {...item} />
                  ))}
                  {isInfluencer && influencerNavItems.map((item) => (
                    <NavItem key={item.to} {...item} />
                  ))}
                </>
              )}
            </nav>

            {/* Right Section: Search + Profile + CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Search - Only for authenticated users */}
              {(isBrandOwner || isInfluencer) && (
                <div className="hidden lg:flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder={isBrandOwner ? "Search creators..." : "Search brands..."}
                      className="pl-10 w-64 bg-gray-50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Search Toggle */}
              {(isBrandOwner || isInfluencer) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-600 hover:text-purple-600"
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              {/* Mobile Notifications */}
              {(isBrandOwner || isInfluencer) && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-600 hover:text-purple-600 relative"
                >
                  <Bell className="h-5 w-5" />
                  {counts.notifications > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
                      {counts.notifications > 99 ? '99+' : counts.notifications}
                    </span>
                  )}
                </Button>
              )}

              {/* Desktop Profile Dropdown */}
              <div className="hidden lg:block">
                {isBrandOwner && <BrandProfileDropdown />}
                {isInfluencer && <InfluencerProfileDropdown />}
              </div>

              {/* Login/Signup buttons for non-authenticated users */}
              {!isBrandOwner && !isInfluencer && (
                <div className="hidden lg:flex items-center gap-3">
                  <Link to="/login" className="px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-all duration-200">
                    Login
                  </Link>
                  <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Premium Button for authenticated users */}
              {(isBrandOwner || isInfluencer) && (
                <Button className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-lg transition-all duration-300">
                  <Crown className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Try Premium</span>
                  <span className="md:hidden">Premium</span>
                </Button>
              )}

              {/* Mobile Profile Icon */}
              {(isBrandOwner || isInfluencer) && (
                <div className="lg:hidden">
                  {isBrandOwner ? (
                    <button className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-md hover:bg-purple-50 transition-colors">
                      <Building2 className="h-5 w-5 text-gray-600" />
                      <span className="text-xs text-gray-600">Brand</span>
                    </button>
                  ) : (
                    <button className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-md hover:bg-purple-50 transition-colors">
                      <Mic className="h-5 w-5 text-gray-600" />
                      <span className="text-xs text-gray-600">Creator</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search - Toggleable */}
          {showMobileSearch && (isBrandOwner || isInfluencer) && (
            <div className="lg:hidden py-3 px-2 border-t border-gray-100 animate-in slide-in-from-top duration-300">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={isBrandOwner ? "Search creators..." : "Search brands..."}
                  className="pl-10 w-full bg-gray-50 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />

          {/* Side Menu */}
          <div className="fixed left-0 top-0 bottom-0 w-80 sm:w-96 max-w-full bg-white shadow-xl z-50 lg:hidden animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
                  <img
                    src="/logo.jpeg"
                    alt="SpreadB Logo"
                    className="h-10 w-auto"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="text-gray-600 hover:text-purple-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Navigation Items */}
                {isBrandOwner && (
                  <div className="space-y-1 mb-6">
                    {brandNavItems.map((item) => (
                      <MobileMenuItem
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                        badge={item.badge}
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </div>
                )}

                {isInfluencer && (
                  <div className="space-y-1 mb-6">
                    {influencerNavItems.map((item) => (
                      <MobileMenuItem
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                        badge={item.badge}
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </div>
                )}

                {!isBrandOwner && !isInfluencer && (
                  <div className="space-y-1 mb-6">
                    <MobileMenuItem
                      to="/"
                      icon={Home}
                      label="Home"
                      onClick={closeMobileMenu}
                    />
                    <MobileMenuItem
                      to="/login"
                      icon={User}
                      label="Login"
                      onClick={closeMobileMenu}
                    />
                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 font-medium"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}

                {/* Profile Section in Mobile Menu */}
                {(isBrandOwner || isInfluencer) && (
                  <>
                    <Separator className="my-4" />
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Account
                      </h3>
                      {isBrandOwner && <BrandProfileDropdown mobile onItemClick={closeMobileMenu} />}
                      {isInfluencer && <InfluencerProfileDropdown mobile onItemClick={closeMobileMenu} />}
                    </div>
                  </>
                )}

                <Separator className="my-4" />

                {/* Additional Mobile Menu Items */}
                <div className="space-y-1">
                  <MobileMenuItem
                    to="/language"
                    icon={Globe}
                    label="Language & Region"
                    onClick={closeMobileMenu}
                  />
                  <MobileMenuItem
                    to="/help"
                    icon={HelpCircle}
                    label="Help & Support"
                    onClick={closeMobileMenu}
                  />
                </div>
              </div>

              {/* Mobile Menu Footer */}
              {(isBrandOwner || isInfluencer) && (
                <div className="p-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-md">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;