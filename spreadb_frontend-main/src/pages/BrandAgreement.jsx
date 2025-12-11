import React, { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const BrandOwnerAgreement = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Main Content Area */}
      <div className="pt-16 md:pt-20 lg:pt-[100px] pb-8 md:pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-purple-200">
          
          {/* Title Section */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 text-center mb-2 sm:mb-3">
              Brand Owner Collaboration Agreement
            </h1>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-center">
              Terms & Conditions
            </h3>
          </div>

          {/* Agreement Content */}
          <div className="space-y-6 md:space-y-8 text-gray-800 leading-relaxed text-sm sm:text-base">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                1. Professional Conduct
              </h2>
              <p className="text-justify">
                Brand owners must maintain clean, respectful, and professional communication with influencers throughout the collaboration.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                2. Authentic Promotion Requirements
              </h2>
              <p className="text-justify">
                All promotion details, expectations, and descriptions provided by the brand must be careful and truthful. False claims, misleading instructions, or hidden requirements are strictly prohibited.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                3. Platform Compliance
              </h2>
              <p>All promotions must follow:</p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Instagram Guidelines</li>
                <li>YouTube Guidelines</li>
                <li>ASCI / FTC Advertising Standards</li>
                <li>SpreadB Community Guidelines</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                4. Content Usage Rights
              </h2>
              <p className="text-justify">
                Brand owners will receive non-exclusive rights to use the influencer's content only for the duration of the agreed collaboration.
              </p>
              <p className="mt-2 text-justify">
                Content cannot be resold, heavily modified, or used outside the approved period without influencer consent.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                5. Payment Responsibility
              </h2>
              <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                <li>Ensure sufficient balance in SpreadB wallet before posting promotions.</li>
                <li>Make timely payments for collaborations.</li>
                <li>Pay additional charges if influencer performs extra work beyond the original scope.</li>
              </ul>
              <p className="mt-2 text-justify">
                Payment will be released to the influencer only after:
              </p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Brand owner approval, OR</li>
                <li>Auto-approval after the platform's review period</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                6. Clear Deliverable Instructions
              </h2>
              <ul className="list-disc ml-4 sm:ml-6 space-y-1">
                <li>Accurate briefs</li>
                <li>Required scripts and guidelines</li>
                <li>Brand assets (logos, hashtags, captions, etc.)</li>
                <li>Required formats & instructions</li>
              </ul>
              <p className="mt-2 text-gray-700 font-medium">
                Misleading or incomplete instructions may lead to collaboration cancellation.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                7. Revision Policy
              </h2>
              <p className="text-justify">
                Influencers must complete minor revisions if within the agreed scope.  
                Brand owners cannot demand major changes not included in the initial brief.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                8. Confidentiality
              </h2>
              <p className="text-justify">
                All influencer details, performance metrics, pricing, and discussions must remain confidential.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                9. Prohibited Activities
              </h2>
              <p>Brand owners must not:</p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Ask influencers to post false or harmful content</li>
                <li>Force political or sensitive content</li>
                <li>Request illegal or unethical promotional activities</li>
                <li>Misuse influencer personal information</li>
                <li>Change scope after acceptance without extra payment</li>
              </ul>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                10. Cancellation Rights
              </h2>
              <p>SpreadB & Influencer can cancel the collaboration if:</p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Brand owner provides fraudulent information</li>
                <li>Terms & policies are violated</li>
                <li>Payment is not made</li>
                <li>Clear deliverables are not provided</li>
              </ul>
            </div>

            {/* Checkbox Section */}
            <div className="mt-6 md:mt-8 flex items-start gap-3 sm:gap-4 bg-purple-50 p-4 sm:p-5 rounded-lg">
              <input
                type="checkbox"
                id="brand-agreement-checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className="mt-1 h-5 w-5 sm:h-6 sm:w-6 accent-purple-600 cursor-pointer flex-shrink-0"
              />
              
              <label htmlFor="brand-agreement-checkbox" className="cursor-pointer">
                <p className="text-gray-800 font-medium text-sm sm:text-base">
                  I confirm that I have read, understood, and agree to all the collaboration
                  requirements mentioned in this Brand Owner agreement.
                </p>
              </label>
            </div>

            {/* Continue Button */}
            <div className="mt-6 md:mt-8">
              <button
                disabled={!accepted}
                className={`w-full py-3 px-4 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold transition-all duration-200
                  ${accepted
                      ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-md hover:shadow-lg"
                      : "bg-gray-200 sm:bg-gray-300 text-gray-400 sm:text-gray-500 cursor-not-allowed"
                  }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrandOwnerAgreement;