import { Link } from "react-router-dom";

import Header from "../components/Navbar";
import Footer from "../components/Footer";

import { FaUserGraduate, FaMoneyCheckAlt, FaShieldAlt } from "react-icons/fa";

export default function CreatorSupport() {
  return (
    <div>
      <Header />

      <div className="bg-gray-50 text-gray-800 mt-10">

        {/* HERO SECTION */}
        <section className="relative h-[60vh] mt-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1470&q=80')`,
            }}
          ></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              Creator Support
            </h1>

            <p className="mt-5 text-xl md:text-2xl text-white/90 max-w-3xl">
              Helping creators succeed with resources, guidance, and direct assistance.
            </p>
          </div>
        </section>

        {/* WHY SUPPORT MATTERS */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
      Why Creator Support Matters
    </h2>
    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
      Our goal is to make your creator journey smooth. Whether you're launching a new project,
      improving your profile, or resolving issues, our tools and resources are here to help
      you grow confidently and efficiently.
    </p>
  </div>
</section>




      {/* POPULAR RESOURCES */}


     

<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-16">
      Creator Insights And Best Practices
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="text-purple-600 text-4xl mb-4">
          <FaUserGraduate />
        </div>
        <h3 className="text-xl font-bold mb-3 text-purple-700">
          How to Grow Your Profile
        </h3>
        <p className="text-gray-600 mb-4">
          Learn how to optimize your bio, portfolio, and content so clients and followers can quickly understand who you are and what you offer.
        </p>
        <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
          <li>Tips to make your profile stand out</li>
          <li>Best practices for profile pictures & banners</li>
          <li>How to showcase your best work first</li>
        </ul>
      </div>

      {/* Card 2 */}
      <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="text-emerald-600 text-4xl mb-4">
          <FaMoneyCheckAlt />
        </div>
        <h3 className="text-xl font-bold mb-3 text-emerald-700">
          Payment & Withdrawal Guide
        </h3>
        <p className="text-gray-600 mb-4">
          Understand how payments work, from receiving client payments to tracking your earnings and planning your cash flow.
        </p>
        <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
          <li>Overview of payment cycles</li>
          <li>Common reasons for delayed payments</li>
          <li>Tips for safer and faster transactions</li>
        </ul>
      </div>

      {/* Card 3 */}
      <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="text-amber-600 text-4xl mb-4">
          <FaShieldAlt />
        </div>
        <h3 className="text-xl font-bold mb-3 text-amber-700">
          Community Rules & Safety
        </h3>
        <p className="text-gray-600 mb-4">
          Learn how to stay safe, respectful, and professional while working with clients and other creators on the platform.
        </p>
        <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
          <li>Guidelines for respectful communication</li>
          <li>How to handle spam, fraud, or abuse</li>
          <li>Steps to report unsafe behavior</li>
        </ul>
      </div>
    </div>
  </div>
</section>


{/* CREATOR SUCCESS ROADMAP */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
      Creator Success Roadmap
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {/* Step 1 */}
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-600">Build a Strong Foundation</h3>
        <p className="text-gray-600 mt-3">
          Create a clean, professional profile that highlights your skills, experience,
          and personality. A strong foundation sets the tone for your creator journey.
        </p>
        <ul className="mt-4 text-sm text-gray-500 list-disc list-inside space-y-1">
          <li>Use high-quality visuals</li>
          <li>Write a clear introduction</li>
          <li>Present your best work first</li>
        </ul>
      </div>

      {/* Step 2 */}
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-600">Grow Your Presence</h3>
        <p className="text-gray-600 mt-3">
          Stay active and consistent. Share new work, update your portfolio,
          and keep your audience engaged to build visibility and trust.
        </p>
        <ul className="mt-4 text-sm text-gray-500 list-disc list-inside space-y-1">
          <li>Post regularly and professionally</li>
          <li>Engage with your followers</li>
          <li>Stay updated with trends</li>
        </ul>
      </div>

      {/* Step 3 */}
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-600">Elevate & Scale</h3>
        <p className="text-gray-600 mt-3">
          As you grow, refine your branding, improve your workflow,
          and explore more opportunities to elevate your creative impact.
        </p>
        <ul className="mt-4 text-sm text-gray-500 list-disc list-inside space-y-1">
          <li>Develop a personal brand</li>
          <li>Improve workflow efficiency</li>
          <li>Expand your creative network</li>
        </ul>
      </div>
    </div>
  </div>
</section>

        



         

         
{/* PROFESSIONAL CREATOR TIPS */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
      Professional Tips for Creators
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {/* Tip 1 */}
      <div className="bg-white p-8 shadow-lg rounded-3xl border border-gray-100
     transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-600">Stay Consistent</h3>
        <p className="text-gray-600 mt-3">
          Consistency is key. Posting regularly builds trust, strengthens your brand,
          and helps you grow faster in the creator space.
        </p>
      </div>

      {/* Tip 2 */}
      
      <div className="bg-white p-8 shadow-lg rounded-3xl border border-gray-100
     transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-600">Deliver Quality</h3>
        <p className="text-gray-600 mt-3">
          Prioritize quality over quantity. Presenting polished, meaningful work
          attracts better opportunities and loyal followers.
        </p>
      </div>

      {/* Tip 3 */}
    
      <div className="bg-white p-8 shadow-lg rounded-3xl border border-gray-100
     transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h3 className="text-2xl font-bold text-purple-600">Communicate Clearly</h3>
        <p className="text-gray-600 mt-3">
          Professional communication sets the tone for collaborations, projects,
          and long-term partnerships. Be clear, respectful, and timely.
        </p>
      </div>
    </div>
  </div>
</section>


        {/* SUPPORT CATEGORIES */}
        <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* Support Card 1 */}
          <div className="bg-white p-10 shadow-xl rounded-3xl border border-gray-100 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Help Center</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Browse FAQs, tutorials, and step-by-step guides to get started and troubleshoot common issues.
            </p>
            <Link
              to="/help-center"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transition transform hover:scale-105 duration-300"
            >
              Visit Help Center
              <svg
                className="w-5 h-5 ml-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>

          {/* Support Card 2 */}
          <div className="bg-white p-10 shadow-xl rounded-3xl border border-gray-100 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Report an Issue</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Encountering a problem? Submit a report and our team will get back to you promptly.
            </p>
            <Link
              to="/report-issue"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transition transform hover:scale-105 duration-300"
            >
              Report Issue
              <svg
                className="w-5 h-5 ml-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>

          {/* Support Card 3 */}
          <div className="bg-white p-10 shadow-xl rounded-3xl border border-gray-100 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">Contact Support</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Need direct assistance? Reach out to our support team for personalized help.
            </p>
            <Link
              to="/contact-support"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-4 px-10 rounded-xl shadow-lg transition transform hover:scale-105 duration-300"
            >
              Contact Us
              <svg
                className="w-5 h-5 ml-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </section>




      </div>

      <Footer />
    </div>
  );
}
