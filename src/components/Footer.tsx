
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brown text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Zain & Cole</h3>
            <p className="mb-4 text-cream">
              Celebrating African Fashion from Kisumu to Canada - Authentic, sustainable, and handcrafted pieces that tell a story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-sand transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-sand transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-sand transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-sand transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-sand transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-sand transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sand transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-sand transition-colors">Account</Link>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Shop Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop/sandals" className="hover:text-sand transition-colors">African Sandals</Link>
              </li>
              <li>
                <Link to="/shop/beaded" className="hover:text-sand transition-colors">Beaded Accessories</Link>
              </li>
              <li>
                <Link to="/shop/jewelry" className="hover:text-sand transition-colors">Jewelry</Link>
              </li>
              <li>
                <Link to="/shop/fabric" className="hover:text-sand transition-colors">Ankara Fabric</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Kisumu, Kenya</p>
                  <p>Toronto, Canada</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <p>+254 729 035 913</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <p>info@zainandcole.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sand/30 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Zain & Cole. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
