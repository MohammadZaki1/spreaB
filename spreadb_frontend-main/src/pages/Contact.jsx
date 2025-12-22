// import { useState } from "react";
// import Header from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
// import { Button } from "../components/ui/button";
// import { Card } from "../components/ui/card";

// export default function Contact() {
 
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     location: "",
//     expertise: "",
//     project: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successPopup, setSuccessPopup] = useState(false);

//   // ------------------ HANDLERS ------------------------
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.expertise.trim()) newErrors.expertise = "Expertise is required";
//      if (!formData.location.trim()) newErrors.location = "Location is required";
//       if (!formData.phone.trim()) newErrors.phone = "Valid Phone number is required";
//     if (!formData.project.trim()) newErrors.project = "Project description is required";

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validationErrors = validate();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       setSuccessPopup(true);

//       // Automatically close popup after 3 seconds
//       setTimeout(() => setSuccessPopup(false), 3000);

//       // Reset form
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         location: "",
//         expertise: "",
//         project: "",
//       });
//     }
//   };

//   // ------------------ UI RENDER -----------------------
//   return (
//     <div className="bg-gray-50 text-gray-800">
//       <Header />

//       {/* Hero Section */}
//       <section
//         className="relative h-[60vh] flex flex-col justify-center items-center text-center px-6 bg-cover bg-center mt-[80px]"
//         style={{
// <<<<<<< HEAD
//           backgroundImage: `url('https://cdn.pixabay.com/photo/2015/01/25/21/02/phone-612061_640.jpg')`,
// =======
//           backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')`,



// >>>>>>> 3c9327db62da650633d559f81760352f88f7a99f
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-30"></div>

//         <div className="relative z-10">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
//             Get in Touch with <span className="text-yellow-500">Spread_B</span>
//           </h1>
//           <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl">
//             Have a project idea or questions? We’re here to help you turn them into reality.
//           </p>
//         </div>
//       </section>

//       {/* Contact Form Section */}
//       <section className="bg-blue-50 min-h-screen flex flex-col items-center py-12 px-6 md:px-16 mt-[60px]">
//         <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12">
//           {/* Left Side */}
//           <div>
//             <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
// <<<<<<< HEAD
//               <span className="text-blue-500">Connect</span> with Our Team of Experts
// =======
//              <span className="text-purple-400">Connect</span> with Our Team of Experts

// >>>>>>> 3c9327db62da650633d559f81760352f88f7a99f
//             </h2>
//             <p className="text-blue-900 mb-8 max-w-xl">
//               Contact our team of excellence-driven experts today to bring your project to life.
//             </p>

//             <div className="flex flex-wrap gap-6 text-blue-700 mb-10">
//               <a
//                 href="tel:713.953.5200"
//                 className="flex items-center gap-2"
//               >
//                 <Phone className="w-5 h-5 text-primary" />
//                 <span className="font-medium">713.953.5200</span>
//               </a>

//               <a
//                 href="mailto:ija@ija.com"
//                 className="flex items-center gap-2"
//               >
//                 <Mail className="w-5 h-5 text-primary" />
//                 <span className="font-medium">ija@ija.com</span>
//               </a>

//               <button className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-primary" />
//                 <span className="font-medium">See Our Locations</span>
//               </button>
//             </div>

//             {/* Card CTA */}
//             <Card className="overflow-hidden bg-white shadow-md rounded-xl">
//               <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
//                 <div className="flex-1 text-center sm:text-left space-y-3">
//                   <h3 className="text-xl font-bold text-blue-900">
//                     Want to Join Our Talented Team?
//                   </h3>
//                   <Button
//                     variant="link"
//                     className="text-blue-500 hover:text-blue-600 p-0 h-auto font-semibold flex items-center gap-1"
//                   >
//                     VISIT OUR JOB BOARD
//                     <ArrowRight className="w-4 h-4" />
//                   </Button>
//                 </div>
// <<<<<<< HEAD

//             <img 
//   src="/icon1.jpg"
//   alt="Team Member"
//   className="w-32 h-40 object-cover rounded-lg"
// />

// =======
//   <img 
//   src="https://images.unsplash.com/photo-1551434678-e076c223a692"
//   alt="Corporate Team"
//   className="w-32 h-40 object-cover rounded-lg"
// />


