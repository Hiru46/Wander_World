import React, { ChangeEvent } from 'react';

interface FilterOptionsProps {
  onFilter: (region: string) => void;
}

const regions: string[] = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const FilterOptions: React.FC<FilterOptionsProps> = ({ onFilter }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <select onChange={handleChange} className="border p-2 rounded">
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default FilterOptions;
