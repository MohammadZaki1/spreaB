import React, { useState } from 'react';
import { 
  FaBars, 
  FaArrowRight, 
  FaBullseye, 
  FaEye, 
  FaRocket, 
  FaUsers, 
  FaLightbulb, 
  FaMedal, 
  FaChartLine, 
  FaHeart, 
  FaGlobe, 
  FaQuoteLeft, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaChevronRight,
  FaBalanceScale,
  FaUniversalAccess,
  FaGlobeAmericas,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook
} from 'react-icons/fa';

// Import the existing Navbar and Footer components
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const CareersPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-gray-50">
      {/* Use the existing Header component */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-emerald-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Come change the way <span className="bg-gradient-to-r from-purple-600 to-emerald-500 bg-clip-text text-transparent">brands connect</span> with influencers
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Be part of the team that's revolutionizing brand-influencer collaborations. At Spreadb, we're building the future of digital marketing where authentic connections drive real results.
              </p>
              <button 
                onClick={(e) => handleSmoothScroll(e, 'open-positions')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg inline-block hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
              >
                View Open Positions <FaArrowRight className="inline ml-2" />
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Team collaboration at Spreadb" 
                  className="rounded-2xl shadow-2xl w-full max-w-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-bold text-purple-600">180+</div>
                  <div className="text-gray-600">Countries with Spreadb talent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Spreadb exists to create authentic connections in the digital era</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spreadb is the world's leading platform connecting brands with authentic influencers. From startups to Fortune 500 companies, brands rely on Spreadb's AI-powered matching and analytics to find the perfect influencer partnerships that drive real engagement and ROI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="text-purple-600 text-4xl mb-4">
                <FaBullseye />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To empower brands and influencers to create authentic, impactful partnerships that resonate with audiences worldwide.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="text-emerald-600 text-4xl mb-4">
                <FaEye />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600">
                A world where every brand can find the perfect voice and every influencer can partner with brands they genuinely believe in.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="text-amber-600 text-4xl mb-4">
                <FaRocket />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Impact</h3>
              <p className="text-gray-600">
                We've facilitated over 500,000 brand-influencer partnerships, generating more than $2B in value for our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-emerald-500">
            Our core values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border-l-4 border-purple-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className={`${value.colorClass} p-2 rounded-lg mr-3`}>
                    {value.icon}
                  </span>
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
          
          {/* Employee Testimonial */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
                <div className="text-2xl mb-6">
                  <FaQuoteLeft className="opacity-50" />
                </div>
                <p className="text-xl mb-6">
                  "I have an opportunity to make a real impact at Spreadb. Everyone is empowered to lead, take ownership, and drive meaningful change in their areas. That's only possible because of the incredible culture of support and teamwork; it's a place where people genuinely want to see each other succeed."
                </p>
                <div>
                  <div className="font-bold text-lg">Alex Rivera</div>
                  <div className="opacity-90">Lead, Partnership Strategy</div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                  alt="Alex Rivera testimonial" 
                  className="rounded-full w-48 h-48 object-cover border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In the News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-emerald-500">
            Spreadb in the News
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl">
            Helping brands and influencers reach their full potential through authentic partnerships
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsData.map((news, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="text-sm text-purple-600 font-semibold mb-2">{news.source}</div>
                  <h3 className="text-xl font-bold mb-3">{news.title}</h3>
                  <p className="text-gray-600 mb-4">{news.description}</p>
                  <a href="#" className="text-purple-600 font-semibold flex items-center">
                    Read Now <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Commitments */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-emerald-500">
            Our Hiring Commitments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitmentsData.map((commitment, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className={`text-4xl ${commitment.iconColor} mb-4`}>
                  {commitment.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{commitment.title}</h3>
                <p className="text-gray-600 mb-4">{commitment.description}</p>
                <a href="#" className={`${commitment.linkColor} font-semibold`}>
                  Read more <FaChevronRight className="inline ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-emerald-500">
            Open Positions
          </h2>
          <p className="text-gray-600 text-lg mb-8">Join our team and help shape the future of brand-influencer partnerships.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positionsData.map((position, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{position.title}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-500 mr-4"><FaMapMarkerAlt className="inline mr-1" /> {position.location}</span>
                      <span className="text-gray-500"><FaBriefcase className="inline mr-1" /> {position.type}</span>
                    </div>
                  </div>
                  <span className={`${position.tagColor} px-3 py-1 rounded-full text-sm font-semibold`}>
                    {position.department}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{position.description}</p>
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Don't see the perfect role? We're always looking for talented people.</p>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300">
              Send General Application
            </button>
          </div>
        </div>
      </section>

      {/* Use the existing Footer component */}
      <Footer />
    </div>
  );
};

// Data arrays for mapping (unchanged)
const valuesData = [
  {
    icon: <FaUsers />,
    title: 'Play to win as a team',
    description: 'We believe in collaborative success. When our team wins together, our clients and community win too.',
    colorClass: 'bg-purple-100 text-purple-600'
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovate fearlessly',
    description: 'We\'re not afraid to challenge the status quo. We build, test, and iterate to create breakthrough solutions.',
    colorClass: 'bg-emerald-100 text-emerald-600'
  },
  {
    icon: <FaMedal />,
    title: 'Commit to excellence',
    description: 'We pursue mastery in everything we do, from product development to customer support and community building.',
    colorClass: 'bg-amber-100 text-amber-600'
  },
  {
    icon: <FaChartLine />,
    title: 'Own outcomes',
    description: 'We take responsibility for our results. Every team member is empowered to lead and drive meaningful change.',
    colorClass: 'bg-blue-100 text-blue-600'
  },
  {
    icon: <FaHeart />,
    title: 'Build authentic connections',
    description: 'Authenticity is at the heart of everything we do. We foster genuine relationships within our team and community.',
    colorClass: 'bg-pink-100 text-pink-600'
  },
  {
    icon: <FaGlobe />,
    title: 'Think globally',
    description: 'Our platform connects brands and influencers across 180+ countries. We embrace diverse perspectives and cultures.',
    colorClass: 'bg-indigo-100 text-indigo-600'
  }
];

const newsData = [
  {
    source: 'Forbes • Dec 2024',
    title: 'Spreadb CEO: "Authenticity is the new currency in influencer marketing"',
    description: 'In an exclusive interview, Spreadb\'s CEO discusses how AI is enhancing human connections rather than replacing them in the influencer space.'
  },
  {
    source: 'TechCrunch • Nov 2024',
    title: 'How Spreadb\'s AI matching is revolutionizing brand-influencer partnerships',
    description: 'A deep dive into Spreadb\'s proprietary algorithm that analyzes authenticity metrics to create perfect brand-influencer matches.'
  }
];

const commitmentsData = [
  {
    icon: <FaBalanceScale />,
    title: 'Equal Opportunity Employer',
    description: 'Spreadb is an Equal Opportunity Employer. We are committed to inclusion and diversity. We make every effort to offer employment and advancement opportunities to all qualified candidates.',
    linkColor: 'text-purple-600',
    iconColor: 'text-purple-600'
  },
  {
    icon: <FaUniversalAccess />,
    title: 'Accommodations',
    description: 'If you are an applicant who requires accommodations for any part of your application process, please contact us via email at accommodations@spreadb.com. Each request will be considered individually.',
    linkColor: 'text-emerald-600',
    iconColor: 'text-emerald-600'
  },
  {
    icon: <FaGlobeAmericas />,
    title: 'Commitment to Diversity',
    description: 'At Spreadb, we are committed to creating the most diverse and inclusive culture possible. Our community is made up of influencers and businesses from 180+ countries.',
    linkColor: 'text-amber-600',
    iconColor: 'text-amber-600'
  }
];

const positionsData = [
  {
    title: 'Senior Influencer Partnership Manager',
    location: 'Remote',
    type: 'Full-time',
    department: 'Partnerships',
    description: 'Build and manage relationships with top-tier influencers. Develop partnership strategies that align with brand objectives and drive authentic engagement.',
    tagColor: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'AI/ML Engineer - Matching Algorithm',
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Enhance our AI-powered matching algorithm to create better brand-influencer connections. Work with authenticity metrics and engagement prediction models.',
    tagColor: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Content Marketing Specialist',
    location: 'Remote',
    type: 'Full-time',
    department: 'Marketing',
    description: 'Create compelling content that showcases successful brand-influencer partnerships. Develop case studies, blog posts, and social media content.',
    tagColor: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Brand Success Manager',
    location: 'New York, NY',
    type: 'Full-time',
    department: 'Customer Success',
    description: 'Guide brands through their influencer marketing journey on Spreadb. Help them develop strategies, select influencers, and measure campaign success.',
    tagColor: 'bg-blue-100 text-blue-600'
  }
];

export default CareersPage;