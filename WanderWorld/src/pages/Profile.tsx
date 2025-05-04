import { useEffect } from 'react';
import { useFavorites } from '../context/FavouritesContext';
import CountryCard from '../components/CountryCard';
import { FaHeart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { favorites, loading } = useFavorites();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white pb-16 pt-20 bg-black/40">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen text-white pb-16 pt-20 bg-black/40">
      {/* Profile Header */}
      <motion.div 
        className="bg-gray-900 py-12 border-b border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center text-3xl">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser />
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.displayName || user.email}</h1>
              <p className="text-gray-400 mt-1">Manage your favorite countries</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Favorites Section */}
      <div className="container mx-auto px-4 py-10">
        <motion.div 
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaHeart className="text-red-500" /> My Favorite Countries
          </h2>
          <p className="text-gray-400">
            {favorites.length} {favorites.length === 1 ? 'country' : 'countries'} saved
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-gray-800/20 rounded-2xl border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl text-gray-600 flex justify-center mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-gray-400">No Favorite Countries Yet</h3>
            <p className="text-gray-500 mt-2">Start exploring and add countries to your favorites.</p>
            <Link 
              to="/"
              className="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-300 inline-block"
            >
              Explore Countries
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {favorites.map((country) => (
              <motion.div 
                key={country.cca3}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="h-full"
              >
                <CountryCard country={country} showFavoriteButton={true} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;