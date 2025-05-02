import React, { useState, useEffect } from 'react';
import { fetchAllCountries, fetchCountryByName, fetchCountriesByRegion, Country } from '../api/apiService';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CountryCard from '../components/CountryCard';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  // Fetch all countries initially
  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    getCountries();
  }, []);

  // Handle searching by name
  const handleSearch = async (searchText: string) => {
    if (searchText.trim() === '') {
      const data = await fetchAllCountries();
      setCountries(data);
    } else {
      try {
        const data = await fetchCountryByName(searchText);
        setCountries(data);
      } catch (error) {
        console.error('Error in search:', error);
        setCountries([]);
      }
    }
  };

    // Handle filtering by region
    const handleFilter = async (region: string) => {
      if (region === 'All') {
        const data = await fetchAllCountries();
        setCountries(data);
      } else {
        try {
          const data = await fetchCountriesByRegion(region);
          setCountries(data);
        } catch (error) {
          console.error('Error in filtering:', error);
          setCountries([]);
        }
      }
    };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4 text-center">GlobeTrotter</h1>
      <div className="mb-4 flex flex-col md:flex-row md:justify-between gap-4">
        <SearchBar onSearch={handleSearch} />
        <FilterOptions onFilter={handleFilter} />
      </div>
      {countries.length === 0 ? (
        <p>No countries found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;