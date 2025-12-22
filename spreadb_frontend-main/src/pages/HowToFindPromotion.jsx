import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function Howtofindpromotion() {
  return (
    <div>
      <Header />

      <div className="bg-gray-50 text-gray-800 mt-10">

        {/* HERO SECTION (UNCHANGED) */}
        <section className="relative h-[50vh] mt-20">
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1470&q=80')`,
            }}
          ></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
              How to Find the Promotion
            </h1>

            <p className="mt-5 text-xl md:text-2xl text-white/90 max-w-3xl">
              A simple guide to locating your promotions quickly inside the platform.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-20 max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center">
            Understanding Your Promotions
          </h2>

          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            Promotions help you discover new opportunities, rewards, and offers available 
            within the platform. The process of locating them is simple and smooth, ensuring 
            that you never miss out on important updates.
          </p>

         
          {/* GRID CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                Access Your Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Start by navigating to your account dashboard. This is where all key shortcuts 
                and updates related to your profile can be found.
              </p>
            </div>


            
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                Navigate to Promotions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Look for the Promotions or Rewards section. This is typically displayed on the 
                main menu or the homepage.
              </p>
            </div>

      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                Explore Available Offers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through the list of available offers designed to match your profile or 
                usage activity.
              </p>
            </div>


      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                View Promotion Details
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Click any promotion to see eligibility criteria, duration, benefits, and steps 
                for activation.
              </p>
            </div>


            
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                Activate or Participate
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Some promotions may allow you to activate or redeem the offer immediately. 
                Follow the given instructions if required.
              </p>
            </div>


             
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                      transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold text-purple-700 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Turn on notifications to receive updates about new promotions, personalized 
                offers, and time-sensitive deals.
              </p>
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </div>
  );
}
