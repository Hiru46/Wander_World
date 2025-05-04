import React, { useState } from "react";
import { FaGlobeAfrica, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FilterOptionsProps {
  onFilter: (region: string) => void;
  selectedRegion?: string;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ 
  onFilter,
  selectedRegion = "All" 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(selectedRegion);
  
  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleRegionSelect = (region: string) => {
    setSelected(region);
    onFilter(region);
    setIsOpen(false);
  };

  return (
    <motion.div 
      className="relative w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl
          bg-gray-800 text-white transition-all duration-300
          ${isOpen ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20' : 'ring-1 ring-gray-600'}
          hover:ring-2 hover:ring-red-500/70
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <FaGlobeAfrica className={`transition-colors duration-300 ${selected !== "All" ? 'text-red-500' : 'text-gray-400'}`} />
          <span>{selected === "All" ? "Filter by Region" : selected}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full z-10 bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-black/50 overflow-hidden"
          >
            <ul
              className="py-1 max-h-60 overflow-auto"
              role="listbox"
              aria-activedescendant={selected}
            >
              {regions.map((region) => (
                <li key={region}>
                  <button
                    className={`
                      w-full text-left px-4 py-2 flex items-center gap-2
                      transition-colors duration-200
                      ${selected === region ? 'bg-red-500/20 text-red-400' : 'text-white hover:bg-gray-700'}
                    `}
                    onClick={() => handleRegionSelect(region)}
                    role="option"
                    aria-selected={selected === region}
                  >
                    {selected === region && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-red-500 rounded-full"
                      />
                    )}
                    {region}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterOptions;