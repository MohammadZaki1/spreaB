import { ProfileHeader } from "../components/Profile-header";
import { UpgradePromoBanner } from "../components/Upgrade-Promo";
import ProfileContent from "../components/Profile-content";  // ✅ FIXED

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />
      
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-12 gap-8">

          {/* Left Sidebar */}
          <div className="col-span-3">
            <UpgradePromoBanner />
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <ProfileContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
