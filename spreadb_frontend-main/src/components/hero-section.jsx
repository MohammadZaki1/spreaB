import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState("talent");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("talent")}
          className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
            activeTab === "talent"
              ? "bg-purple-600 text-white"
              : "text-black hover:text-purple-700"
          }`}
        >
          Find talent
        </button>

        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
            activeTab === "jobs"
              ? "bg-purple-600 text-white"
              : "text-black hover:text-purple-700"
          }`}
        >
          Browse jobs
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search by role, skills, or keywords"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 h-14 pl-6 pr-4 rounded-full text-base bg-background border-0 focus-visible:ring-2 focus-visible:ring-accent"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />

        <Button
          onClick={handleSearch}
          size="lg"
          className="h-14 px-8 rounded-full bg-primary hover:bg-purple-700 text-primary-foreground font-medium border-1 border-purple-700  p-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <Search className="w-5 h-5 mr-2 text-accent" />
          Search
        </Button>
      </div>

      {/* Company Logos */}
      <div className="mt-8 flex items-center justify-center gap-8 opacity-60">

        {/* Microsoft */}
        <div className="flex items-center gap-2 text-white/70">
          <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
            <div className="bg-black"></div>
            <div className="bg-black"></div>
            <div className="bg-black"></div>
            <div className="bg-black"></div>
          </div>
          <span className="text-sm font-medium">Microsoft</span>
        </div>

        {/* Airbnb */}
        <div className="flex items-center gap-2 text-black">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-sm font-medium">airbnb</span>
        </div>

        {/* Glassdoor */}
        <div className="text-black text-sm font-bold tracking-wider">
          ★GLASSDOOR®
        </div>

      </div>
    </div>
  );
};

export default HeroSearch;
