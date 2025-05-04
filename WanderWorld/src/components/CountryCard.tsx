import React from "react";
import { Link } from "react-router-dom";
import { Country } from "../api/apiService";
import { FaMapMarkerAlt, FaUsers, FaLanguage, FaHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavouritesContext";
import { motion } from "framer-motion";

interface CountryCardProps {
  country: Country;
  showFavoriteButton?: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, showFavoriteButton = true }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCountryFavorite = isFavorite(country.cca3);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent triggering the Link click
    e.stopPropagation();
    
    if (isCountryFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  // Format population with commas
  const formatPopulation = (population: number) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Extract the first language (if any)
  const languages = country.languages ? Object.values(country.languages)[0] : "N/A";

  return (
    <Link to={`/country/${country.cca3}`} className="block h-full">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-700 h-full flex flex-col hover:shadow-red-500/20 relative">
        {/* Favorite Button */}
        {showFavoriteButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
              isCountryFavorite 
                ? "bg-red-500 text-white" 
                : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
            }`}
          >
            <FaHeart className={isCountryFavorite ? "text-white" : "text-gray-300"} />
          </motion.button>
        )}

        {/* Flag Image */}
        <div className="aspect-video overflow-hidden">
          <img 
            src={country.flags.svg || country.flags.png} 
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">{country.name.common}</h3>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 text-gray-300 text-sm mb-1">
              <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
              <span>{country.region}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300 text-sm mb-1">
              <FaUsers className="text-red-500 flex-shrink-0" />
              <span>{formatPopulation(country.population)}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <FaLanguage className="text-red-500 flex-shrink-0" />
              <span>{languages}</span>
            </div>
          </div>
          
          <div className="mt-3 text-red-400 hover:text-red-300 text-sm font-medium">
            View Details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;