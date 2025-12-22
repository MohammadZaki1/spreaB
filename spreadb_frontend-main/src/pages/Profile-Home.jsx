import Header from "../components/Navbar";
import { Button } from "../components/ui/button";


const  Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Section */}
        <div className="space-y-8">
          {/* Logo */}
          <div className="w-32 h-32">
            <img 
              src={'curve.png'} 
              alt="Wave Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Heading and Subheading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Welcome, Kousic!
              <br />
              Let's start with your
              <br />
              first work post
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              It's the fastest way to meet the top talent. Get help from AI and be done in no time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="font-medium bg-purple-600 text-white">
              Get Started using AI
            </Button>
            <Button variant="outline" size="lg" className="font-medium">
              I'll do it without AI
            </Button>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="relative hidden lg:block">
          {/* Main Collaboration Chart Illustration */} 
          <div className="relative z-10">
            <img 
              src={'curve1.png'} 
              alt="Collaboration illustration" 
              className="w-full max-w-lg ml-auto"
            />
          </div>

          {/* Person Walking Illustration - Bottom Right */}
          <div className="absolute bottom-0 right-0 w-64 transform translate-y-8">
            <img 
              src={'curve2.png'} 
              alt="Person walking" 
              className="w-full"
            />
          </div>

          {/* Decorative Geometric Shapes */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-accent rotate-45 opacity-60" />
          <div className="absolute top-40 right-32 w-3 h-3 bg-primary rotate-45 opacity-40" />
          <div className="absolute bottom-32 left-12 w-5 h-5 bg-accent rotate-45 opacity-50" />
          <div className="absolute bottom-48 right-48 w-3 h-3 bg-muted-foreground rotate-45 opacity-30" />
          <div className="absolute top-1/2 right-4 w-4 h-4 bg-primary/30 rotate-45" />
        </div>
      </div>

      
      </main>
    </div>
  );
};

export default Profile;



