import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/api/propertyService';

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getAll();
        setProperties(result);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 flex">
          {/* Map skeleton */}
          <div className="flex-1 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
          
          {/* Sidebar skeleton */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Map</h3>
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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary">Map View</h1>
            <p className="text-gray-600">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} on map
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <ApperIcon name="Filter" size={16} />
              <span>Filters</span>
            </button>
            <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors flex items-center space-x-2">
              <ApperIcon name="Search" size={16} />
              <span>Search Area</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Map */}
        <div className="flex-1 relative">
          {!mapLoaded ? (
            <div className="h-full bg-gray-100 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-4">Interactive Property Map</p>
                <button
                  onClick={() => setMapLoaded(true)}
                  className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Load Map
                </button>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden"
            >
              {/* Mock street grid */}
              <div className="absolute inset-0">
                {/* Horizontal streets */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 h-1 bg-gray-300"
                    style={{ top: `${12.5 * (i + 1)}%` }}
                  />
                ))}
                {/* Vertical streets */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 w-1 bg-gray-300"
                    style={{ left: `${16.66 * (i + 1)}%` }}
                  />
                ))}
              </div>

              {/* Property markers */}
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${20 + Math.floor(index / 4) * 25}%`
                  }}
                  onClick={() => setSelectedProperty(property)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative ${
                      selectedProperty?.id === property.id
                        ? 'z-20'
                        : 'z-10'
                    }`}
                  >
                    {/* Marker */}
                    <div className={`bg-secondary text-white p-2 rounded-full shadow-lg border-2 ${
                      selectedProperty?.id === property.id
                        ? 'border-white scale-110'
                        : 'border-white/50'
                    }`}>
                      <ApperIcon name="Home" size={16} />
                    </div>
                    
                    {/* Price label */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                      <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-semibold whitespace-nowrap">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Map controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="w-10 h-10 bg-white rounded shadow hover:bg-gray-50 flex items-center justify-center">
                  <ApperIcon name="Plus" size={20} />
                </button>
                <button className="w-10 h-10 bg-white rounded shadow hover:bg-gray-50 flex items-center justify-center">
                  <ApperIcon name="Minus" size={20} />
                </button>
                <button className="w-10 h-10 bg-white rounded shadow hover:bg-gray-50 flex items-center justify-center">
                  <ApperIcon name="Locate" size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Property List Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Properties ({properties.length})
            </h2>
            
            {properties.length === 0 ? (
              <div className="text-center py-8">
                <ApperIcon name="Home" className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No properties found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedProperty?.id === property.id
                        ? 'ring-2 ring-secondary'
                        : ''
                    }`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <PropertyCard property={property} viewMode="list" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;