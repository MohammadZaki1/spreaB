import { useState, useRef, useEffect } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { MdNotificationsNone } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const tabs = ["All", "Promotions", "My Applications"];

function OptionsMenu({ onClose }) {
  return (
    <div className="absolute right-0 top-full mt-1 w-60 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-30 w-[300px]">
      <button
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => {
          alert("Change notification preferences clicked");
          onClose();
        }}
      >
        <MdNotificationsNone className="text-purple-500 text-[25px]" />
       <p className="text-[14px]">Change notification preferences</p> 
        <svg
          className="ml-auto w-4 h-4 text-purple-800"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
        onClick={() => {
          alert("Delete notification clicked");
          onClose();
        }}
      >
        <MdDelete className="text-red-500 text-[22px]" />
               <p className="text-[14px]">   Delete notification</p> 
     
      </button>
    </div>
  );
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();

  const posts = [
    {
      id: 1,
      name: "Anitha M",
      time: "8h",
      text: "Hi everyone! I’m seeking a new role and would appreciate your support...",
      type: "job",
      avatar: "/icon1.jpg",
    },
    {
      id: 2,
      name: "Ciline Sanjanyaa",
      time: "10h",
      text: "posted a photo.",
      type: "photo",
      avatar: "/icon.png",
    },
    {
      id: 3,
      name: "Kiran Kumar",
      time: "10h",
      text: "I’m happy to share that I’ve joined Ozrit Ai Solutions as a Backend Developer...",
      type: "text",
      avatar: "/icon1.jpg",
    },
    {
      id: 4,
      name: "Ailotte",
      time: "11h",
      text: "Big Tech Brief: This Week’s Highlights",
      type: "article",
      avatar: "/icon.png",
    },
    {
      id: 5,
      name: "Suresh Ampavilli",
      time: "8h",
      text: "Hi everyone! I’m seeking a new role and would appreciate your support...",
      type: "job",
      avatar: "/icon1.jpg",
    },
    {
      id: 6,
      name: "Roopa",
      time: "8h",
      text: "Hi everyone! I’m seeking a new role and would appreciate your support...",
      type: "job",
      avatar: "/icon.png",
    },
  ];

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    switch (activeTab) {
      case "All":
        return true;
      case "Promotions":
        return post.type === "job";
      case "My Applications":
        return post.type === "text";
      default:
        return true;
    }
  });

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-20 h-16">
        <Header className="shadow-md h-16" />
      </header>

      {/* Page content with padding-top equal to header height */}
      <main className="pt-16 w-full max-w-3xl mx-auto mt-[70px] overflow-y-auto flex-1">
        <div className="bg-purple-400 shadow-sm rounded-lg p-4">
          {/* ----------- Tabs ----------- */}
          <div className="flex gap-6 border-b pb-3 sticky top-0 bg-purple-400 z-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-white bg-purple-600 rounded-full"
                    : "text-white hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ----------- Feed Cards ----------- */}
          <div className="mt-4 space-y-4 flex-1 overflow-y-auto w-full max-w-3xl mx-auto p-4 bg-purple-300 rounded-lg">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition relative"
              >
                {/* Header row */}
                <div className="flex items-start gap-3">
                  <img
                    src={post.avatar}
                    alt={`${post.name} avatar`}
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-900">{post.name}</p>
                      <span className="text-sm text-gray-500">{post.time}</span>
                    </div>

                    <p className="text-gray-700 mt-1 text-sm">{post.text}</p>
                  </div>

                  <div className="relative" ref={menuRef}>
                    <button
                      aria-label="Post options"
                      className="text-xl text-gray-500 cursor-pointer"
                      onClick={() =>
                        setOpenMenuId(openMenuId === post.id ? null : post.id)
                      }
                    >
                      ⋮
                    </button>
                    {openMenuId === post.id && (
                      <OptionsMenu onClose={() => setOpenMenuId(null)} />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No posts to show.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
