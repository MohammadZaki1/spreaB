import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-16 lg:px-24 py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* For Clients */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">For Brands</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/how-to-hire" className="hover:text-white">How to hire</Link></li>
            <li><Link to="/marketplace" className="hover:text-white">Talent Marketplace</Link></li>
            <li><Link to="/project-catalog" className="hover:text-white">Project Catalog</Link></li>
            <li><Link to="/agency" className="hover:text-white">Hire an agency</Link></li>
            <li><Link to="/enterprise" className="hover:text-white">Enterprise</Link></li>
          </ul>
        </div>

        {/* For Talent */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">For Creaters</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
           
   
            <li>  <Link to="/freelancer-plus" className="hover:text-white">Freelancer Plus</Link></li>
          <li><Link to="/how-to-find-promotion" className="hover:text-white">How to find the promotion</Link></li>
      
           <li> <Link to="/creator-support" className="hover:text-white">Creator Support</Link></li>

          </ul>
        </div>



        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Resources</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/help" className="hover:text-white">Help & support</Link></li>

            <li><Link to="/success-stories" className="hover:text-white">Success stories</Link></li>

            <li><Link to="/blogs" className="hover:text-white">Blog</Link></li>
            <li><Link to="/free-tools" className="hover:text-white">Free Business Tools</Link></li>
             </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Company</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-white">About us</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/faq" className="hover:text-white">Faq</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact us</Link></li>
          </ul>
        </div>

      </div>

      {/* Social Icons */}
     <div className="mt-12 flex items-center space-x-6 text-white">
  <span className="text-gray-300">Follow us</span>

  <a href="https://facebook.com" className="text-xl">
    <FaFacebook />
  </a>

  <a href="https://linkedin.com" className="text-xl">
    <FaLinkedin />
  </a>

  <a href="https://twitter.com" className="text-xl">
    <FaXTwitter />
  </a>
</div>

     
      <div className="mt-12 text-xs text-gray-500">
        © 2025 Designed by Flyii® Spread-B
      </div>
    </footer>
  );
}
