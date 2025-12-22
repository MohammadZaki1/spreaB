import { ArrowRight, Pencil, X } from "lucide-react";
import { Button } from "../components/ui/button";

export const UpgradePromoBanner = () => {
  return (
    <div className="space-y-6">
      {/* Upgrade Banner */}
      <div className="bg-accent border border-success/30 rounded-lg p-5 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 h-6 w-6 text-foreground/60 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex items-start gap-3 mb-3">
          <Pencil className="h-5 w-5 text-success mt-0.5" />
          <h3 className="font-semibold text-foreground">Upgrade to Freelancer Plus</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 pl-8">
          Improve your chances of getting hired with proposal insights, profile customizations, and more perks.
        </p>
        
        <button className="pl-8 flex items-center gap-2 text-sm font-medium text-foreground hover:text-success transition-colors underline">
          Subscribe now
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Promote with Ads */}
      <div className="bg-muted rounded-lg p-5">
        <h3 className="font-semibold text-foreground mb-4">Promote with ads</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Availability badge</h4>
              <p className="text-xs text-muted-foreground">Off</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground">Boost your profile</h4>
              <p className="text-xs text-muted-foreground">Off</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
