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
      <main className="mt-[90px] overflow-hidden"> {/* Header height */}
        
        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center"
          style={{ minHeight: "calc(100vh - 80px)" }} // fills remaining viewport
        >

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/spred.jpg)" }}
          >
            <div className="absolute inset-0 bg-purple-700/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto text-center md:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 leading-tight max-w-3xl mx-auto md:mx-0">
                Connecting clients in need to freelancers who deliver
              </h1>

              <HeroSearch />
            </div>
          </div>

        </section>

        {/* Other Sections */}
        <section className="z-10 relative py-20 text-center">
         <Categories/>
          <Howitworks/>
           <div className="w-full flex justify-center items-center py-10 px-4">
      <div
        className="w-full max-w-7xl rounded-3xl 
        bg-gradient-to-r from-purple-400 via-purple-400 to-orange-400
        text-white text-center py-14 px-6"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Find your next hire for a short task or long-term growth
        </h2>

        <button
          className="
            bg-white text-gray-800 font-medium 
            px-6 py-2 rounded-md hover:bg-gray-100 transition
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
