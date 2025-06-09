import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import favoriteService from '../services/api/favoriteService';
import propertyService from '../services/api/propertyService';

const Favorites = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const favoriteIds = favoriteService.getFavoriteIds();
        if (favoriteIds.length === 0) {
          setFavoriteProperties([]);
          return;
        }

        // Get all properties and filter favorites
        const allProperties = await propertyService.getAll();
        const favorites = allProperties.filter(property => 
          favoriteIds.includes(property.id)
        );
        setFavoriteProperties(favorites);
      } catch (err) {
        setError(err.message || 'Failed to load favorite properties');
        toast.error('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    // Listen for favorite changes
    const handleFavoriteChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesChanged', handleFavoriteChange);
    return () => window.removeEventListener('favoritesChanged', handleFavoriteChange);
  }, []);

  const handleRemoveFromFavorites = async (propertyId) => {
    try {
      await favoriteService.removeFavorite(propertyId);
      setFavoriteProperties(prev => prev.filter(p => p.id !== propertyId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Favorites</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">
          My Favorites
        </h1>
        <p className="text-gray-600">
          {favoriteProperties.length === 0 
            ? 'You haven\'t saved any properties yet'
            : `${favoriteProperties.length} ${favoriteProperties.length === 1 ? 'property' : 'properties'} saved`
          }
        </p>
      </div>

      {/* Content */}
      {favoriteProperties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <div className="bg-white rounded-lg shadow-sm p-12 max-w-lg mx-auto">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Heart" className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              No Favorite Properties Yet
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Start browsing properties and click the heart icon to save your favorites. 
              This will help you keep track of properties you're interested in.
            </p>
            
            <div className="space-y-3">
              <motion.a
                href="/browse"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
              >
                Browse Properties
              </motion.a>
              <motion.a
                href="/map"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                View Map
              </motion.a>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <ApperIcon name="Filter" size={16} />
                <span>Filter</span>
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <ApperIcon name="ArrowUpDown" size={16} />
                <span>Sort</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors flex items-center space-x-2">
                <ApperIcon name="Share" size={16} />
                <span>Share List</span>
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <PropertyCard property={property} />
                
                {/* Remove button overlay */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFromFavorites(property.id);
                  }}
                  className="absolute top-2 left-2 p-2 bg-error text-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ApperIcon name="Trash2" size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Favorites Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {favoriteProperties.length}
                </div>
                <div className="text-sm text-gray-600">Total Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  ${Math.round(
                    favoriteProperties.reduce((sum, p) => sum + p.price, 0) / favoriteProperties.length / 1000
                  )}K
                </div>
                <div className="text-sm text-gray-600">Avg Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {Math.round(
                    favoriteProperties.reduce((sum, p) => sum + p.bedrooms, 0) / favoriteProperties.length * 10
                  ) / 10}
                </div>
                <div className="text-sm text-gray-600">Avg Bedrooms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {Math.round(
                    favoriteProperties.reduce((sum, p) => sum + p.squareFeet, 0) / favoriteProperties.length
                  ).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Avg Sq Ft</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;