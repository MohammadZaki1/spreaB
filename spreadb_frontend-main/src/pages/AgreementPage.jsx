import React, { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const AgreementPage = () => {
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
              Influencer Collaboration Agreement
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
                Influencers must maintain respectful and professional communication with brands
                throughout the collaboration.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                2. Authentic Engagement
              </h2>
              <p className="text-justify">
                All follower counts, engagement metrics, and audience details must be accurate.
                Fake followers or bot-generated engagement is strictly prohibited.
              </p>
              <p className="mt-2 font-semibold">Promotional content must follow:</p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Instagram Guidelines</li>
                <li>YouTube Guidelines</li>
                <li>ASCI / FTC Advertising Standards</li>
                <li>SpreadB Community Guidelines</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                3. Content Ownership
              </h2>
              <p className="text-justify">
                Influencers own their content but grant non-exclusive rights to the brand to use
                the content during the collaboration period.
              </p>

              <p className="mt-2">Influencers must deliver:</p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Agreed content (Reels, Stories, Posts, Videos)</li>
                <li>Within the expected timeline</li>
                <li>In the required format</li>
                <li>Following brand instructions</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                4. Revision Policy
              </h2>
              <p className="text-justify">
                Minor revisions must be accepted if they fall within the agreed promotion scope.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                5. Payment Release
              </h2>
              <p className="text-justify">
                SpreadB wallet payment will be released only after brand approval.
              </p>
              <p className="text-justify">
                Auto-approval applies after the platform review period.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                6. Confidentiality
              </h2>
              <p className="text-justify">
                All brand briefs, internal details, scripts, and pricing must remain confidential.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                7. Prohibited Activities
              </h2>
              <p>Influencers must not:</p>
              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Post false or misleading content</li>
                <li>Use copyrighted music illegally</li>
                <li>Delete agreed content before required duration</li>
                <li>Engage in offensive, hateful, or dangerous content</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1 sm:mb-2">
                8. Cancellation Rights
              </h2>
              <p className="text-justify">
                SpreadB & the brand can cancel the collaboration if:
              </p>

              <ul className="list-disc ml-4 sm:ml-6 mt-1 space-y-1">
                <li>Information is fraudulent</li>
                <li>Terms & policies are violated</li>
                <li>Deliverables are not provided</li>
              </ul>
            </div>

            {/* Checkbox Section */}
            <div className="mt-6 md:mt-8 flex items-start gap-3 sm:gap-4 bg-purple-50 p-4 sm:p-5 rounded-lg">
              <input
                type="checkbox"
                id="agreement-checkbox"
                checked={accepted}
                onChange={() => setAccepted(!accepted)}
                className="mt-1 h-5 w-5 sm:h-6 sm:w-6 accent-purple-600 cursor-pointer flex-shrink-0"
              />
              
              <label htmlFor="agreement-checkbox" className="cursor-pointer">
                <p className="text-gray-800 font-medium leading-relaxed text-sm sm:text-base">
                  I confirm that I understand and accept the collaboration requirements mentioned
                  in this agreement.
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

export default AgreementPage;