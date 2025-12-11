import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Upload, MapPin, CheckCircle, Save } from "lucide-react";
import { toast } from "sonner";
/* Categories */
const CategoryOptions = [
  { value: "", label: "Select Category" },
  { value: "fashion", label: "Fashion" },
  { value: "food", label: "Food" },
  { value: "beauty", label: "Beauty" },
  { value: "fitness", label: "Fitness" },
  { value: "travel", label: "Travel" },
  { value: "gaming", label: "Gaming" },
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "art", label: "Art" },
];

/* Button Component */
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const InfluencerProfileForm = () => {
const navigate = useNavigate();
  // ---------------- FORM STATES ----------------
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");

  const [primaryCategory, setPrimaryCategory] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");

  const [portfolioLinks, setPortfolioLinks] = useState([""]);

  const [socialMedia, setSocialMedia] = useState({
    instagram: { link: "", followers: "", views: "" },
    youtube: { link: "", followers: "", views: "" },
    twitter: { link: "", followers: "", views: "" },
  });

  // ---------------- HANDLERS ----------------
  const addPortfolioLink = () => setPortfolioLinks([...portfolioLinks, ""]);

  const updatePortfolio = (index, value) => {
    const arr = [...portfolioLinks];
    arr[index] = value;
    setPortfolioLinks(arr);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const updateSocialMedia = (platform, field, value) => {
    setSocialMedia({
      ...socialMedia,
      [platform]: { ...socialMedia[platform], [field]: value },
    });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("about", about);

      formData.append("locations", JSON.stringify([location])); 
      formData.append("category", JSON.stringify([primaryCategory, secondaryCategory]));
      formData.append("portfolioLinks", JSON.stringify(portfolioLinks));
      formData.append("socialMedia", JSON.stringify(socialMedia));

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const token = localStorage.getItem("authToken");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/add_influencer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

     toast.success("Profile Created Successfully!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="w-full flex justify-center py-12 bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">

        {/* Title + Profile Photo */}
        <div className="flex items-center justify-between mb-6 gap-6">
          <div>
            <p className="text-2xl font-semibold text-purple-700">Create Your Influencer Identity</p>
            <p className="text-sm text-gray-500">
              Grow your audience, collaborate with brands, and make an impact
            </p>
          </div>

          <div className="flex-shrink-0">
            <label className="cursor-pointer flex flex-col items-center">
              <input type="file" className="hidden" onChange={handlePhotoUpload} />
              <div className="w-28 h-28 rounded-full border overflow-hidden flex items-center justify-center bg-gray-100">
                {previewPhoto ? (
                  <img src={previewPhoto} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <Upload className="text-gray-400" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">Upload Profile Photo</p>
            </label>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-semibold text-purple-600">First Name *</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-purple-600">Last Name *</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-purple-600">Username *</label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="letters, numbers, underscore"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-purple-600">Phone Number *</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="10 digits"
            />
          </div>

          {/* Primary Category */}
          <div>
            <label className="text-sm font-semibold text-purple-600">Primary Category *</label>
            <select
              className="w-full mt-1 p-2 border rounded-md"
              value={primaryCategory}
              onChange={(e) => setPrimaryCategory(e.target.value)}
            >
              {CategoryOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Secondary Category */}
          <div>
            <label className="text-sm font-semibold text-purple-600">Secondary Category *</label>
            <select
              className="w-full mt-1 p-2 border rounded-md"
              value={secondaryCategory}
              onChange={(e) => setSecondaryCategory(e.target.value)}
            >
              {CategoryOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="text-sm font-medium">About / Bio *</label>
          <textarea
            rows={3}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Short bio..."
          />
        </div>

        {/* Location */}
        <div className="mt-6">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin size={16} /> Location *
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="City, State, Country"
          />
        </div>

        {/* Portfolio */}
        <p className="mt-8 text-lg font-semibold text-purple-600">Portfolio</p>

        {portfolioLinks.map((value, index) => (
          <input
            key={index}
            value={value}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="https://"
            onChange={(e) => updatePortfolio(index, e.target.value)}
          />
        ))}

        <button onClick={addPortfolioLink} className="text-sm text-purple-600 mt-2">
          + Add another link
        </button>

        {/* Social Media */}
        <p className="mt-10 text-lg font-semibold text-purple-600">
          Social Media Accounts & Audience
        </p>

        <div className="grid grid-cols-3 gap-6 mt-4">
          
          {/* Instagram */}
          <div>
            <label className="text-sm font-medium">Instagram URL *</label>
            <input
              value={socialMedia.instagram.link}
              onChange={(e) => updateSocialMedia("instagram", "link", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://instagram.com/..."
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                value={socialMedia.instagram.followers}
                onChange={(e) => updateSocialMedia("instagram", "followers", e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Followers"
              />
              <input
                value={socialMedia.instagram.views}
                onChange={(e) => updateSocialMedia("instagram", "views", e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Avg Views"
              />
            </div>
          </div>

          {/* YouTube */}
          <div>
            <label className="text-sm font-medium">YouTube URL *</label>
            <input
              value={socialMedia.youtube.link}
              onChange={(e) => updateSocialMedia("youtube", "link", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://youtube.com/..."
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                value={socialMedia.youtube.followers}
                onChange={(e) => updateSocialMedia("youtube", "followers", e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Subscribers"
              />
              <input
                value={socialMedia.youtube.views}
                onChange={(e) => updateSocialMedia("youtube", "views", e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Avg Views"
              />
            </div>
          </div>

          {/* Twitter */}
          <div>
            <label className="text-sm font-medium">Twitter URL *</label>
            <input
              value={socialMedia.twitter.link}
              onChange={(e) => updateSocialMedia("twitter", "link", e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://twitter.com/..."
            />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <input
                value={socialMedia.twitter.followers}
                onChange={(e) => updateSocialMedia("twitter", "followers", e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Followers"
              />
              <input
                value={socialMedia.twitter.views}
                onChange={(e) => updateSocialMedia("twitter", "views", e.target.value)}
                className="p-2 border rounded-md"
                placeholder="Avg Views"
              />
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="mt-6">
          <label className="text-sm font-medium">Verification Status</label>
          <div className="flex gap-5 mt-2">
            <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18} />Email Verified</div>
            <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18} />Phone Verified</div>
            <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18} />Profile Verified</div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            className="bg-[#9333EA] text-white hover:bg-[#7f2bd3] px-6 py-2 shadow-lg flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save & Complete Profile
          </Button>
        </div>

      </div>
    </div>
  );
};

export default InfluencerProfileForm;



// import React, { useState } from "react";
// import axios from "axios";
// import { Upload, MapPin, CheckCircle, Save } from "lucide-react";

// /* Categories */
// const CategoryOptions = [
//   { value: "", label: "Select Category" },
//   { value: "fashion", label: "Fashion" },
//   { value: "food", label: "Food" },
//   { value: "beauty", label: "Beauty" },
//   { value: "fitness", label: "Fitness" },
//   { value: "travel", label: "Travel" },
//   { value: "gaming", label: "Gaming" },
//   { value: "technology", label: "Technology" },
//   { value: "lifestyle", label: "Lifestyle" },
//   { value: "art", label: "Art" },
// ];

// /* Button Component */
// const Button = ({ children, className, ...props }) => (
//   <button
//     className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const InfluencerProfileForm = () => {
//   // Form State
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [about, setAbout] = useState("");
//   const [location, setLocation] = useState("");

//   const [primaryCategory, setPrimaryCategory] = useState("");
//   const [secondaryCategory, setSecondaryCategory] = useState("");

//   const [portfolioLinks, setPortfolioLinks] = useState([""]);

//   const [socialMedia, setSocialMedia] = useState({
//     instagram: { link: "", followers: "", views: "" },
//     youtube: { link: "", followers: "", views: "" },
//     twitter: { link: "", followers: "", views: "" },
//   });

//   const addPortfolioLink = () => setPortfolioLinks([...portfolioLinks, ""]);
//   const updatePortfolio = (i, v) => {
//     const arr = [...portfolioLinks];
//     arr[i] = v;
//     setPortfolioLinks(arr);
//   };


//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("fullName", fullName);
//       formData.append("lastName", lastName);
//       formData.append("userName", userName);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("about", about);

//       formData.append("locations", JSON.stringify([location])); // Converting to array
//       formData.append("category", JSON.stringify([primaryCategory, secondaryCategory]));
//       formData.append("portfolioLinks", JSON.stringify(portfolioLinks));

//       formData.append("socialMedia", JSON.stringify(socialMedia));

//       if (profilePhoto) {
//         formData.append("profilePhoto", profilePhoto);
//       }

//       const token = localStorage.getItem("token");

//       const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/add_influencer`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert("Profile Created Successfully!");

//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="w-full flex justify-center py-12 bg-gray-50">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">

//         {/* ---------------- TITLE WITH LOGO & PROFILE PHOTO SIDE BY SIDE ---------------- */}
//         <div className="flex items-center justify-between mb-6 gap-6">
//           {/* Title */}
//           <div>
//             <p className="text-2xl font-semibold text-purple-700">Create Your Influencer Identity</p>
// <p className="text-sm text-gray-500">Grow your audience, collaborate with brands, and make an impact</p>

//           </div>

//           {/* Profile Photo */}
//           <div className="flex-shrink-0">
//             <label className="cursor-pointer flex flex-col items-center">
//               <div className="w-28 h-28 rounded-full border flex items-center justify-center text-gray-400">
//                 <Upload />
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Upload Profile Photo</p>
//             </label>
//           </div>
//         </div>

//         {/* ---------------- BASIC INFO ---------------- */}
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm font-semibold text-purple-600">Full Name *</label>
//             <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter your name" />
//           </div>

//           <div>
//             <label className="text-sm font-semibold text-purple-600">Username *</label>
//             <input className="w-full mt-1 p-2 border rounded-md" placeholder="letters, numbers, underscore" />
//           </div>

//           <div>
//             <label className="text-sm font-semibold text-purple-600">Phone Number *</label>
//             <input className="w-full mt-1 p-2 border rounded-md" placeholder="10 digits" />
//           </div>

//           {/* Primary Category */}
//           <div>
//             <label className="text-sm font-semibold text-purple-600">Primary Category *</label>
//             <select
//               className="w-full mt-1 p-2 border rounded-md"
//               value={primaryCategory}
//               onChange={(e) => setPrimaryCategory(e.target.value)}
//             >
//               {CategoryOptions.map((c) => (
//                 <option key={c.value} value={c.value}>{c.label}</option>
//               ))}
//             </select>
//           </div>

//           {/* Secondary Category */}
//           <div>
//             <label className="text-sm font-semibold text-purple-600">Secondary Category *</label>
//             <select
//               className="w-full mt-1 p-2 border rounded-md"
//               value={secondaryCategory}
//               onChange={(e) => setSecondaryCategory(e.target.value)}
//             >
//               {CategoryOptions.map((c) => (
//                 <option key={c.value} value={c.value}>{c.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* About / Bio */}
//         <div className="mt-6">
//           <label className="text-sm font-medium">About / Bio *</label>
//           <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Short bio..." />
//         </div>

//         {/* Location */}
//         <div className="mt-6">
//           <label className="text-sm font-medium flex items-center gap-2"><MapPin size={16}/> Location *</label>
//           <input className="w-full mt-1 p-2 border rounded-md" placeholder="City, State, Country" />
//         </div>

//         {/* Portfolio */}
//         <p className="mt-8 text-lg font-semibold text-purple-600">Portfolio</p>
//         <div className="mt-3">
//           <label className="text-sm font-medium">Upload Files</label>
//           <input type="file" className="mt-1"/>
//         </div>

//         {portfolioLinks.map((v, i) => (
//           <input
//             key={i}
//             value={v}
//             onChange={(e)=>updatePortfolio(i, e.target.value)}
//             placeholder="https://"
//             className="w-full mt-2 p-2 border rounded-md"
//           />
//         ))}
//         <button onClick={addPortfolioLink} className="text-sm text-purple-600 mt-2">+ Add another link</button>

//         {/* Social Media */}
//         <p className="mt-10 text-lg font-semibold text-purple-600">Social Media Accounts & Audience</p>
//         <div className="grid grid-cols-3 gap-6 mt-4">
//           <div>
//             <label className="text-sm font-medium">Instagram URL *</label>
//             <input className="w-full p-2 border rounded-md" placeholder="https://instagram.com/..."/>
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               <input className="p-2 border rounded-md" placeholder="Followers"/>
//               <input className="p-2 border rounded-md" placeholder="Avg Views"/>
//             </div>
//           </div>
//           <div>
//             <label className="text-sm font-medium">YouTube URL *</label>
//             <input className="w-full p-2 border rounded-md" placeholder="https://youtube.com/..."/>
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               <input className="p-2 border rounded-md" placeholder="Subscribers"/>
//               <input className="p-2 border rounded-md" placeholder="Avg Views"/>
//             </div>
//           </div>
//           <div>
//             <label className="text-sm font-medium">Twitter URL *</label>
//             <input className="w-full p-2 border rounded-md" placeholder="https://twitter.com/..."/>
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               <input className="p-2 border rounded-md" placeholder="Followers"/>
//               <input className="p-2 border rounded-md" placeholder="Avg Views"/>
//             </div>
//           </div>
//         </div>

//         {/* Purchase History */}
//         <p className="mt-10 text-lg font-semibold text-purple-600">Sticks & Purchase History</p>
//         <input className="mt-3 p-2 border rounded-md w-full" placeholder="e.g., 10"/>

//         {/* Promotions */}
//         <p className="mt-10 text-lg font-semibold text-purple-600">Promotions</p>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm">Promotions Applied *</label>
//             <input className="w-full mt-1 p-2 border rounded-md"/>
//           </div>
//           <div>
//             <label className="text-sm">Promotions Accepted *</label>
//             <input className="w-full mt-1 p-2 border rounded-md"/>
//           </div>
//         </div>

//         {/* Ratings & Verification */}
//         <p className="mt-10 text-lg font-semibold text-purple-600">Ratings, Wallet & Verification</p>
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm">Rating (1‒5) *</label>
//             <input className="w-full mt-1 p-2 border rounded-md" placeholder="e.g., 4.5"/>
//           </div>
//           <div>
//             <label className="text-sm">Wallet Amount *</label>
//             <input className="w-full mt-1 p-2 border rounded-md" placeholder="e.g., 1500"/>
//           </div>
//         </div>

//         <div className="mt-6">
//           <label className="text-sm font-medium">Verification Status</label>
//           <div className="flex gap-5 mt-2">
//             <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18}/>Email Verified</div>
//             <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18}/>Phone Verified</div>
//             <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18}/>Profile Verified</div>
//           </div>
//         </div>

//           <div className="flex justify-end pt-6 border-t border-gray-200">
//           <Button
//             onClick={handleSubmit}
//             className="bg-[#9333EA] text-white hover:bg-[#7f2bd3] px-6 py-2 shadow-lg flex items-center gap-2"
//           >
//             <Save className="w-5 h-5" />
//             Save & Complete Profile
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfluencerProfileForm;
