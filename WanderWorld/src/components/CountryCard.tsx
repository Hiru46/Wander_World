import React from 'react';
import { Link } from 'react-router-dom';
import { Country } from '../api/apiService';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const { name, flags, region, population, capital, cca3 } = country;

  return (
    <Link to={`/country/${cca3}`} className="border p-4 rounded hover:shadow-lg transition-shadow">
      <img src={flags.png} alt={`${name.common} flag`} className="w-full h-40 object-cover mb-2" />
      <h2 className="font-bold text-lg">{name.common}</h2>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
      <p><strong>Region:</strong> {region}</p>
      {capital && <p><strong>Capital:</strong> {capital[0]}</p>}
    </Link>
  );
};

export default CountryCard;
