import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByCode, Country } from '../api/apiService';

const CountryDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        if (!code) return;

        const data = await fetchCountryByCode(code);

        // Handle API response structure
        if (Array.isArray(data) && data.length > 0) {
          setCountry(data[0]); // API usually returns an array, take the first object
        } else {
          setError('Country not found.');
        }
      } catch (error) {
        setError('Failed to fetch country details.');
        console.error('Error fetching country detail:', error);
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, [code]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">{error}</div>;
  }

  if (!country) {
    return <div className="container mx-auto p-4">No data available.</div>;
  }

  const { name, flags, region, population, capital, languages } = country;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">&larr; Back</Link>
      <div className="flex flex-col md:flex-row">
        <img src={flags.png} alt={`${name.common} flag`} className="w-full md:w-1/2 object-cover" />
        <div className="mt-4 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{name.common}</h1>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Population:</strong> {population.toLocaleString()}</p>
          {capital && <p><strong>Capital:</strong> {capital[0]}</p>}
          {languages && (
            <p>
              <strong>Languages:</strong> {Object.values(languages).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
