
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brown">Zain & Cole</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-brown-dark hover:text-brown transition-colors font-medium">
              Home
            </Link>
            <Link to="/story" className="text-brown-dark hover:text-brown transition-colors font-medium">
              Our Story
            </Link>
            <Link to="/shop" className="text-brown-dark hover:text-brown transition-colors font-medium">
              Shop
            </Link>
            <Link to="/contact" className="text-brown-dark hover:text-brown transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="p-2 rounded-full hover:bg-cream transition-colors">
              <User size={20} className="text-brown-dark" />
            </Link>
            <Link to="/cart" className="p-2 rounded-full hover:bg-cream transition-colors relative">
              <ShoppingCart size={20} className="text-brown-dark" />
              <span className="absolute -top-1 -right-1 bg-brown text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="p-2 mr-2 rounded-full hover:bg-cream transition-colors relative">
              <ShoppingCart size={20} className="text-brown-dark" />
              <span className="absolute -top-1 -right-1 bg-brown text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-brown-dark hover:bg-cream focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 animate-slide-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-brown-dark hover:text-brown transition-colors px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/story" 
              className="text-brown-dark hover:text-brown transition-colors px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link 
              to="/shop" 
              className="text-brown-dark hover:text-brown transition-colors px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/contact" 
              className="text-brown-dark hover:text-brown transition-colors px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login" 
              className="text-brown-dark hover:text-brown transition-colors px-4 py-2 rounded-md flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} className="mr-2" /> Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
