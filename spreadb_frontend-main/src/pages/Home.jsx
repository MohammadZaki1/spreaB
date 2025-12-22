import React from "react";
import HeroSearch from "../components/hero-section";
import Header from "../components/Navbar";
import Categories from "../pages/Categories";
import Howitworks from "../pages/how it works";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="relative">
      
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main>
        
        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center pt-16 md:pt-0"
          style={{ 
            minHeight: "calc(100vh - 80px)",
            height: "auto"
          }}
        >

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/spred.jpg)" }}
          >
            <div className="absolute inset-0 bg-purple-700/40"></div>
          </div>

          {/* Hero Content - Responsive for mobile only */}
          <div className="relative z-10 container mx-auto px-4 py-8 md:py-20">
            <div className="max-w-6xl mx-auto text-center md:text-left">
              {/* Responsive heading for mobile, desktop stays exactly same */}
              <h1 className="text-3xl font-bold text-white mb-8 leading-tight 
                md:text-5xl md:text-6xl lg:text-7xl md:mb-16 md:max-w-3xl md:mx-0
                mx-auto max-w-md
                sm:text-4xl sm:max-w-xl">
                Connecting clients in need to freelancers who deliver
              </h1>

              <div className="px-2 sm:px-0">
                <HeroSearch />
              </div>
            </div>
          </div>

        </section>

        {/* Other Sections - Mobile responsive padding only */}
        <section className="z-10 relative py-12 md:py-20 text-center">
         <Categories/>
          <Howitworks/>
           <div className="w-full flex justify-center items-center py-8 md:py-10 px-4">
      <div
        className="w-full max-w-7xl rounded-2xl md:rounded-3xl 
        bg-gradient-to-r from-purple-400 via-purple-400 to-orange-400
        text-white text-center py-10 md:py-14 px-4 md:px-6"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 px-2 md:px-0">
          Find your next hire for a short task or long-term growth
        </h2>

        <button
          className="
            bg-white text-gray-800 font-medium 
            px-6 py-3 md:py-2 rounded-md hover:bg-gray-100 transition
            text-base md:text-lg w-full max-w-xs mx-auto md:w-auto md:mx-0
          "
        >
          Explore Freelancers
        </button>
      </div>
    </div>
           <Footer/>
        </section>

      </main>
    </div>
  );
};

export default Index;