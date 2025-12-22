// src/pages/TermsConditions.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const TermsConditions = () => {
  const navigate = useNavigate();
  const lastUpdated = "[Add Date]";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToLogin = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Back Button */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            SPREADB – TERMS & CONDITIONS
          </h1>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>

        <div className="mb-8">
          <p className="text-gray-700">
            Welcome to SpreadB. By accessing or using our website, mobile application, 
            or services, you agree to comply with and be bound by these Terms & Conditions. 
            Please read them carefully.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. About SpreadB</h2>
            <p className="text-gray-700">
              SpreadB is a digital collaboration platform that connects Brand Owners with 
              Influencers for marketing and promotional collaborations. SpreadB facilitates 
              discovery, communication, agreements, and payments but does not directly 
              participate in content creation.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. User Eligibility</h2>
            <p className="text-gray-700 mb-3">To use SpreadB, you must:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Be at least 18 years old</li>
              <li>Provide accurate and complete registration information</li>
              <li>Agree to comply with all applicable laws and platform policies</li>
            </ul>
            <p className="text-gray-700">
              SpreadB reserves the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          {/* Section 3 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. User Roles</h2>
            <p className="text-gray-700">
              SpreadB supports three user roles: Influencer, Brand Owner, and Admin. 
              Each role has specific access and responsibilities within the platform.
            </p>
          </section>

          {/* Section 4 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Account Registration & Security</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Users must keep login credentials confidential</li>
              <li>Users are responsible for all activities under their account</li>
              <li>Any unauthorized access must be reported immediately</li>
            </ul>
            <p className="text-gray-700">
              SpreadB is not liable for losses caused by compromised accounts due to user negligence.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Profile Information & Authenticity</h2>
            <p className="text-gray-700 mb-3">All users must ensure that:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Profile details are accurate and truthful</li>
              <li>Influencers provide genuine audience and engagement data</li>
              <li>Brand Owners provide honest promotion details</li>
            </ul>
            <p className="text-gray-700">
              Fake profiles, misleading information, or impersonation are strictly prohibited.
            </p>
          </section>

          {/* Section 6 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Promotions & Collaborations</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Brand Owners may post promotions using SpreadB Coins</li>
              <li>Influencers may apply for promotions using Coins</li>
              <li>Acceptance of a proposal forms a binding collaboration agreement</li>
            </ul>
            <p className="text-gray-700">
              Both parties must follow the agreed scope, timeline, and deliverables.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Agreement Acceptance</h2>
            <p className="text-gray-700 mb-3">Before starting a collaboration:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Both Influencers and Brand Owners must accept the SpreadB Collaboration Agreement</li>
              <li>Acceptance is confirmed via a mandatory tick-box</li>
            </ul>
            <p className="text-gray-700">
              Once accepted, both parties are legally bound to comply with the agreement terms.
            </p>
          </section>

          {/* Section 8 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Wallet, Coins & Payments</h2>
            <p className="text-gray-700 mb-3">
              SpreadB uses a coin-based wallet system. New users receive free coins upon signup. 
              Additional coins can be purchased through secure payment gateways.
            </p>
            <h3 className="font-medium text-gray-900 mb-2">Payment Rules:</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Coins are deducted for posting or applying to promotions</li>
              <li>Payments are released after approval or auto-approval</li>
              <li>Refunds are subject to SpreadB's refund policy</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Content Ownership & Usage</h2>
            <p className="text-gray-700">
              Influencers retain ownership of all created content. Brands receive non-exclusive, 
              limited usage rights during the collaboration period. Content cannot be reused, 
              resold, or modified beyond the agreed scope without consent.
            </p>
          </section>

          {/* Section 10 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Revisions & Deliverables</h2>
            <p className="text-gray-700">
              Minor revisions within the agreed scope must be honored. Major changes require 
              additional payment. Failure to deliver agreed content may lead to cancellation.
            </p>
          </section>

          {/* Section 11 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">11. Ratings & Reviews</h2>
            <p className="text-gray-700">
              Users may rate and review each other after collaboration. Reviews must be honest, 
              respectful, and factual. Fake or abusive reviews may be removed by SpreadB.
            </p>
          </section>

          {/* Section 12 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">12. Prohibited Activities</h2>
            <p className="text-gray-700 mb-3">Users must not:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Post illegal, harmful, misleading, or offensive content</li>
              <li>Use fake followers or engagement tools</li>
              <li>Violate advertising laws (ASCI / FTC)</li>
              <li>Misuse personal or confidential information</li>
              <li>Engage in fraud or payment manipulation</li>
            </ul>
            <p className="text-gray-700">
              Violations may result in account suspension or permanent ban.
            </p>
          </section>

          {/* Section 13 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">13. Confidentiality</h2>
            <p className="text-gray-700">
              All collaboration-related information, including: Pricing, Campaign details, 
              Personal data must remain confidential unless explicitly permitted.
            </p>
          </section>

          {/* Section 14 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">14. Dispute Resolution</h2>
            <p className="text-gray-700">
              SpreadB may mediate disputes between users. Decisions made by SpreadB in dispute 
              cases are final. SpreadB is not responsible for losses arising from user disputes.
            </p>
          </section>

          {/* Section 15 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">15. Termination of Services</h2>
            <p className="text-gray-700">
              SpreadB may suspend or terminate accounts if: Terms are violated, Fraudulent 
              activity is detected, Legal compliance is breached, Platform misuse occurs.
            </p>
          </section>

          {/* Section 16 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">16. Limitation of Liability</h2>
            <p className="text-gray-700 mb-3">SpreadB is not liable for:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-3">
              <li>Content created by users</li>
              <li>Campaign outcomes or ROI</li>
              <li>Loss of revenue or reputation</li>
              <li>External platform actions (Instagram, YouTube, etc.)</li>
            </ul>
            <p className="text-gray-700">
              Use of SpreadB is at the user's own risk.
            </p>
          </section>

          {/* Section 17 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">17. Changes to Terms</h2>
            <p className="text-gray-700">
              SpreadB may update these Terms & Conditions at any time. Continued use of 
              the platform after updates constitutes acceptance.
            </p>
          </section>

          {/* Section 18 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">18. Governing Law</h2>
            <p className="text-gray-700">
              These Terms are governed by the laws of India. Any disputes shall be subject 
              to the jurisdiction of Indian courts.
            </p>
          </section>

          {/* Section 19 */}
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">19. Contact Information</h2>
            <p className="text-gray-700 mb-3">For any questions regarding these Terms:</p>
            <ul className="list-none pl-0 text-gray-700 space-y-1">
              <li>📧 Email: support@spreadb.com</li>
              <li>📍 Location: India</li>
            </ul>
          </section>
        </div>

        {/* Acceptance Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Acceptance Confirmation</h2>
          </div>
          <p className="text-gray-700 mb-6">
            By using SpreadB, you confirm that you have read, understood, and agree to these Terms & Conditions
          </p>
          <button
            onClick={handleBackToLogin}
            className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
          >
            I Accept & Return to Login
          </button>
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;