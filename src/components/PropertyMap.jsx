import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyMap = ({ coordinates, address, title }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock map component - in a real app, you'd use Google Maps, Mapbox, etc.
  const mockMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-home+ff6b35(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},14/600x400@2x?access_token=pk.your_token_here`;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
          <ApperIcon name="MapPin" size={20} />
          <span>Location</span>
        </h3>
      </div>
      
      <div className="relative">
        {/* Mock Map Display */}
        <div className="h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden">
          {!mapLoaded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive Map</p>
              <button
                onClick={() => setMapLoaded(true)}
                className="mt-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
              >
                Load Map
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative"
            >
              {/* Mock street layout */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300"></div>
                <div className="absolute bottom-1/3 left-0 right-0 h-2 bg-gray-300"></div>
                <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-gray-300"></div>
                <div className="absolute top-0 bottom-0 right-1/3 w-2 bg-gray-300"></div>
              </div>
              
              {/* Property marker */}
              <motion.div
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
              >
                <div className="bg-secondary text-white p-3 rounded-full shadow-lg">
                  <ApperIcon name="Home" size={24} />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                  <div className="bg-white px-3 py-1 rounded shadow-sm text-sm font-medium whitespace-nowrap">
                    {title}
                  </div>
                </div>
              </motion.div>
              
              {/* Zoom controls */}
              <div className="absolute top-3 right-3 space-y-1">
                <button className="w-8 h-8 bg-white rounded shadow hover:bg-gray-50 flex items-center justify-center">
                  <ApperIcon name="Plus" size={16} />
                </button>
                <button className="w-8 h-8 bg-white rounded shadow hover:bg-gray-50 flex items-center justify-center">
                  <ApperIcon name="Minus" size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Address Information */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <ApperIcon name="MapPin" size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 break-words">{address}</p>
              <p className="text-sm text-gray-600 mt-1">
                Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Navigation" size={16} />
              <span>Get Directions</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <ApperIcon name="Share" size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;