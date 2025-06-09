import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import PropertyCard from './PropertyCard';
import SearchFilters from './SearchFilters';
import propertyService from '../services/api/propertyService';

const MainFeature = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchFilters, setSearchFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: [],
    bedroomsMin: '',
    bathroomsMin: '',
    squareFeetMin: '',
    location: ''
  });

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getAll();
        setProperties(result);
        setFilteredProperties(result);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...properties];

      // Price range filter
      if (searchFilters.priceMin) {
        filtered = filtered.filter(property => property.price >= parseInt(searchFilters.priceMin));
      }
      if (searchFilters.priceMax) {
        filtered = filtered.filter(property => property.price <= parseInt(searchFilters.priceMax));
      }

      // Property type filter
      if (searchFilters.propertyType.length > 0) {
        filtered = filtered.filter(property => 
          searchFilters.propertyType.includes(property.propertyType)
        );
      }

      // Bedrooms filter
      if (searchFilters.bedroomsMin) {
        filtered = filtered.filter(property => property.bedrooms >= parseInt(searchFilters.bedroomsMin));
      }

      // Bathrooms filter
      if (searchFilters.bathroomsMin) {
        filtered = filtered.filter(property => property.bathrooms >= parseInt(searchFilters.bathroomsMin));
      }

      // Square feet filter
      if (searchFilters.squareFeetMin) {
        filtered = filtered.filter(property => property.squareFeet >= parseInt(searchFilters.squareFeetMin));
      }

      // Location filter
      if (searchFilters.location) {
        const searchTerm = searchFilters.location.toLowerCase();
        filtered = filtered.filter(property =>
          property.city.toLowerCase().includes(searchTerm) ||
          property.state.toLowerCase().includes(searchTerm) ||
          property.address.toLowerCase().includes(searchTerm)
        );
      }

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [searchFilters, properties]);

  const handleFilterChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  const clearFilters = () => {
    setSearchFilters({
      priceMin: '',
      priceMax: '',
      propertyType: [],
      bedroomsMin: '',
      bathroomsMin: '',
      squareFeetMin: '',
      location: ''
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Search filters skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Property cards skeleton */}
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
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Properties</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="Home" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-medium">No Properties Available</h3>
        <p className="mt-2 text-gray-500">Check back later for new listings</p>
      </motion.div>
    );
  }

  const activeFiltersCount = Object.values(searchFilters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  ).length;

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <SearchFilters
        filters={searchFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {/* View Mode Toggle & Results Count */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
          {activeFiltersCount > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={clearFilters}
              className="text-sm text-secondary hover:text-secondary/80 transition-colors"
            >
              Clear all filters
            </motion.button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ApperIcon name="Grid3X3" size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-secondary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ApperIcon name="List" size={20} />
          </button>
        </div>
      </div>

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-8">
            <ApperIcon name="Search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Match Your Filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria to see more results</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} viewMode={viewMode} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainFeature;