import React from "react";

const UpgradePromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-success/20 to-info/20 rounded-lg p-6 text-center">
      <h3 className="font-semibold text-lg text-foreground mb-2">Upgrade to Pro!</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get more features and premium support.
      </p>
      <button className="px-4 py-2 bg-success text-success-foreground rounded hover:bg-success/90">
        Upgrade Now
      </button>
    </div>
  );
};

export default UpgradePromoBanner;
