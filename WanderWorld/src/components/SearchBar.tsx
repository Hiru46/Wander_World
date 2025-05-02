
import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={searchText}
      onChange={handleInputChange}
      className="border p-2 rounded w-full"
    />
  );
};

export default SearchBar;
