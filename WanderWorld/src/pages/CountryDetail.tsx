import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByCode, Country } from '../api/apiService';
import { FaArrowLeft, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useFavorites } from '../context/FavouritesContext';

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [neighborCountries, setNeighborCountries] = useState<Country[]>([]);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const getCountry = async () => {
      if (!code) {
        setError('Country code is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchCountryByCode(code);

        // Handle API response structure
        if (Array.isArray(data) && data.length > 0) {
          const countryData = data[0];
          setCountry(countryData);
          
          // Fetch neighbor countries if there are borders
          if (countryData.borders && countryData.borders.length > 0) {
            try {
              // Limiting to 5 neighbors to avoid too many requests
              const borderCodes = countryData.borders.slice(0, 5);
              const promises = borderCodes.map(borderCode => 
                fetchCountryByCode(borderCode));
              
              const results = await Promise.all(promises);
              const neighbors = results
                .filter(res => Array.isArray(res) && res.length > 0)
                .map(res => res[0]);
              
              setNeighborCountries(neighbors);
            } catch (error) {
              console.error('Error fetching neighbor countries:', error);
            }
          }
        } else {
          setError('Country not found.');
        }
      } catch (error) {
        setError('Failed to fetch country details. Please try again later.');
        console.error('Error fetching country detail:', error);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, [code]);

  const toggleFavorite = () => {
    if (!country) return;
    
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading country information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Countries</Link>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto p-4">
        <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Countries</Link>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>No data available for this country.</p>
        </div>
      </div>
    );
  }

  const { 
    name, 
    flags, 
    region, 
    subregion,
    population, 
    capital, 
    languages,
    currencies,
    area,
    timezones,
    continents,
    maps
  } = country;

  // Format numbers with commas for readability
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Format currencies
  const formatCurrencies = (): string => {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol || ''})`)
      .join(', ');
  };

  const isCountryFavorite = isFavorite(country.cca3);

  return (
    <div className="container mx-auto p-4 max-w-6xl my-18 bg-black/20">
      <Link to="/" className="text-blue-700 hover:underline mb-6 inline-flex items-center font-bold">
        <FaArrowLeft />
        Back to Countries
      </Link>

      {/* Favorite Button */}
      <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFavorite}
          className={`absolute top-6 right-6 p-3 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
            isCountryFavorite 
              ? "bg-red-500 text-white" 
              : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80"
          }`}
        >
          <FaHeart className={isCountryFavorite ? "text-white" : "text-gray-300"} />
        </motion.button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-900">
            <img 
              src={flags.svg || flags.png} 
              alt={`${name.common} flag`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = flags.png; // Fallback to PNG if SVG fails
              }}
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{name.common}</h1>
            <p className="text-gray-600 mb-6">{name.official}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold border-b pb-2 mb-3 border-gray-200">Basic Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Region:</span> {region}</p>
                  {subregion && <p><span className="font-medium">Subregion:</span> {subregion}</p>}
                  <p><span className="font-medium">Population:</span> {formatNumber(population)}</p>
                  {area && <p><span className="font-medium">Area:</span> {formatNumber(area)} km²</p>}
                  {capital && capital.length > 0 && (
                    <p><span className="font-medium">Capital:</span> {capital.join(', ')}</p>
                  )}
                  {continents && continents.length > 0 && (
                    <p><span className="font-medium">Continent:</span> {continents.join(', ')}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold border-b pb-2 mb-3 border-gray-200">Additional Details</h2>
                <div className="space-y-2">
                  {languages && (
                    <p>
                      <span className="font-medium">Languages:</span> {Object.values(languages).join(', ')}
                    </p>
                  )}
                  {currencies && (
                    <p>
                      <span className="font-medium">Currencies:</span> {formatCurrencies()}
                    </p>
                  )}
                  {timezones && timezones.length > 0 && (
                    <p>
                      <span className="font-medium">Timezones:</span> {timezones.length > 3 ? 
                        `${timezones.slice(0, 3).join(', ')} (+ ${timezones.length - 3} more)` : 
                        timezones.join(', ')}
                    </p>
                  )}
                  {maps && maps.googleMaps && (
                    <p className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="font-medium">Map:</span>{' '}
                      <a 
                        href={maps.googleMaps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View on Google Maps
                      </a>
                    </p>
                  )}
                </div>
              </div>
              {/* Action Button */}
              <div className="mt-6">
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onClick={toggleFavorite}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2  ${
                    isCountryFavorite
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  <FaHeart className={isCountryFavorite ? "text-white" : "text-gray-300"} />
                  {isCountryFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </motion.button>
              </div>
            </div>
            
            {neighborCountries.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold border-b pb-2 mb-3 border-gray-200">Neighboring Countries</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {neighborCountries.map(neighbor => (
                    <Link 
                      key={neighbor.cca3} 
                      to={`/country/${neighbor.cca3}`}
                      className="flex flex-col items-center p-2 hover:bg-gray-50 rounded transition-all"
                    >
                      <img 
                        src={neighbor.flags.png} 
                        alt={`${neighbor.name.common} flag`} 
                        className="w-12 h-8 object-cover border mb-1"
                      />
                      <span className="text-xs text-center font-medium">{neighbor.name.common}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;