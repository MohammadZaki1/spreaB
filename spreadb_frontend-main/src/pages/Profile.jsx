
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Upload,
  Save,
  Building2,
  MapPin,
  User,
  Link2,
  BriefcaseBusiness,
  Phone,
  ImageIcon,
  Home,
  Users,
  MessageSquare,
  Briefcase,
  Bell,
  Wallet,
  User as UserIcon,
  Camera,
  Star,
  CheckCircle,
} from "lucide-react";

/* ------------------- Reusable Button ------------------- */
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

/* ------------------- Header ------------------- */
const SpreadBHeader = () => {
  const brandPurple = "#9333EA";

  const navItemStyle =
    "flex flex-col items-center p-2 text-sm text-gray-700 hover:text-[#9333EA] transition-all cursor-pointer group";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Left */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="flex items-center gap-4">
            <span
              className="text-2xl font-bold tracking-wide"
              style={{ color: brandPurple }}
            >
              LOGO
            </span>
          </Link>

          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search by role, skills, or keywords"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#9333EA] w-72 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Center */}
        <nav className="flex space-x-6 items-center">
          <Link to="/home" className={navItemStyle} style={{ textDecoration: "none" }}>
            <Home className="w-5 h-5 mb-1 text-[#9333EA]" />
            <span>Home</span>
          </Link>

          <div className={navItemStyle}>
            <Users className="w-5 h-5 mb-1 text-[#9333EA]" /> <span>Find Creator</span>
          </div>

          <div className={navItemStyle}>
            <Briefcase className="w-5 h-5 mb-1 text-[#9333EA]" /> <span>Manage Work</span>
          </div>

          <div className={navItemStyle}>
            <MessageSquare className="w-5 h-5 mb-1 text-[#9333EA]" /> <span>Messages</span>
          </div>

          <div className={navItemStyle}>
            <Bell className="w-5 h-5 mb-1 text-[#9333EA]" /> <span>Notifications</span>
          </div>

          <div className={navItemStyle}>
            <Wallet className="w-5 h-5 mb-1 text-[#9333EA]" /> <span>Wallet</span>
          </div>

          <div className={navItemStyle}>
            <UserIcon className="w-5 h-5 mb-1 text-[#9333EA]" /> <span>Me</span>
          </div>
        </nav>

        {/* CTA */}
        <Button className="text-white rounded-xl shadow-md" style={{ backgroundColor: brandPurple }}>
          Try Premium for free
        </Button>
      </div>
    </header>
  );
};

/* ------------------- Industry Dropdown ------------------- */
const IndustryOptions = [
  { value: "", label: "Select Industry" },
  { value: "fashion-lifestyle", label: "Fashion & Lifestyle" },
  { value: "beauty-personal-care", label: "Beauty & Personal Care" },
  { value: "food-beverage", label: "Food & Beverage" },
  { value: "health-fitness", label: "Health & Fitness" },
  { value: "travel-hospitality", label: "Travel & Hospitality" },
  { value: "technology-gadgets", label: "Technology & Gadgets" },
  { value: "education-learning", label: "Education & Learning" },
  { value: "ecommerce-shopping", label: "E-Commerce & Shopping" },
  { value: "kids-parenting", label: "Kids & Parenting" },
  { value: "pets-animal-care", label: "Pets & Animal Care" },
  { value: "business-finance-startups", label: "Business, Finance & Startups" },
  { value: "automotive", label: "Automotive" },
  { value: "gaming-esports", label: "Gaming & Esports" },
  { value: "entertainment-media", label: "Entertainment & Media" },
  { value: "art-creativity", label: "Art & Creativity" },
  { value: "environment-sustainability", label: "Environment & Sustainability" },
  { value: "gifts-events-decorations", label: "Gifts, Events & Decorations" },
  { value: "home-living-agriculture", label: "Home, Living & Agriculture" },
];

