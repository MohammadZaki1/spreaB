import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function FreelancerPlus() {
  return (
    <div>
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1500&q=80')",
          }}
        ></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Freelancer Plus
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-white/90 max-w-3xl">
            Level up your freelancing journey with premium features, exclusive
            tools, and priority visibility.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20 bg-gray-50 text-gray-800 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-purple-700">
            Why Upgrade to Freelancer Plus?
          </h2>
          <p className="mb-8 text-lg">
            Freelancer Plus is designed for ambitious creators and freelancers
            who want to maximize their opportunities, increase income, and gain
            premium visibility. Whether you're building your personal brand or
            working with clients, Plus gives you the tools you need to grow
            faster.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {/* FEATURE CARD */}
            <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                            transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-600 mb-3">
                More Visibility
              </h3>
              <p className="text-gray-600">
                Your profile gets boosted to clients and brands — giving you
                higher chances of landing projects.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                            transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-600 mb-3">
                Premium Tools
              </h3>
              <p className="text-gray-600">
                Unlock insights, analytics, brand research tools, and direct
                promotional suggestions.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                            transition duration-300 transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-purple-600 mb-3">
                Priority Support
              </h3>
              <p className="text-gray-600">
                Get faster responses and dedicated assistance whenever you need
                help.
              </p>
            </div>
          </div>

          {/* BENEFITS LIST */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-purple-700 mb-8">
              What’s Included in Freelancer Plus
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">🔥</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Enhanced profile visibility to appear higher in search results
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">📊</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Access to advanced performance analytics and audience insights
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">🤝</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Early access to brand collaborations and client opportunities
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">💬</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Dedicated priority support for faster resolutions
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">✨</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Exclusive access to premium tutorials, guides, and learning resources
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">🎯</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Smart, tailored recommendations to grow your personal brand
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">🚀</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Professional tools to help you pitch and secure brand deals
                </p>
              </div>

              {/* New box 1 */}
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">📅</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Project management tools to track deadlines and milestones
                </p>
              </div>

              {/* New box 2 */}
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100 
                              transition duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer">
                <span className="text-2xl">🤖</span>
                <p className="mt-3 text-gray-700 font-semibold">
                  Collaboration features to communicate seamlessly with clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
