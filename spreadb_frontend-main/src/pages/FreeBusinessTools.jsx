import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Navbar"; 
import Footer from "../components/Footer";
import {
  CalculatorIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarIcon,
  HashtagIcon,
  TrophyIcon,
  BuildingOfficeIcon,
  UserIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon,
  ShieldCheckIcon,
  ChartPieIcon
} from '@heroicons/react/24/solid';

const FreeBusinessTools = () => {
    const [showStartPage, setShowStartPage] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);
    const navigate = useNavigate();

    // Image URLs from Unsplash
    const heroImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
    const brandImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
    const influencerImage = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
    const analyticsImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
    const campaignImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
    const toolsImage = "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";

    // Handle browser back/forward buttons
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash === '#start') {
                setShowStartPage(true);
            } else {
                setShowStartPage(false);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        
        // Check initial hash
        if (window.location.hash === '#start') {
            setShowStartPage(true);
        }

        // Check for tool section in URL
        const hash = window.location.hash;
        if (hash && hash.startsWith('#tool-')) {
            const toolId = hash.replace('#tool-', '');
            const tool = toolsData.find(t => t.id === toolId);
            if (tool) {
                setSelectedTool(tool);
            }
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const showStartPageHandler = () => {
        setShowStartPage(true);
        window.history.pushState({ page: 'start' }, 'Start Now - SpreadB', '#start');
    };

    const showHomePageHandler = () => {
        setShowStartPage(false);
        setSelectedTool(null);
        window.history.pushState({ page: 'home' }, 'SpreadB - Free Business Tools', '#');
        window.scrollTo(0, 0);
    };

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
        window.history.pushState({ page: 'tool' }, `${tool.title} - SpreadB`, `#tool-${tool.id}`);
        window.scrollTo(0, 0);
    };

    const closeToolView = () => {
        setSelectedTool(null);
        window.history.pushState({ page: 'home' }, 'SpreadB - Free Business Tools', '#');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <Header />
            
            <div className="mt-[60px]">
                {/* Main Content */}
                {!showStartPage && !selectedTool ? (
                    <main className="pt-6">
                        {/* Hero Section */}
                        <section className="py-16 md:py-24 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 -skew-y-6 transform origin-top-left"></div>
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                                <div className="max-w-7xl mx-auto">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        <div className="text-left">
                                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                                <span className="block text-gray-900">Free Online Tools to</span>
                                                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                    Grow Your Brand & Influence
                                                </span>
                                            </h1>
                                            <p className="text-xl text-gray-600 mb-10">
                                                SpreadB connects brands with influencers through powerful tools and analytics. 
                                                Calculate budgets, plan campaigns, and measure success with our free toolkit.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <button 
                                                    onClick={showStartPageHandler}
                                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-2xl flex items-center justify-center"
                                                >
                                                    <RocketLaunchIcon className="h-5 w-5 mr-2" />
                                                    Explore Tools
                                                </button>
                                                <button 
                                                    onClick={() => scrollToSection('tools')}
                                                    className="px-8 py-4 border-2 border-purple-600 text-purple-600 text-lg font-semibold rounded-xl hover:bg-purple-50 transition-all"
                                                >
                                                    View All Tools
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20"></div>
                                            <img 
                                                src={heroImage} 
                                                alt="Influencer collaboration" 
                                                className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 w-full h-64 md:h-96 object-cover"
                                            />
                                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                                        <ChartBarIcon className="h-6 w-6 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600">Trusted by</p>
                                                        <p className="font-bold text-lg">500+ Brands</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tools Section */}
                        <section id="tools" className="py-16 bg-white">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                        Free Online Tools for Your Business
                                    </h2>
                                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                        Professional calculators and planners designed specifically for brand-influencer collaborations
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {toolsData.map((tool, index) => (
                                        <div 
                                            key={index}
                                            className="group bg-white rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full -translate-y-16 translate-x-16"></div>
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                    <tool.icon className="h-8 w-8 text-purple-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                    {tool.title}
                                                </h3>
                                                <p className="text-gray-600 mb-6">
                                                    {tool.description}
                                                </p>
                                                <button 
                                                    className="flex items-center space-x-2 text-purple-600 font-semibold hover:text-purple-800 transition-colors"
                                                    onClick={() => handleToolClick(tool)}
                                                >
                                                    <span>Try Tool</span>
                                                    <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section id="features" className="py-16 bg-gradient-to-b from-white to-purple-50">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                        Why Choose{' '}
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            SpreadB
                                        </span>
                                        ?
                                    </h2>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20"></div>
                                        <img 
                                            src={analyticsImage} 
                                            alt="Advanced Analytics Dashboard" 
                                            className="relative rounded-2xl shadow-2xl w-full h-64 md:h-96 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="space-y-8">
                                            {featuresData.map((feature, index) => (
                                                <div 
                                                    key={index}
                                                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center flex-shrink-0">
                                                        <feature.icon className="h-6 w-6 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                            {feature.title}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                ) : selectedTool ? (
                    /* Tool Detail Page */
                    <div className="min-h-screen py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                {/* Back Button */}
                                <button 
                                    onClick={closeToolView}
                                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 mb-8 group"
                                >
                                    <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-medium">Back to Tools</span>
                                </button>

                                {/* Tool Header */}
                                <div className="bg-white rounded-2xl p-8 mb-8 border border-purple-100 shadow-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center mb-4">
                                                <selectedTool.icon className="h-8 w-8 text-purple-600" />
                                            </div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {selectedTool.title}
                                            </h1>
                                            <p className="text-gray-600 text-lg">
                                                {selectedTool.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tool Content */}
                                <div className="bg-white rounded-2xl p-8 border border-purple-100 mb-8">
                                    <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl mb-8 flex items-center justify-center">
                                        <div className="text-center">
                                            <selectedTool.icon className="h-20 w-20 text-purple-300 mx-auto mb-4" />
                                            <p className="text-gray-500">{selectedTool.title} Interface</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-gray-900">How it Works</h3>
                                            <ul className="space-y-3">
                                                <li className="flex items-start space-x-3">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-purple-600 font-bold">1</span>
                                                    </div>
                                                    <span className="text-gray-600">Input your campaign parameters</span>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-purple-600 font-bold">2</span>
                                                    </div>
                                                    <span className="text-gray-600">Adjust settings for accuracy</span>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-purple-600 font-bold">3</span>
                                                    </div>
                                                    <span className="text-gray-600">Get instant results and insights</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-gray-900">Key Benefits</h3>
                                            <ul className="space-y-3">
                                                <li className="flex items-start space-x-3">
                                                    <HandThumbUpIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">Saves time and resources</span>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <ShieldCheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">Accurate calculations</span>
                                                </li>
                                                <li className="flex items-start space-x-3">
                                                    <ChartPieIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-600">Data-driven insights</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to use this tool?</h3>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button 
                                                onClick={showStartPageHandler}
                                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                                            >
                                                Sign Up to Access
                                            </button>
                                            <button 
                                                onClick={() => navigate('/login')}
                                                className="px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
                                            >
                                                Log In
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Start Now Page */
                    <div className="min-h-screen py-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-6xl mx-auto">
                                {/* Back Button */}
                                <button 
                                    onClick={showHomePageHandler}
                                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 mb-8 group"
                                >
                                    <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                    <span className="font-medium">Back to Home</span>
                                </button>

                                {/* Page Title */}
                                <div className="text-center mb-12">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                        Get Started with{' '}
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                            SpreadB
                                        </span>
                                    </h1>
                                    <p className="text-gray-600 text-lg">
                                        Choose your path to start collaborating
                                    </p>
                                </div>

                                {/* Options Cards */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                                    {/* For Brands */}
                                    <div className="bg-white rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-6">
                                                <BuildingOfficeIcon className="h-10 w-10 text-purple-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                For Brands
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Find the perfect influencers for your marketing campaigns. 
                                                Access our tools and analytics to maximize ROI.
                                            </p>
                                            <button 
                                                onClick={() => handleNavigation('/signup/brand')}
                                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                            >
                                                Sign Up as Brand
                                            </button>
                                        </div>
                                    </div>

                                    {/* For Influencers */}
                                    <div className="bg-white rounded-2xl p-8 border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/5 to-purple-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center mb-6">
                                                <UserIcon className="h-10 w-10 text-pink-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                For Influencers
                                            </h2>
                                            <p className="text-gray-600 mb-6">
                                                Connect with brands that match your audience and content style. 
                                                Get paid for collaborations.
                                            </p>
                                            <button 
                                                onClick={() => handleNavigation('/signup/influencer')}
                                                className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                            >
                                                Sign Up as Influencer
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                                    {[
                                        { value: '500+', label: 'Brands Trust Us' },
                                        { value: '10K+', label: 'Influencers' },
                                        { value: '$5M+', label: 'Campaign Value' },
                                        { value: '95%', label: 'Satisfaction Rate' }
                                    ].map((stat, index) => (
                                        <div key={index} className="text-center p-4">
                                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                {stat.value}
                                            </div>
                                            <div className="text-gray-600">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Login Section */}
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        Already have an account?
                                    </h3>
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
                                    >
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <Footer onFreeBusinessToolsClick={showHomePageHandler} />
        </div>
    );
};

// Data for tools
const toolsData = [
    {
        id: 'budget-calculator',
        icon: CalculatorIcon,
        title: 'Influencer Budget Calculator',
        description: 'Calculate optimal budgets for influencer campaigns based on platform, reach, and engagement rates.'
    },
    {
        id: 'roi-calculator',
        icon: ChartBarIcon,
        title: 'ROI Calculator',
        description: 'Measure return on investment for influencer marketing campaigns with detailed analytics.'
    },
    {
        id: 'cost-estimator',
        icon: CurrencyDollarIcon,
        title: 'Campaign Cost Estimator',
        description: 'Estimate total costs for complete influencer campaigns including production and fees.'
    },
    {
        id: 'audience-analyzer',
        icon: UserGroupIcon,
        title: 'Audience Match Analyzer',
        description: 'Find perfect brand-influencer matches based on audience demographics and interests.'
    },
    {
        id: 'contract-generator',
        icon: DocumentTextIcon,
        title: 'Contract Generator',
        description: 'Create legally sound contracts for brand-influencer collaborations in minutes.'
    },
    {
        id: 'calendar-planner',
        icon: CalendarIcon,
        title: 'Content Calendar Planner',
        description: 'Plan and schedule influencer content across multiple platforms with our calendar tool.'
    },
    {
        id: 'hashtag-tool',
        icon: HashtagIcon,
        title: 'Hashtag Performance Tool',
        description: 'Analyze hashtag performance and discover trending tags for your niche.'
    },
    {
        id: 'tier-calculator',
        icon: TrophyIcon,
        title: 'Influencer Tier Calculator',
        description: 'Determine influencer pricing tiers based on followers, engagement, and content quality.'
    }
];

// Data for features
const featuresData = [
    {
        icon: HandThumbUpIcon,
        title: 'Brand & Influencer Matching',
        description: 'AI-powered matching algorithm connects brands with the perfect influencers for their target audience.'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Secure Transactions',
        description: 'Escrow payment system ensures secure transactions between brands and influencers.'
    },
    {
        icon: ChartPieIcon,
        title: 'Advanced Analytics',
        description: 'Comprehensive analytics dashboard to track campaign performance and ROI in real-time.'
    }
];

export default FreeBusinessTools;