const BrandProfileForm = () => {
  const brandPurple = "#9333EA";
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    description: "",
    logoFile: null,
    logoPreviewUrl: null,

    instagram: "",
    twitter: "",
    youtube: "",

    locations: "", // comma based input
    wallet: "", // New field

    emailVerified: false,
    phoneVerified: false,
    ownerVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          logoFile: file,
          brandLogo: file,
          logoPreviewUrl: URL.createObjectURL(file),
        }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const data = new FormData();
      data.append("brandName", formData.companyName);
      data.append("industry", formData.industry);
      data.append("website", formData.website);
      data.append("description", formData.description);

      // NEW: Append locations
      if (formData.locations) {
        const locationsArray = formData.locations.split(",").map((loc) => loc.trim());
        data.append("locations", JSON.stringify(locationsArray));
      }

      // NEW: Append wallet
      if (formData.wallet !== "") {
        data.append("wallet", formData.wallet);
      }

      const socialMedia = {
        instagram: formData.instagram,
        twitter: formData.twitter,
        youtube: formData.youtube,
      };

      data.append("socialMedia", JSON.stringify(socialMedia));

      // NEW: verification object
      const verificationStatus = {
        email: formData.emailVerified,
        phone: formData.phoneVerified,
        ownerName: formData.ownerVerified,
      };

      data.append("verificationStatus", JSON.stringify(verificationStatus));

      if (formData.logoFile) {
        data.append("brandLogo", formData.logoFile);
      }

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/add_brand-owner`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Brand profile created successfully 🎉");
      navigate("/home");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile creation failed");
    }
  };

  const inputStyle =
    "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 outline-none transition-all";

  const labelStyle =
    "text-sm font-medium text-gray-700 flex items-center gap-2 mb-1";

  const sectionTitleStyle =
    "text-xl font-bold mb-4 pt-4 border-t border-gray-200";

  const InputField = ({ label, id, name, type = "text", placeholder, required }) => (
    <div className="space-y-1">
      <label className={labelStyle}>{label}{required && <span className="text-red-500">*</span>}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className={inputStyle}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <SpreadBHeader />

      <div className="p-6 md:p-10 pt-4">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 max-w-4xl mx-auto">
          <div className="p-8">
            
            {/* LOGO */}
            <div className="flex justify-between items-center w-full mb-10 px-5">
              <div>
                <h1 className="text-3xl font-bold text-[#9333EA]">
                  Establish Your Brand Presence
                </h1>
                <p className="text-gray-600 mt-1">Official presence for streamlined talent acquisition.</p>
              </div>

              <div className="flex flex-col items-center">
                <label htmlFor="logoFile">
                  <div className="h-28 w-28 rounded-full border-2 border-dashed border-gray-300 
                    flex items-center justify-center overflow-hidden bg-gray-100 hover:border-[#9333EA] 
                    transition-all shadow-sm cursor-pointer"
                  >
                    {formData.logoPreviewUrl ? (
                      <img src={formData.logoPreviewUrl} alt="Logo Preview" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                </label>

                <input id="logoFile" name="brandLogo" type="file" accept="image/*" onChange={handleChange} className="hidden" />

                <p className="mt-2 text-sm text-gray-600">Upload Brand Logo</p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-10">

              <h3 className={sectionTitleStyle} style={{ color: brandPurple }}>Brand Details</h3>

              <InputField label="Brand Name" id="companyName" name="companyName" required placeholder="e.g., Spread B Solutions" />
              <InputField label="Website" id="website" name="website" required placeholder="https://brand.com" />
              <InputField label="Industry" id="industry" name="industry" required placeholder="Technology / Fashion / Finance" />
              <InputField label="Locations (comma separated)" id="locations" name="locations" placeholder="Hyderabad, Mumbai" />

              <h3 className={sectionTitleStyle} style={{ color: brandPurple }}>Wallet</h3>
              <InputField label="Wallet Amount" id="wallet" name="wallet" type="number" placeholder="0" />

              <h3 className={sectionTitleStyle} style={{ color: brandPurple }}>Verification</h3>
              <div className="space-y-2">
                <label><input type="checkbox" name="emailVerified" onChange={handleChange} /> Email Verified</label><br/>
                <label><input type="checkbox" name="phoneVerified" onChange={handleChange} /> Phone Verified</label><br/>
                <label><input type="checkbox" name="ownerVerified" onChange={handleChange} /> Owner Verified</label>
              </div>

              <h3 className={sectionTitleStyle} style={{ color: brandPurple }}>About Brand</h3>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Share about your brand"
                value={formData.description}
                onChange={handleChange}
                required
                className={`${inputStyle} h-auto py-3 resize-none`}
              />

              <h3 className={sectionTitleStyle} style={{ color: brandPurple }}>Social Links</h3>
              
              <InputField label="Instagram" id="instagram" name="instagram" placeholder="https://instagram.com/brand" />
              <InputField label="Twitter" id="twitter" name="twitter" placeholder="https://twitter.com/brand" />
              <InputField label="YouTube" id="youtube" name="youtube" placeholder="https://youtube.com/brand" />

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button type="submit" className="bg-[#9333EA] text-white hover:bg-[#7f2bd3] px-6 py-2 shadow-lg" >
                  Save Profile
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};




export default BrandProfileForm;
