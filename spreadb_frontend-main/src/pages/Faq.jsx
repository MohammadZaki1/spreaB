import { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-purple-200 py-4 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-lg font-semibold text-purple-900 group-hover:text-purple-700 transition">
          {question}
        </span>

        <span
          className={`text-2xl text-purple-700 transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Animated Answer */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-md shadow-sm">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
 const faqList = [
  {
    question: "What is this website about?",
    answer:
      "This website is a platform where users can explore our features, services, and resources.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team through email or the contact form on the Contact page.",
  },
  {
    question: "Is there any subscription fee?",
    answer:
      "Most features are free, but we offer premium options for enhanced functionality.",
  },
  {
    question: "Can I use this website on mobile devices?",
    answer:
      "Yes! The website is fully responsive and optimized for all screen sizes and devices.",
  },
  {
    question: "How secure is my personal data?",
    answer:
      "We use industry-standard security practices to ensure your information is encrypted and fully protected.",
  },
  {
    question: "How often is new content uploaded?",
    answer:
      "We update our platform regularly with new features, resources, and improvements for users.",
  },
];

  return (
    <div>
          <Header />

    <div className="min-h-screen bg-gradient-to-b from-white-100 via-purple-50 to-white pt-24">
      {/* Header */}
    
      {/* Page Container */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-center text-purple-800 drop-shadow mb-12">
          Frequently Asked Questions
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-purple-200 backdrop-blur">
          {faqList.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </div>
  );
};

export default FAQ;
