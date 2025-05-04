import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  initialValue?: string;
  setSearchText?: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  initialValue = "", 
  setSearchText 
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (setSearchText) {
      setSearchText(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const clearSearch = () => {
    setInputValue("");
    if (setSearchText) {
      setSearchText("");
    }
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative flex items-center rounded-xl overflow-hidden
          transition-all duration-300 ease-in-out
          ${isFocused ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' : 'ring-1 ring-gray-600'}
          bg-gray-800 group
        `}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="block w-full pl-12 pr-12 py-3 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none text-lg"
            placeholder="Search for a country..."
            aria-label="Search for a country"
          />
          
          {inputValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
          
          <button
            type="submit"
            className={`
              absolute right-0 h-full px-4 
              bg-gradient-to-r from-red-700 to-red-600
              text-white font-medium transition-all duration-300
              hover:from-red-600 hover:to-red-500
            `}
            aria-label="Submit search"
          >
            Search
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;