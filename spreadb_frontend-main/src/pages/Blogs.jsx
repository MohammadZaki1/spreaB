import React, { useState, useEffect } from 'react';
import Header from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Calendar, ChevronRight, TrendingUp, Users, Target, Shield, Wallet,
  CheckCircle, FileText, Star, MessageSquare, DollarSign, Zap, ArrowLeft,
  BarChart, Globe, Smartphone, Heart, Award, Clock, Share2, Bookmark, Tag
} from 'lucide-react';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const allBlogs = [
    {
      id: 1,
      title: "The Rise of Micro-Influencers: Why Brands Prefer Them",
      slug: "rise-of-micro-influencers",
      date: "15/03/2024",
      readTime: "5 min read",
      author: "Rahul Sharma",
      authorRole: "Marketing Director at SpreadB",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Branding", "Influencer Marketing"],
      icon: <Users size={20} />,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Higher engagement rates (5-10% vs 1-2% for macro-influencers)",
        "Affordable promotion costs starting from ₹2,000",
        "Authentic content creation that resonates with niche audiences",
        "Strong community connections and trust",
        "Better ROI for small to medium businesses"
      ],
      description: "Discover why micro-influencers with 5K–50K followers are becoming the top choice for brands on SpreadB.",
      featured: true,
      stats: {
        engagementRate: "5-10%",
        costRange: "₹2,000 - ₹20,000",
        roi: "300-500%"
      },
      content: [
        {
          type: "section",
          title: "The Micro-Influencer Advantage",
          text: `Micro-influencers (typically 5,000 to 50,000 followers) have revolutionized influencer marketing. Unlike macro-influencers with millions of followers, micro-influencers maintain authentic connections with their audience, resulting in significantly higher engagement rates.

On SpreadB, we've observed that campaigns with micro-influencers achieve engagement rates of 5-10%, compared to 1-2% for larger influencers. This translates to better ROI for brands, especially small and medium businesses.`
        },
        {
          type: "section",
          title: "Why Brands Are Shifting Budgets",
          text: `The shift towards micro-influencers isn't just about cost savings. Brands recognize that authenticity drives conversions. Micro-influencers are often seen as trusted peers rather than distant celebrities.

Key factors driving this shift:
- Higher trust and credibility
- Niche audience targeting
- More authentic content creation
- Better audience relationships
- Affordable collaboration costs`
        },
        {
          type: "quote",
          text: "Micro-influencers are not just content creators; they're community builders who drive real engagement and conversions for brands.",
          author: "Priya Patel, CEO of SpreadB"
        },
        {
          type: "section",
          title: "How SpreadB Facilitates Micro-Influencer Collaborations",
          text: `SpreadB's platform is specifically designed to connect brands with the right micro-influencers:

1. **Advanced Matching Algorithm**: Our AI matches brands with influencers based on niche, audience demographics, and engagement rates.

2. **Budget Flexibility**: Brands can set budgets starting from ₹2,000, making it accessible for businesses of all sizes.

3. **Performance Tracking**: Real-time analytics help brands measure campaign success and ROI.

4. **Secure Payments**: Escrow system ensures both brands and influencers are protected.

5. **Quality Assurance**: Verified influencer profiles and portfolio reviews maintain quality standards.`
        }
      ],
      keyPoints: [
        "Micro-influencers achieve 5-10% engagement vs 1-2% for macro-influencers",
        "Campaign costs start from ₹2,000, making it accessible for small businesses",
        "Authentic content creation leads to higher conversion rates",
        "Niche targeting ensures relevant audience reach",
        "Long-term partnerships often develop from initial collaborations"
      ],
      relatedBlogs: [2, 6, 9]
    },
    {
      id: 2,
      title: "How to Write the Perfect Promotion Post for Your Brand",
      slug: "perfect-promotion-post-guide",
      date: "12/03/2024",
      readTime: "4 min read",
      author: "Priya Patel",
      authorRole: "Content Strategist at SpreadB",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Brand Tips", "Marketing"],
      icon: <Target size={20} />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Use a clear, attention-grabbing title",
        "Give a short description of your brand",
        "Mention deliverables (Reels, Posts, Stories)",
        "Add budget range with flexibility",
        "Set category & target audience"
      ],
      description: "A comprehensive guide to creating promotion posts that attract the right influencers on SpreadB.",
      featured: true,
      content: [
        {
          type: "section",
          title: "Crafting the Perfect Title",
          text: `Your promotion post title is the first thing influencers see. Make it count. A strong title can increase applications by up to 40%.

**Do's:**
- "Collaboration Opportunity: Fashion Brand Seeking Lifestyle Influencers"
- "Paid Partnership: Tech Product Review Campaign"
- "Brand Campaign: Beauty Products for Micro-Influencers"

**Don'ts:**
- "Need Influencers" (Too vague)
- "Looking for Someone" (Not specific)
- "Collaborate with Us" (No details)`
        },
        {
          type: "section",
          title: "Structuring Your Post Description",
          text: `A well-structured description helps influencers understand exactly what you need:

**Essential Elements:**
1. **Brand Introduction**: Briefly describe your brand and values
2. **Campaign Goals**: What do you want to achieve? (Awareness, Sales, App Installs)
3. **Deliverables**: Specify content types and quantity
4. **Timeline**: Campaign duration and deadlines
5. **Compensation**: Clear budget or product exchange details`
        },
        {
          type: "tip",
          text: "Pro Tip: Always include 'SpreadB Verified' in your post to attract quality influencers who value professionalism."
        },
        {
          type: "section",
          title: "Budget Transparency",
          text: `Being transparent about your budget saves time for both parties:

**Budget Ranges on SpreadB:**
- ₹2,000 - ₹5,000: Micro-influencer campaigns
- ₹5,000 - ₹20,000: Growing influencer collaborations
- ₹20,000 - ₹1,00,000: Established influencer partnerships
- ₹1,00,000+: Macro-influencer campaigns`
        }
      ],
      keyPoints: [
        "Clear titles increase applications by 40%",
        "Specific deliverables attract relevant influencers",
        "Transparent budgets prevent wasted time",
        "Complete profiles receive 3x more applications"
      ],
      relatedBlogs: [1, 3, 7]
    },
    {
      id: 3,
      title: "Beginner Influencers: How to Get Your First Brand Collaboration",
      slug: "first-brand-collaboration-guide",
      date: "10/03/2024",
      readTime: "6 min read",
      author: "Arjun Verma",
      authorRole: "Influencer Success Manager",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Influencer Tips", "Growth"],
      icon: <TrendingUp size={20} />,
      image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Create a clean, professional profile",
        "Add your niche and specialization",
        "Connect Instagram & YouTube accounts",
        "Upload high-quality portfolio samples",
        "Apply only to relevant promotions"
      ],
      description: "Step-by-step guide for new influencers to land their first brand deal using SpreadB platform.",
      featured: true,
      content: [
        {
          type: "section",
          title: "Building Your SpreadB Profile",
          text: `Your profile is your digital resume. Make it count:

**Essential Profile Elements:**
1. **Professional Profile Picture**: Clear, high-quality headshot
2. **Compelling Bio**: Highlight your niche, style, and unique value
3. **Content Categories**: Select up to 3 relevant categories
4. **Audience Demographics**: Be honest about your follower demographics
5. **Engagement Rate**: Authentic engagement matters more than follower count`
        },
        {
          type: "section",
          title: "Portfolio Creation Strategies",
          text: `Your portfolio shows brands what you can do:

**What to Include:**
- 5-7 best content pieces
- Variety of formats (Reels, Posts, Stories)
- Before/After examples (if applicable)
- Engagement metrics (when possible)
- Testimonials from small brands or collaborations`
        },
        {
          type: "tip",
          text: "Use SpreadB's 100 free starter coins to apply for your first 10 promotions without investment."
        },
        {
          type: "section",
          title: "Application Best Practices",
          text: `How to stand out when applying:

1. **Personalized Pitch**: Mention why you love the brand specifically
2. **Creative Ideas**: Suggest 1-2 content ideas in your application
3. **Previous Work**: Link to relevant content you've created
4. **Realistic Expectations**: Understand the brand's budget constraints
5. **Professional Response Time**: Reply within 24 hours`
        }
      ],
      keyPoints: [
        "Complete profiles get 3x more brand responses",
        "Niche specialization increases success rate by 60%",
        "100 free coins help beginners start immediately",
        "Quality over quantity in applications"
      ],
      relatedBlogs: [2, 5, 8]
    },
    {
      id: 4,
      title: "Maximizing ROI: Budget Allocation Strategies for Brands",
      slug: "maximizing-roi-budget-strategies",
      date: "08/03/2024",
      readTime: "7 min read",
      author: "Neha Kapoor",
      authorRole: "ROI Analyst at SpreadB",
      authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Brand Tips", "ROI"],
      icon: <DollarSign size={20} />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Micro vs Macro-influencer budget allocation",
        "Campaign tracking and analytics tools",
        "Performance-based payment models",
        "Long-term partnership benefits",
        "A/B testing different influencer tiers"
      ],
      description: "Learn how to allocate your influencer marketing budget effectively on SpreadB.",
      featured: false,
      content: [
        {
          type: "section",
          title: "Budget Allocation Framework",
          text: `Smart budget allocation can increase ROI by 200%:

**Recommended Allocation:**
- 60%: Micro-influencers (Highest ROI)
- 25%: Growing influencers (Scalable results)
- 10%: Established influencers (Brand building)
- 5%: Testing new platforms/formats`
        }
      ],
      keyPoints: [
        "Micro-influencers deliver 3x better ROI",
        "Testing budget should be 5-10% of total",
        "Long-term partnerships reduce costs by 30%"
      ],
      relatedBlogs: [1, 6, 9]
    },
    {
      id: 5,
      title: "Content Creation Masterclass: From Concept to Viral",
      slug: "content-creation-masterclass",
      date: "05/03/2024",
      readTime: "8 min read",
      author: "Riya Malhotra",
      authorRole: "Content Director at SpreadB",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Influencer Tips", "Content"],
      icon: <Zap size={20} />,
      image: "https://images.unsplash.com/photo-1611224683857-e4300efbee4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1611224683857-e4300efbee4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Storytelling techniques for different platforms",
        "Lighting and equipment recommendations",
        "Editing software and mobile apps",
        "Trend-jacking vs original content",
        "Engagement boosting strategies"
      ],
      description: "Advanced content creation techniques for influencers looking to level up their game.",
      featured: false,
      content: [
        {
          type: "section",
          title: "The Viral Content Formula",
          text: `While virality isn't guaranteed, these elements increase your chances:

**Essential Elements:**
1. **Hook in First 3 Seconds**: Grab attention immediately
2. **Emotional Connection**: Make viewers feel something
3. **Value Addition**: Teach, entertain, or inspire
4. **Clear Call-to-Action**: Tell viewers what to do next
5. **Platform Optimization**: Format for each platform's algorithm`
        }
      ],
      keyPoints: [
        "First 3 seconds determine 70% of retention",
        "Emotional content gets 2x more shares",
        "Educational content has highest long-term value"
      ],
      relatedBlogs: [3, 8, 10]
    },
    {
      id: 6,
      title: "SpreadB Success Story: How BrandX Scaled 300% with Micro-Influencers",
      slug: "spreadb-success-story-brandx",
      date: "02/03/2024",
      readTime: "5 min read",
      author: "Karan Mehta",
      authorRole: "Case Study Lead",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Success Stories", "Brand Growth"],
      icon: <Award size={20} />,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Initial challenge: Low brand awareness",
        "Strategy: 50 micro-influencer campaign",
        "Results: 15,000+ new customers",
        "ROI: 450% return on investment",
        "Long-term partnership benefits"
      ],
      description: "Case study of how a D2C brand achieved massive growth through SpreadB's influencer network.",
      featured: true,
      content: [
        {
          type: "section",
          title: "The Challenge",
          text: `BrandX, a sustainable fashion startup, faced:
- Low brand awareness in target demographic
- Limited marketing budget of ₹2,00,000
- Need for authentic brand representation
- Desire for measurable ROI`
        },
        {
          type: "section",
          title: "The SpreadB Solution",
          text: `We implemented a 3-phase strategy:

**Phase 1: Discovery**
- Identified 200+ relevant micro-influencers
- Filtered by engagement rate (>5%) and niche alignment
- Selected 50 influencers with authentic followings

**Phase 2: Campaign Execution**
- Provided influencers with product samples
- Gave creative freedom with brand guidelines
- Tracked performance in real-time

**Phase 3: Optimization**
- Doubled down on top-performing influencers
- Created user-generated content library
- Established long-term partnerships`
        },
        {
          type: "result",
          text: `**Campaign Results:**
- 450% ROI within 3 months
- 15,287 new customers acquired
- ₹45,00,000 in direct sales
- 500+ pieces of authentic content
- 12 long-term influencer partnerships`
        }
      ],
      keyPoints: [
        "450% ROI in 3 months",
        "15,000+ new customers acquired",
        "500+ authentic content pieces",
        "12 long-term partnerships formed"
      ],
      relatedBlogs: [1, 4, 7]
    },
    {
      id: 7,
      title: "Platform Update: New Analytics Dashboard Released",
      slug: "new-analytics-dashboard",
      date: "28/02/2024",
      readTime: "3 min read",
      author: "Tech Team",
      authorRole: "SpreadB Development Team",
      authorImage: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Platform Updates", "Features"],
      icon: <BarChart size={20} />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Real-time campaign performance tracking",
        "Engagement rate analytics",
        "Demographic insights",
        "ROI calculation tools",
        "Exportable reports"
      ],
      description: "Explore the new powerful analytics dashboard available to all SpreadB users.",
      featured: false,
      content: [
        {
          type: "section",
          title: "What's New",
          text: `**Enhanced Features:**
1. **Real-time Analytics**: Track campaign performance as it happens
2. **Demographic Insights**: Understand your audience better
3. **ROI Calculator**: Measure returns automatically
4. **Export Reports**: Download data for presentations
5. **Custom Dashboards**: Create personalized views`
        }
      ],
      keyPoints: [
        "Real-time tracking for immediate insights",
        "Automatic ROI calculations",
        "Customizable dashboard views",
        "Exportable data for analysis"
      ],
      relatedBlogs: [2, 6, 9]
    },
    {
      id: 8,
      title: "Legal Guide: Contracts and Rights for Influencers",
      slug: "legal-guide-influencer-contracts",
      date: "25/02/2024",
      readTime: "10 min read",
      author: "Legal Team",
      authorRole: "SpreadB Legal Department",
      authorImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Guides", "Legal"],
      icon: <FileText size={20} />,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Essential contract clauses",
        "Intellectual property rights",
        "Payment terms and conditions",
        "Cancellation policies",
        "Dispute resolution mechanisms"
      ],
      description: "A comprehensive legal guide for influencers navigating brand collaborations.",
      featured: false,
      content: [
        {
          type: "section",
          title: "Must-Have Contract Clauses",
          text: `**Essential Protection:**
1. **Scope of Work**: Clear deliverables and deadlines
2. **Payment Terms**: Amount, timeline, and method
3. **Content Rights**: Usage rights and duration
4. **Cancellation Policy**: Fair terms for both parties
5. **Confidentiality**: Protect sensitive information`
        }
      ],
      keyPoints: [
        "Always specify content usage rights",
        "Clear payment terms prevent disputes",
        "Cancellation policies protect both parties",
        "Confidentiality clauses are essential"
      ],
      relatedBlogs: [3, 5, 10]
    },
    {
      id: 9,
      title: "Global Trends: Influencer Marketing in 2024",
      slug: "influencer-marketing-trends-2024",
      date: "20/02/2024",
      readTime: "6 min read",
      author: "Global Team",
      authorRole: "Market Research Lead",
      authorImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Industry Trends", "Global"],
      icon: <Globe size={20} />,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "AI-powered influencer matching",
        "Sustainability-focused collaborations",
        "Short-form video dominance",
        "Localized content strategies",
        "Community-driven campaigns"
      ],
      description: "Stay ahead with the latest global trends shaping influencer marketing in 2024.",
      featured: true,
      content: [
        {
          type: "section",
          title: "Top 5 Trends for 2024",
          text: `**1. AI-Powered Matching**
Advanced algorithms will match brands with influencers based on deep audience insights, not just surface metrics.

**2. Sustainability Focus**
Brands and influencers prioritizing eco-friendly practices will see higher engagement.

**3. Hyper-Local Content**
Localized, culturally relevant content outperforms generic global campaigns.

**4. Community Building**
Focus shifts from one-off campaigns to building lasting communities.

**5. Performance-Based Compensation**
More brands will adopt pay-for-results models over fixed fees.`
        }
      ],
      keyPoints: [
        "AI matching increases campaign success by 40%",
        "Sustainable brands see 25% higher engagement",
        "Local content performs 3x better globally",
        "Community focus builds long-term value"
      ],
      relatedBlogs: [1, 4, 7]
    },
    {
      id: 10,
      title: "Mobile Optimization: Creating Content That Converts",
      slug: "mobile-optimization-content",
      date: "18/02/2024",
      readTime: "4 min read",
      author: "Digital Team",
      authorRole: "Mobile Optimization Expert",
      authorImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      category: ["Content", "Mobile"],
      icon: <Smartphone size={20} />,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      heroImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      points: [
        "Vertical video best practices",
        "Mobile-first design principles",
        "Thumb-stopping content techniques",
        "Quick-loading optimization",
        "Mobile engagement strategies"
      ],
      description: "Learn how to create content specifically optimized for mobile viewers.",
      featured: false,
      content: [
        {
          type: "section",
          title: "Mobile-First Content Creation",
          text: `**Key Principles:**
1. **Vertical Format**: 9:16 ratio for full-screen viewing
2. **Clear Typography**: Large, readable text on small screens
3. **Fast Loading**: Compress images and videos
4. **Touch-Friendly**: Easy navigation with thumb zones
5. **Short & Impactful**: Capture attention in 3 seconds or less`
        }
      ],
      keyPoints: [
        "Vertical videos get 30% more views",
        "Clear text increases comprehension by 60%",
        "Fast loading reduces drop-off by 40%",
        "Mobile-optimized content converts 2x better"
      ],
      relatedBlogs: [3, 5, 8]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: allBlogs.length },
    { id: 'Influencer Tips', name: 'Influencer Tips', count: allBlogs.filter(b => b.category.includes("Influencer Tips")).length },
    { id: 'Brand Tips', name: 'Brand Growth', count: allBlogs.filter(b => b.category.includes("Brand Tips")).length },
    { id: 'Platform Updates', name: 'Platform Updates', count: allBlogs.filter(b => b.category.includes("Platform Updates")).length },
    { id: 'Success Stories', name: 'Success Stories', count: allBlogs.filter(b => b.category.includes("Success Stories")).length },
    { id: 'Guides', name: 'Guides & Tutorials', count: allBlogs.filter(b => b.category.includes("Guides")).length },
    { id: 'Industry Trends', name: 'Industry Trends', count: allBlogs.filter(b => b.category.includes("Industry Trends")).length }
  ];

  const filteredBlogs = activeCategory === 'all'
    ? allBlogs
    : allBlogs.filter(blog => blog.category.includes(activeCategory));

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setLikes(Math.floor(Math.random() * 200) + 50); // Random likes between 50-250
    setIsLiked(false);
    setIsBookmarked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getRelatedBlogs = () => {
    if (!selectedBlog) return [];
    return allBlogs.filter(blog => 
      selectedBlog.relatedBlogs.includes(blog.id)
    );
  };

  useEffect(() => {
    // Reset to top when blog is selected
    if (selectedBlog) {
      document.title = `${selectedBlog.title} | SpreadB Blog`;
    } else {
      document.title = "Blogs | SpreadB";
    }
  }, [selectedBlog]);

  // If a blog is selected, show the detailed view
  if (selectedBlog) {
    const relatedBlogs = getRelatedBlogs();
    
    return (
      <div className="bg-white min-h-screen">
        <Header />

        {/* BREADCRUMB */}
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="text-sm text-gray-600">
            <button
              onClick={handleBackToList}
              className="hover:text-indigo-600 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to All Articles
            </button>
          </nav>
        </div>

        {/* HERO SECTION */}
        <div className="relative">
          <div className="h-96 overflow-hidden">
            <img
              src={selectedBlog.heroImage}
              alt={selectedBlog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedBlog.category.map((cat, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {selectedBlog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={selectedBlog.authorImage}
                  alt={selectedBlog.author}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="font-medium">{selectedBlog.author}</p>
                  <p className="text-sm opacity-90">{selectedBlog.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {selectedBlog.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> {selectedBlog.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ARTICLE CONTENT */}
            <div className="lg:w-2/3">
              {/* STATS CARD */}
              {selectedBlog.stats && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Key Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <p className="text-2xl font-bold text-indigo-600">{selectedBlog.stats.engagementRate}</p>
                      <p className="text-sm text-gray-600">Average Engagement Rate</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <p className="text-2xl font-bold text-indigo-600">{selectedBlog.stats.costRange}</p>
                      <p className="text-sm text-gray-600">Typical Campaign Cost</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <p className="text-2xl font-bold text-indigo-600">{selectedBlog.stats.roi}</p>
                      <p className="text-sm text-gray-600">Average ROI</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ARTICLE SECTIONS */}
              {selectedBlog.content && selectedBlog.content.map((section, index) => (
                <div key={index} className="mb-12">
                  {section.type === 'section' && (
                    <>
                      <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        {section.title}
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        {section.text.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {section.type === 'quote' && (
                    <div className="border-l-4 border-indigo-500 pl-6 py-4 my-8 bg-indigo-50 rounded-r-lg">
                      <p className="text-xl italic text-gray-700">"{section.text}"</p>
                      {section.author && (
                        <p className="text-gray-600 mt-2 font-medium">— {section.author}</p>
                      )}
                    </div>
                  )}
                  
                  {section.type === 'tip' && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                      <div className="flex items-center gap-3">
                        <Star className="w-6 h-6 text-yellow-600" />
                        <h3 className="text-lg font-bold text-gray-800">Pro Tip</h3>
                      </div>
                      <p className="text-gray-700 mt-2">{section.text}</p>
                    </div>
                  )}
                  
                  {section.type === 'result' && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-800">Results</h3>
                      </div>
                      <div className="prose prose-lg max-w-none mt-2">
                        {section.text.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-gray-700 mb-2">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* KEY POINTS */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Key Takeaways</h3>
                <div className="space-y-4">
                  {selectedBlog.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-8 border-t border-b">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Heart size={20} className={isLiked ? 'fill-red-600' : ''} />
                    <span>{likes} Likes</span>
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isBookmarked ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Bookmark size={20} className={isBookmarked ? 'fill-indigo-600' : ''} />
                    <span>Bookmark</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-500" />
                  {selectedBlog.category.map((cat, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* AUTHOR BIO */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mt-8">
                <div className="flex items-start gap-6">
                  <img
                    src={selectedBlog.authorImage}
                    alt={selectedBlog.author}
                    className="w-20 h-20 rounded-full border-4 border-white"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{selectedBlog.author}</h3>
                    <p className="text-gray-600 mb-3">{selectedBlog.authorRole}</p>
                    <p className="text-gray-700">
                      With years of experience in influencer marketing, {selectedBlog.author.split(' ')[0]} has helped
                      numerous brands achieve success through strategic influencer partnerships on SpreadB.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:w-1/3">
              {/* RELATED ARTICLES */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Related Articles</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((blog) => (
                    <button
                      key={blog.id}
                      onClick={() => handleBlogClick(blog)}
                      className="group block w-full text-left"
                    >
                      <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white transition-colors">
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                            {blog.category[0]}
                          </span>
                          <p className="font-medium text-gray-800 group-hover:text-indigo-600 mt-1 line-clamp-2">
                            {blog.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* NEWSLETTER */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Join Our Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get weekly influencer marketing insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Default view - Blog List
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* HERO */}
      <div className="w-full mt-[60px] bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Insights, Tips & Stories for{" "}
            <span className="text-yellow-300">Influencers</span> and{" "}
            <span className="text-yellow-300">Brands</span>
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Stay informed and inspired with influencer marketing strategies and community insights.
          </p>

          <div className="flex flex-wrap justify-center gap-10 mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold">100+</h2>
              <p className="opacity-75">Success Stories</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">50K+</h2>
              <p className="opacity-75">Active Creators</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">10K+</h2>
              <p className="opacity-75">Brand Campaigns</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">₹5Cr+</h2>
              <p className="opacity-75">Creator Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full border font-medium transition-all
                ${
                  activeCategory === category.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED BLOGS */}
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Featured Blogs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.filter(blog => blog.featured).map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category[0]}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-gray-500 text-sm">
                  <div className="flex items-center gap-3">
                    {blog.icon}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {blog.date}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {blog.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-xl mb-3 text-gray-800 hover:text-indigo-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>

                <ul className="mb-4 text-sm text-gray-700 space-y-1">
                  {blog.points.slice(0, 3).map((p, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <ChevronRight size={16} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBlogClick(blog)}
                  className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 hover:gap-3 transition-all"
                >
                  Read Full Article <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL BLOGS */}
      <div className="max-w-6xl mx-auto pb-20 px-6">
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  {blog.category.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-indigo-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{blog.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {blog.date}
                  </span>
                  <button
                    onClick={() => handleBlogClick(blog)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    Read <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <MessageSquare className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated with SpreadB</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get weekly insights, success stories, and platform updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;