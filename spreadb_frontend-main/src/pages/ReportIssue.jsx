import { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    contactEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show alert (placeholder for backend integration)
    alert("Thank you for reporting an issue. Our team will review it shortly.");
    setFormData({ title: "", category: "", description: "", contactEmail: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          Report an Issue
        </h1>

        <p className="text-center text-gray-700 mb-12 leading-relaxed">
          Encountered a problem or unexpected behavior? Please provide detailed information below so our Creator Support team can assist you efficiently.  
          Including your contact email helps us reach out with updates or follow-up questions.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-3xl p-10 border border-gray-200"
        >
          {/* Issue Title */}
          <div className="mb-8">
            <label
              htmlFor="title"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Issue Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Brief summary of the issue"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          {/* Category */}
          <div className="mb-8">
            <label
              htmlFor="category"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="account">Account Issues</option>
              <option value="upload">Content Upload</option>
              <option value="payment">Payments & Monetization</option>
              <option value="bug">Bug Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Detailed Description */}
          <div className="mb-8">
            <label
              htmlFor="description"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              required
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            ></textarea>
          </div>

          {/* Optional Contact Email */}
          <div className="mb-10">
            <label
              htmlFor="contactEmail"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Contact Email <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              placeholder="your.email@example.com"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-5 rounded-2xl shadow-lg transition transform hover:scale-[1.02]"
          >
            Submit Issue
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
} 