// >>>>>>> 3c9327db62da650633d559f81760352f88f7a99f
//               </div>
//             </Card>
//           </div>

//           {/* Right Side – FORM */}
// <<<<<<< HEAD
//           <div className="bg-blue-900 rounded-xl p-8 text-white max-w-xl">
// =======
//           <div className="bg-purple-600 rounded-xl p-8 text-white max-w-xl">

// >>>>>>> 3c9327db62da650633d559f81760352f88f7a99f
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Row 1 */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-semibold mb-1">Full Name*</label>
//                   <input
//                     id="fullName"
//                     type="text"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="w-full rounded-md p-2 text-blue-900"
//                     placeholder="Full Name"
//                   />
//                   {errors.fullName && (
//                     <p className="text-red-500 text-sm">{errors.fullName}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold mb-1">Email Address*</label>
//                   <input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full rounded-md p-2 text-blue-900"
//                     placeholder="Email Address"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm">{errors.email}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold mb-1">Phone Number</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full rounded-md p-2 text-blue-900"
//                     placeholder="Phone Number"
//                   />
//                    {errors.phone && (
//                   <p className="text-red-500 text-sm">{errors.phone}</p>
//                 )}
//                 </div>

//                 <div>
//                   <label className="text-sm font-semibold mb-1">Location</label>
//                   <input
//                     id="location"
//                     type="text"
//                     value={formData.location}
//                     onChange={handleChange}
//                     className="w-full rounded-md p-2 text-blue-900"
//                     placeholder="Location"
//                   />
//                    {errors.location && (
//                   <p className="text-red-500 text-sm">{errors.location}</p>
//                 )}
//                 </div>
//               </div>

//               {/* Expertise */}
//               <div>
//                 <label className="text-sm font-semibold mb-1">
//                   What Expertise You're Interested In*
//                 </label>
//                 <select
//                   id="expertise"
//                   value={formData.expertise}
//                   onChange={handleChange}
//                   className="w-full rounded-md p-2 text-blue-900"
//                 >
//                   <option value="">Select</option>
//                   <option>Web Development</option>
//                   <option>Mobile Apps</option>
//                   <option>UI/UX Design</option>
//                   <option>Consulting</option>
//                 </select>
//                 {errors.expertise && (
//                   <p className="text-red-500 text-sm">{errors.expertise}</p>
//                 )}
//               </div>

//               {/* Project */}
//               <div>
//                 <label className="text-sm font-semibold mb-1">Tell Us About Your Project*</label>
//                 <textarea
//                   id="project"
//                   rows="5"
//                   value={formData.project}
//                   onChange={handleChange}
//                   className="w-full rounded-md p-2 text-blue-900"
//                   placeholder="Leave your message here"
//                 ></textarea>
//                 {errors.project && (
//                   <p className="text-red-500 text-sm">{errors.project}</p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
// <<<<<<< HEAD
//                 className="bg-blue-500 hover:bg-blue-600 transition rounded-md py-3 px-6 font-semibold flex items-center gap-2"
// =======
//               className="bg-purple-400 hover:bg-purple-500 transition rounded-md py-3 px-6 font-semibold flex items-center gap-2"
// >>>>>>> 3c9327db62da650633d559f81760352f88f7a99f
//               >
//                 SUBMIT
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Google Maps Section */}
//       <section className="w-full h-96 mt-[-30px]">
//         <iframe
//           title="Flyii Solutions Location"
//           className="w-full h-full rounded-3xl shadow-lg border-0"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30448.981765535453!2d78.34879157431641!3d17.4538394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x413957995102948b%3A0xc56fb4f65e5dbf87!2sFlyhii%20Solutions%20Private%20Limited.!5e0!3m2!1sen!2sin!4v1763519224175!5m2!1sen!2sin"
//           allowFullScreen
//           loading="lazy"
//         ></iframe>
//       </section>

//       <Footer />

//       {/* Success Popup */}
//       {successPopup && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg text-center w-80">
//             <h2 className="text-xl font-bold text-blue-700">Success!</h2>
//             <p className="mt-2 text-gray-700">Your message has been sent successfully.</p>

//             <button
//               onClick={() => setSuccessPopup(false)}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
