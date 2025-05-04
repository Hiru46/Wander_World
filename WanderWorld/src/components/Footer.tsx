import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas, FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2">
              <FaGlobeAmericas className="text-2xl text-red-500" />
              <span className="text-xl font-bold text-white">Wander World</span>
            </Link>
            <p className="text-gray-400 mt-3 text-sm">
              Discover and explore countries around the world in an immersive interactive experience.
            </p>
            <div className="flex mt-4 gap-4">
              <a href="https://www.x.com" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="https://www.facebook.com" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="https://www.github.com" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Wander World. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;