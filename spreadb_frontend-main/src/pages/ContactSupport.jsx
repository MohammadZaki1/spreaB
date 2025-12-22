import { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting support. We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          Contact Support
        </h1>

        <p className="text-center text-gray-700 mb-12 leading-relaxed">
          Need direct assistance? Reach out to our support team for personalized help.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-3xl p-10 border border-gray-200 max-w-xl mx-auto"
        >
          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="2"
              required
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-5 rounded-2xl shadow-lg transition transform hover:scale-[1.02]"
          >
            Send Message
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
