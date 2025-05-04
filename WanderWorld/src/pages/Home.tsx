import React, { useState, useEffect } from "react";
import { fetchAllCountries, fetchCountryByName, fetchCountriesByRegion, Country } from "../api/apiService";
import SearchBar from "../components/SearchBar";
import FilterOptions from "../components/FilterOptions";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";
import { FaGlobeAmericas, FaSearch, FaMapMarkerAlt, FaStar, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [featuredCountries, setFeaturedCountries] = useState<Country[]>([]);
  const { favorites } = useFavorites();
  const { user } = useAuth();

  // Fetch all countries initially
  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        
        // Set featured countries (random selection of 3)
        if (data.length > 0) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setFeaturedCountries(shuffled.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle searching by name
  const handleSearch = async (text: string) => {
    setSearchText(text);
    
    if (text.trim() === "") {
      if (selectedRegion === "All") {
        const data = await fetchAllCountries();
        setCountries(data);
      } else {
        handleFilter(selectedRegion);
      }
    } else {
      try {
        setLoading(true);
        const data = await fetchCountryByName(text);
        setCountries(data);
      } catch (error) {
        console.error("Error in search:", error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle filtering by region
  const handleFilter = async (region: string) => {
    setSelectedRegion(region);
    
    try {
      setLoading(true);
      let data;
      
      if (region === "All") {
        data = await fetchAllCountries();
      } else {
        data = await fetchCountriesByRegion(region);
      }
      
      // Apply current search text if any
      if (searchText.trim() !== "") {
        data = data.filter(country => 
          country.name.common.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      setCountries(data);
    } catch (error) {
      console.error("Error in filtering:", error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen text-white pb-16 pt-20 bg-black/40">
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 overflow-hidden bg-gray-950/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background World Map SVG */}
        <div className="absolute inset-0 opacity-20 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800' fill='none'%3E%3Cpath d='M600 800C932.548 800 1200 622.548 1200 400C1200 177.452 932.548 0 600 0C267.452 0 0 177.452 0 400C0 622.548 267.452 800 600 800Z' fill='%23ff5555' fill-opacity='0.2'/%3E%3Cpath d='M600 700C876.142 700 1100 566.142 1100 400C1100 233.858 876.142 100 600 100C323.858 100 100 233.858 100 400C100 566.142 323.858 700 600 700Z' stroke='%23ffffff' stroke-opacity='0.1'/%3E%3Cpath d='M600 600C821.97 600 1000 512.843 1000 400C1000 287.157 821.97 200 600 200C378.03 200 200 287.157 200 400C200 512.843 378.03 600 600 600Z' stroke='%23ffffff' stroke-opacity='0.1'/%3E%3C/svg%3E")` 
          }}>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-center text-center z-10">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center gap-3">
                <FaGlobeAmericas className="text-red-500" /> 
                Wander World
              </span>
            </h1>
            <p className="text-gray-300 mt-4 text-xl max-w-xl mx-auto">
              Discover and explore countries around the world in an immersive interactive experience.
            </p>
          </motion.div>

          <motion.div 
            className="mt-8 flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {!user ? (
            <Link 
              to="/signup" 
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full overflow-hidden shadow-lg hover:shadow-red-500/30 transition-all duration-300"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-2">
                <FaStar className="text-yellow-300" />
                Create Your Account
              </span>
            </Link>
            ):
             (
              <Link 
                to="/profile" 
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gray-800 rounded-full overflow-hidden shadow-lg hover:shadow-red-500/20 transition-all duration-300"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  My Favorites
                  {favorites.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </span>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Countries Carousel */}
      {featuredCountries.length > 0 && (
        <motion.div 
          className="container mx-auto mt-8 px-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700 relative z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaStar className="text-yellow-400" /> Featured Destinations
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-amber-500 mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCountries.map((country) => (
              <motion.div 
                key={`featured-${country.cca3}`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg shadow-red-500/10 border border-gray-700"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={country.flags.svg || country.flags.png} 
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">{country.name.common}</h3>
                  <p className="text-gray-400 flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt className="text-red-500" /> {country.region}
                  </p>
                  <Link 
                    to={`/country/${country.cca3}`}
                    className="mt-3 text-red-400 hover:text-red-300 flex items-center gap-1 text-sm font-medium"
                  >
                    Explore Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search & Filter Section */}
      <motion.div 
        className="container mx-auto py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700 relative z-50">
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch} 
                initialValue={searchText}
                setSearchText={setSearchText}
              />
            </div>
            <div className="md:w-64">
              <FilterOptions 
                onFilter={handleFilter} 
                selectedRegion={selectedRegion}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Countries Display */}
      <div className="container mx-auto px-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700 relative z-40">
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaSearch className="text-red-500" /> Explore Countries
          </h2>
          <p className="text-gray-400">
            {countries.length} {countries.length === 1 ? 'country' : 'countries'} found
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full border-t-4 border-red-500 rounded-full animate-spin"></div>
              <FaGlobeAmericas className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-red-500" />
            </div>
          </div>
        ) : countries.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-gray-800/20 rounded-2xl border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl text-gray-600 flex justify-center mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400">No Countries Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => {
                setSearchText("");
                setSelectedRegion("All");
                handleFilter("All");
              }}
              className="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {countries.map((country) => (
                <motion.div 
                  key={country.cca3}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="h-full"
                >
                  <CountryCard country={country} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;