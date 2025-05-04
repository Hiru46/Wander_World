import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Country } from "../api/apiService";
import { auth } from "../firebase"; // Import authentication to track logged-in user

// Define the context type
interface FavoritesContextType {
  favorites: Country[];
  loading: boolean;
  addFavorite: (country: Country) => void;
  removeFavorite: (countryCode: string) => void;
  isFavorite: (countryCode: string) => boolean;
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  loading: false, // ✅ Ensure default loading state
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);

// Provider component
interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null); // Track current logged-in user
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Added loading state

  // Monitor authentication state and update user ID
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  // Load favorites from localStorage for the logged-in user
  useEffect(() => {
    const loadFavorites = () => {
      setLoading(true); // ✅ Start loading state
      if (!userId) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const savedFavorites = localStorage.getItem(`favorites_${userId}`);
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
      } finally {
        setLoading(false); // ✅ End loading state
      }
    };

    loadFavorites();
  }, [userId]);

  // Update localStorage when favorites change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
    }
  }, [favorites, userId]);

  // Add a country to favorites for the logged-in user
  const addFavorite = (country: Country) => {
    if (!userId || isFavorite(country.cca3)) return;

    const updatedFavorites = [...favorites, country];
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites)); // ✅ Sync immediately
  };

  // Remove a country from favorites for the logged-in user
  const removeFavorite = (countryCode: string) => {
    if (!userId) return;

    const updatedFavorites = favorites.filter((country) => country.cca3 !== countryCode);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites)); // ✅ Sync immediately
  };

  // Check if a country is in favorites for the logged-in user
  const isFavorite = (countryCode: string) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
