import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGlobeAmericas, FaBars, FaTimes, FaUserCircle, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavouritesContext";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false); // Close profile menu when route changes
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-80 left-0 right-0 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 🌍 Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.7 }}>
              <FaGlobeAmericas className="text-2xl text-red-500" />
            </motion.div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
              Wander World
            </span>
          </Link>

          {/* 🖥️ Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg transition-colors duration-300 font-extrabold ${
                  location.pathname === link.path ? "text-red-500" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 🎭 User Controls */}
          <div className="hidden md:flex items-center gap-4">
          {user && (
            <Link to="/profile" className="px-4 py-3 text-white font-extrabold rounded-lg transition-colors flex items-center gap-2">
                <FaHeart className="text-red-500" />
                Favorites
                {favorites.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                </span>
                )}
            </Link>
            )}

            {user ? (
              /* 🧑 Profile Icon */
              <div className="relative">
                <FaUserCircle
                  className="text-white text-3xl cursor-pointer"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                />
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-lg overflow-hidden"
                    >
                      <p className="text-white text-sm px-4 py-2">{user.email}</p>
                      <button
                        onClick={logout}
                        className="w-full text-left text-red-500 hover:bg-gray-800 px-4 py-2 transition-all"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* 🔐 Login Button */
              <Link
                to="/login"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`py-2 px-4 rounded-lg ${
                      location.pathname === link.path ? "bg-red-500/10 text-red-500" : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-gray-800 my-2"></div>
                {user ? (
                  <button
                    onClick={logout}
                    className="py-2 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg mt-2 w-full text-left"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="py-2 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg mt-2">
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
