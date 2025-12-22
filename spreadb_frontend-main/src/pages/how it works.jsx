import React, { useState } from "react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("hiring");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header with tabs */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="flex border border-gray-300 rounded-full overflow-hidden">
          {/* Tab: For hiring */}
          <button
            onClick={() => setActiveTab("hiring")}
            className={`px-5 py-2 rounded-full transition ${
              activeTab === "hiring"
                ? "bg-purple-700 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            For hiring
          </button>
          {/* Tab: For finding work */}
          <button
            onClick={() => setActiveTab("finding")}
            className={`px-5 py-2 rounded-full transition ${
              activeTab === "finding"
                ? "bg-purple-700 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            For finding work
          </button>
        </div>
      </div>

      {/* Content for each tab */}
      {activeTab === "hiring" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden bg-black">
              {/* Replace with your video */}
              <video
                src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/video/upload/brontes/hiw-v2/hiw-client.mp4"
                controls
                className="w-full rounded-xl"
              />
            </div>
            <h1 className="mt-4 text-center text-base font-bold text-[20px]">
              Posting jobs is always free
            </h1>
             <p>Generate a job post with AI or create your own and filter talent matches.</p>
             <button
      className="
        w-full 
        bg-purple-700
        hover:bg-purple-700
        text-white 
        font-semibold 
        py-3 
        mt-3
        rounded-xl
        text-center
        transition
      "
    >
      Create Job
    </button>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
              alt="Get proposals and hire"
              className="w-full max-w-md rounded-xl object-cover"
            />
            <h1 className="mt-4 text-center text-base font-bold text-[20px]">
              Get proposals and hire
            </h1>
            <p>Screen, interview, or book a consult with an expert before hiring.</p>
             <button
      className="
        w-full 
        bg-purple-600
        hover:bg-purple-700
        text-white 
        font-semibold 
        py-3 
        mt-3
        rounded-xl
        text-center
        transition
      "
    >
      Explore experts
    </button>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/hiw-v2/for_hiring_3.png"
              alt="Pay when work is done"
              className="w-full max-w-md rounded-xl object-cover"
            />
            <h1 className="mt-4 text-center text-base font-bold text-[20px]">
              Pay when work is done
            </h1>
            <p>Release payments after approving work, by milestone or upon project completion.</p>
             <button
      className="
        w-full 
        bg-purple-600
        hover:bg-purple-700
        text-white 
        font-semibold 
        py-3 
        mt-3
        rounded-xl
        text-center
        transition
      "
    >
      View Pricing
    </button>
          </div>
        </div>



      )}

      {activeTab === "finding" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden bg-black">
              {/* Replace with your video */}
              <video
                src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/video/upload/brontes/hiw-v2/hiw-freelancer.mp4"
                controls
                className="w-full rounded-xl"
              />
            </div>
            <h1 className="mt-4 text-center text-base font-bold text-[20px]">
            Find clients and remote jobs
            </h1>
             <p>Create your profile to highlight your best work and attract top clients.</p>
             <button
      className="
        w-full 
        bg-purple-700
        hover:bg-purple-700
        text-white 
        font-semibold 
        py-3 
        mt-3
        rounded-xl
        text-center
        transition
      "
    >
      Create Profile
    </button>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto,h_270/brontes/hiw-v2/for_finding_work_1.png"
              alt="Get proposals and hire"
              className="w-full max-w-md rounded-xl object-cover"
            />
            <h1 className="mt-4 text-center text-base font-bold text-[20px]">
            Submit proposals for work
            </h1>
            <p>Negotiate rates for the projects you want or reply to invites from clients.</p>
             <button
      className="
        w-full 
        bg-purple-600
        hover:bg-purple-700
        text-white 
        font-semibold 
        py-3 
        mt-3
        rounded-xl
        text-center
        transition
      "
    >
      Search Jobs
    </button>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto,h_270/brontes/hiw-v2/for_finding_work_2.png"
              alt="Pay when work is done"
              className="w-full max-w-md rounded-xl object-cover"
            />
            <h1 className="mt-4 text-center text-base font-bold text-[20px]">
              Get paid as you deliver work
            </h1>
            <p>Land a contract, do the work you love, and get paid on time.</p>
        

        
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 mt-3 rounded-xl text-center transition">
              Estimate Earnings
            </button>
          </div>
        </div>
      )}
    </div>
  ); 
};
   





export default HowItWorks;
