import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function HelpCenter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-extrabold text-purple-700 text-center mb-10">
          Creator Support Hub
        </h1>

        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-16">
          Our mission is to empower creators with the tools, knowledge, and assistance needed to grow and thrive. Explore our key resources designed to guide you every step of the way.
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Tutorials */}
          <section className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Getting Started Tutorials</h2>
            <p className="text-gray-600">
              Learn how to set up your creator profile, upload your content, and maximize your reach through our comprehensive tutorials designed for beginners and experienced creators alike.
            </p>
          </section>

          {/* Best Practices Guides */}
          <section className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Best Practices & Growth Guides</h2>
            <p className="text-gray-600">
              Discover strategies for audience engagement, content monetization, and platform optimization to help you expand your presence and revenue effectively.
            </p>
          </section>

          {/* Direct Support */}
          <section className="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Direct Support & Assistance</h2>
            <p className="text-gray-600">
              Encounter challenges or have specific questions? Our dedicated support team is available to provide personalized help, ensuring your creative journey remains smooth and successful.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
