import React from "react";
import { Link } from "react-router-dom";
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
  TrendingUp,
  CreditCard,
  Link2,
  LogOut
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";


// --- Nav Item Component ---
const NavItem = ({ to, icon: Icon, label, badge, hasDropdown }) => (
  <Link
    to={to}
    className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-md hover:bg-navHover transition-colors group"
  >
    <div className="relative">
      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-badge text-[10px] font-medium text-badge-foreground">
          {badge}
        </span>
      )}
    </div>
    <div className="flex items-center gap-1">
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
      {hasDropdown && (
        <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
      )}
    </div>
  </Link>
);


// --- Profile Dropdown Component ---
const ProfileDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-md hover:bg-navHover transition-colors group">
        <User className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <div className="flex items-center gap-0.5">
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            Me
          </span>
          <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-[280px] bg-popover">
      <div className="flex items-center gap-3 p-4">
        <Avatar className="h-12 w-12">
          <img src="icon.png" alt="Profile" />
          <AvatarFallback>MG</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">Roopa Ampavilli</p>
          <p className="text-sm text-muted-foreground">Freelancer</p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-foreground">Online for messages</span>
        <Switch defaultChecked />
      </div>

      <Separator />

      <div className="p-1">
        <Link to="/profile-home">
          <DropdownMenuItem className="cursor-pointer py-3 hover:bg-purple-700 hover:text-white flex items-center">
            <User className="mr-3 h-5 w-5" /> Your profile
          </DropdownMenuItem>
        </Link>

        <Link to="/stats">
          <DropdownMenuItem className="cursor-pointer py-3 hover:bg-purple-700 hover:text-white flex items-center">
            <TrendingUp className="mr-3 h-5 w-5" /> Stats and trends
          </DropdownMenuItem>
        </Link>

        <Link to="/membership">
          <DropdownMenuItem className="cursor-pointer py-3 hover:bg-purple-700 hover:text-white flex items-center">
            <CreditCard className="mr-3 h-5 w-5" /> Membership plan
          </DropdownMenuItem>
        </Link>

        <Link to="/connects">
          <DropdownMenuItem className="cursor-pointer py-3 hover:bg-purple-700 hover:text-white flex items-center">
            <Link2 className="mr-3 h-5 w-5" /> Connects
          </DropdownMenuItem>
        </Link>
      </div>

      <Separator />

      <div className="p-1">
        <DropdownMenuItem className="cursor-pointer py-3 bg-red-500 text-white flex items-center">
          <LogOut className="mr-3 h-5 w-5" /> Log out
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);


// --- Header Component ---
const Header = () => {
  return (
    <header id="site-header"
      className="fixed top-0 left-0 w-full z-50  border-b bg-white border-header-border">

      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-6">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-14 w-auto" // or h-10, h-12 depending on your needs
            />

            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-purple-600" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-9 w-64 bg-background border-purple-600 placeholder-purple-400"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-2 text-purple-600">
            <NavItem to="/home" icon={Home} label="Home" badge={2} />
            <NavItem to="/creators" icon={Users} label="Find Creator" hasDropdown />
            <NavItem to="/work" icon={Briefcase} label="Manage work" hasDropdown />
            <NavItem to="/messages" icon={MessageSquare} label="Messages" />
            <NavItem to="/reports" icon={BarChart3} label="Reports" />
            <NavItem to="/notifications" icon={Bell} label="Notifications" />
            <NavItem to="/wallet" icon={Wallet} label="Wallet" />
            <ProfileDropdown />
          </nav>

          {/* CTA */}
          <Button className="hidden sm:inline-flex bg-purple-600 text-white hover:bg-purple-700">
            Try Premium for free
          </Button>

          {/* Mobile button */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
