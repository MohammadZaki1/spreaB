// HowToHire.jsx - Premium Redesign (Background only in hero)
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle, 
  Shield, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  Award,
  BarChart,
  Star,
  FileText,
  Play,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Target,
  Zap,
  Globe,
  BarChart3,
  ThumbsUp,
  Sparkles,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Check,
  Brain,
  PieChart,
  ShieldCheck,
  BadgeCheck,
  Heart
} from 'lucide-react';
import Header from "../components/Navbar";
import Footer from "../components/Footer";

// Background image ONLY for hero section (Replace with your actual image)
const heroBgImage = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

const HowToHire = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const hiringProcess = [
    {
      step: "01",
      title: "Define Your Vision",
      description: "Start by outlining your campaign objectives, target audience, and success metrics.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Set clear KPIs and ROI expectations",
        "Identify target demographics",
        "Establish campaign timeline",
        "Define content requirements"
      ]
    },
    {
      step: "02",
      title: "Discover Top Talent",
      description: "Use our AI-powered platform to find creators that perfectly match your brand.",
      icon: <Search className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "AI matching based on 50+ parameters",
        "Advanced filters by niche & platform",
        "Audience authenticity verification",
        "Performance analytics preview"
      ]
    },
    {
      step: "03",
      title: "Evaluate & Connect",
      description: "Review detailed creator profiles and initiate conversations seamlessly.",
      icon: <UsersIcon className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "View complete creator portfolios",
        "Access engagement rate analysis",
        "Check past campaign performance",
        "Direct messaging platform"
      ]
    },
    {
      step: "04",
      title: "Collaborate & Create",
      description: "Work together with creators to develop compelling content for your audience.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Content brief creation tools",
        "Milestone tracking",
        "Real-time collaboration",
        "Feedback and approval system"
      ]
    },
    {
      step: "05",
      title: "Launch & Optimize",
      description: "Deploy your campaign and monitor performance with real-time analytics.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      features: [
        "Scheduled content publishing",
        "Real-time performance dashboards",
        "ROI tracking and analysis",
        "A/B testing capabilities"
      ]
    },
    {
      step: "06",
      title: "Measure & Scale",
      description: "Analyze results and build long-term partnerships with top-performing creators.",
      icon: <TrendingUpIcon className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      features: [
        "Comprehensive campaign reports",
        "Performance benchmarking",
        "Creator relationship management",
        "Scaling recommendations"
      ]
    }
  ];

  const platformBenefits = [
    {
      title: "Intelligent Matching",
      description: "Our AI analyzes 50+ data points to match you with creators who align perfectly with your brand values and campaign goals.",
      icon: <Brain className="w-6 h-6" />,
      stat: "95% Match Accuracy"
    },
    {
      title: "Risk-Free Hiring",
      description: "Secure escrow payments, comprehensive contracts, and satisfaction guarantees ensure a worry-free collaboration experience.",
      icon: <ShieldCheck className="w-6 h-6" />,
      stat: "100% Payment Protection"
    },
    {
      title: "Real-Time Analytics",
      description: "Track campaign performance, engagement metrics, and ROI in real-time with our advanced analytics dashboard.",
      icon: <PieChart className="w-6 h-6" />,
      stat: "Live Performance Data"
    },
    {
      title: "Expert Support",
      description: "Access dedicated campaign managers and influencer marketing experts throughout your entire journey.",
      icon: <BadgeCheck className="w-6 h-6" />,
      stat: "24/7 Campaign Support"
    }
  ];

  const influencerTypes = [
    {
      category: "Micro-Influencers",
      followers: "10K - 100K",
      engagement: "High",
      description: "Perfect for authentic brand storytelling and community engagement",
      bestFor: ["Product Reviews", "Community Building", "Local Campaigns"],
      price: "$500 - $5,000",
      icon: <Users className="w-6 h-6" />
    },
    {
      category: "Mid-Tier Influencers",
      followers: "100K - 500K",
      engagement: "Strong",
      description: "Ideal for broader reach while maintaining audience connection",
      bestFor: ["Brand Awareness", "Campaign Launches", "Product Demos"],
      price: "$5,000 - $20,000",
      icon: <Target className="w-6 h-6" />
    },
    {
      category: "Macro-Influencers",
      followers: "500K - 1M+",
      engagement: "Moderate",
      description: "Maximum visibility and credibility for major campaigns",
      bestFor: ["Mass Awareness", "Credibility Boost", "Major Launches"],
      price: "$20,000 - $100,000+",
      icon: <Globe className="w-6 h-6" />
    },
    {
      category: "Niche Experts",
      followers: "Varies",
      engagement: "Very High",
      description: "Specialized influencers with deep expertise in specific industries",
      bestFor: ["B2B Marketing", "Technical Products", "Specialized Audiences"],
      price: "$1,000 - $50,000",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "How does SpreadB ensure influencer authenticity and engagement quality?",
      answer: "We implement a multi-layered verification system: 1) Automated authenticity scoring based on engagement patterns, 2) Manual profile verification by our team, 3) Continuous performance monitoring. Our AI detects inauthentic engagement patterns, and all creators must maintain a minimum authenticity score to remain on the platform. You'll have access to detailed audience demographics, engagement rate history, and past campaign performance data for every creator."
    },
    {
      id: 2,
      question: "What's the typical timeline for launching an influencer campaign?",
      answer: "With SpreadB, you can go from concept to launch in as little as 7 days. Our fastest campaigns typically follow this timeline: Day 1-2: Define campaign & search for creators. Day 3-4: Review proposals & negotiate terms. Day 5-6: Finalize contracts & create content. Day 7: Launch campaign. For more complex campaigns with multiple influencers, we recommend a 2-3 week timeline to ensure optimal preparation and coordination."
    },
    {
      id: 3,
      question: "How do you handle payment and contract agreements?",
      answer: "We provide a secure, end-to-end platform for all financial and legal aspects. Payments are held in escrow until you approve deliverables, with 100% protection against non-delivery. Our platform includes legally-vetted contract templates that can be customized for your needs. All negotiations, agreements, and payments are processed through our secure system, providing complete transparency and protection for both brands and creators."
    },
    {
      id: 4,
      question: "Can I manage multiple influencers across different platforms in one campaign?",
      answer: "Absolutely! Our platform is designed for multi-platform campaign management. You can coordinate creators across Instagram, YouTube, TikTok, Twitter, LinkedIn, and more from a single dashboard. We provide cross-platform analytics, unified communication tools, and centralized content approval workflows. Many brands use our platform to run integrated campaigns that span multiple social channels with cohesive messaging and coordinated timing."
    },
    {
      id: 5,
      question: "What kind of ROI can I expect from influencer marketing?",
      answer: "On average, our clients see a 5-11x ROI on their influencer marketing investments. However, results vary based on campaign goals: Brand awareness campaigns typically achieve 2-5x ROI, while conversion-focused campaigns can reach 8-15x ROI. We provide detailed ROI tracking tools and benchmarking against industry standards in your niche. Our success team works with you to optimize campaigns for maximum return."
    }
  ];

  const handleStartHiring = () => {
    console.log('Starting hiring process');
    // Replace with: navigate('/start-hiring');
  };

  const handleWatchDemo = () => {
    console.log('Watching demo');
    // Replace with: window.open('/demo-video', '_blank');
  };

  const handleExploreCreators = () => {
    console.log('Exploring creators');
    // Replace with: navigate('/creators');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* HERO SECTION WITH BACKGROUND IMAGE - ONLY THIS SECTION HAS BACKGROUND */}
      <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(147, 51, 234, 0.9)), url(${heroBgImage})`,
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">Trusted by 5,000+ Leading Brands</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover & Collaborate with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"> World-Class Creators</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              SpreadB connects visionary brands with authentic influencers to create campaigns that 
              inspire action, build community, and deliver measurable results. Our platform makes 
              influencer marketing accessible, effective, and rewarding.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={handleStartHiring}
                className="group bg-white text-purple-700 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              >
                <span>Start Your First Campaign</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleWatchDemo}
                className="group bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                <span>View Platform Tour</span>
              </button>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "10,000+", label: "Verified Creators", icon: <CheckCircle className="w-5 h-5" /> },
                { value: "98%", label: "Client Satisfaction", icon: <ThumbsUp className="w-5 h-5" /> },
                { value: "50K+", label: "Campaigns Delivered", icon: <TrendingUp className="w-5 h-5" /> },
                { value: "4.9/5", label: "Platform Rating", icon: <Star className="w-5 h-5" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      <main className="relative">
        {/* The SpreadB Advantage Section - NO BACKGROUND IMAGE */}
        <section className="py-20 bg-gradient-to-b from-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold mb-4">
                Why SpreadB Stands Out
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Streamlined Success from Start to Finish
              </h2>
              <p className="text-gray-600 text-lg">
                We've reimagined influencer collaboration with a platform that combines 
                intelligent technology with human expertise to deliver exceptional results.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {platformBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="absolute -top-4 left-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-purple-500 to-pink-500' : index === 1 ? 'from-blue-500 to-cyan-500' : index === 2 ? 'from-green-500 to-emerald-500' : 'from-yellow-500 to-orange-500'} p-3 text-white`}>
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="pt-8">
                    <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700">
                      {benefit.stat}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Preview */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent"></div>
              </div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                {hiringProcess.slice(0, 3).map((step, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg`}>
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Proven Process Section - NO BACKGROUND IMAGE */}
        <div className="py-20 bg-gradient-to-b from-white to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Six-Step Success Framework
              </h2>
              <p className="text-gray-600 text-lg">
                A structured approach that transforms creative collaboration into measurable business results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {hiringProcess.map((step, index) => (
                <div 
                  key={index}
                  className={`group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl ${
                    index === activeStep ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-bold text-purple-600">STEP {step.step}</span>
                        {index === activeStep && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ACTIVE</span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      {index === activeStep && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Key Features</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {step.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-700">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Navigation */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                {hiringProcess.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeStep 
                        ? 'bg-purple-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Influencer Types Section - NO BACKGROUND IMAGE */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold mb-4">
                Find Your Perfect Match
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Choose the Right Creator Type for Your Goals
              </h2>
              <p className="text-gray-600 text-lg">
                Different objectives require different approaches. Discover which influencer 
                category aligns best with your campaign goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {influencerTypes.map((type, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-3xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        {type.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{type.category}</h3>
                        <div className="text-sm text-gray-500">{type.followers} followers</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-sm font-bold text-gray-500 mb-2">BEST FOR</div>
                      <div className="space-y-2">
                        {type.bestFor.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-bold text-gray-500 mb-1">ENGAGEMENT</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-full rounded-full ${
                              type.engagement === 'High' || type.engagement === 'Very High' 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}
                            style={{ 
                              width: type.engagement === 'Very High' ? '90%' : 
                                     type.engagement === 'High' ? '80%' : 
                                     type.engagement === 'Strong' ? '70%' : '60%'
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{type.engagement}</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm font-bold text-gray-500 mb-1">TYPICAL BUDGET</div>
                      <div className="text-2xl font-bold text-gray-900">{type.price}</div>
                    </div>
                    
                    <button 
                      onClick={handleExploreCreators}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      Explore {type.category}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section - NO BACKGROUND IMAGE */}
        <div className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">Success Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Transformative Results for Brands Like Yours
              </h2>
              <p className="text-white/90 text-lg">
                Discover how leading companies achieve exceptional ROI through strategic 
                influencer partnerships on SpreadB
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { metric: "8.2x", label: "Average ROI", description: "Across all campaign types" },
                { metric: "94%", label: "Client Retention", description: "Brands who return for more campaigns" },
                { metric: "3.5M+", label: "Collective Reach", description: "Across our creator network" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="text-5xl font-bold text-white mb-3">{stat.metric}</div>
                  <div className="text-xl font-bold text-white mb-2">{stat.label}</div>
                  <div className="text-white/80">{stat.description}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => console.log('View case studies')}
                className="group bg-white text-purple-700 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 mx-auto"
              >
                View Complete Case Studies
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section - NO BACKGROUND IMAGE */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Your Questions, Answered
                </h2>
                <p className="text-gray-600 text-lg">
                  Everything you need to know about getting started with SpreadB
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div 
                    key={faq.id}
                    className={`group border border-gray-200 rounded-2xl transition-all duration-300 ${
                      expandedFaq === faq.id ? 'ring-2 ring-purple-500 ring-opacity-50' : 'hover:border-purple-300'
                    }`}
                  >
                    <button
                      className="w-full text-left p-8 flex justify-between items-start gap-6"
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 mb-2">
                          {faq.question}
                        </h3>
                        {expandedFaq === faq.id && (
                          <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                        )}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        expandedFaq === faq.id 
                          ? 'bg-purple-100 text-purple-600 rotate-180' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-purple-50 group-hover:text-purple-600'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 pt-12 border-t border-gray-200">
                <p className="text-gray-600 mb-6">
                  Still have questions? Our team is here to help.
                </p>
                <button 
                  onClick={() => console.log('Contact support')}
                  className="group inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat with our experts
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - NO BACKGROUND IMAGE */}
        <div className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">Ready to Get Started?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the Future of Influencer Marketing
              </h2>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Experience the difference with a platform built for results. From discovery to 
                delivery, we provide everything you need to succeed in the world of influencer marketing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={handleStartHiring}
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span>Launch Your First Campaign</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleWatchDemo}
                  className="group bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  <span>Schedule a Demo</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>30-day risk-free trial</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Dedicated success manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowToHire;