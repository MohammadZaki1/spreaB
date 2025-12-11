import { Avatar, AvatarFallback } from "../components/ui/avatar";

import { Button } from "../components/ui/button";
import { CheckCircle2, MapPin, Share2 } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <div className="bg-card border-b border-border px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <img 
              src={'icon.png'} 
              alt="Wave Logo" 
              className="w-full h-full object-contain"
            />
              <AvatarFallback>MG</AvatarFallback>
            </Avatar>

            {/* Online Status */}
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white border-4 border-card"></div>
            <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-purple-700 border border-border flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-purple-700"></div>
            </div>
          </div>

          <div className="bg-white">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-semibold text-foreground">Roopa Ampavilli.</h1>
              <CheckCircle2 className="h-6 w-6 text-info fill-info" />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Bengaluru, India – 6:57 am local time</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-purple-700 text-purple-700  hover:bg-success/10">
            See public view
          </Button>
          <Button className="  bg-purple-700 hover:bg-success/90 text-white">
            Profile settings
          </Button>
          <Button variant="ghost" size="icon" className="text-success">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
