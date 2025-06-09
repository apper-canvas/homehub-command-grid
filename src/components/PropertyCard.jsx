import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import favoriteService from '../services/api/favoriteService';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = favoriteService.getFavoriteIds();
    return favorites.includes(property.id);
  });

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(property.id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.addFavorite(property.id);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        <Link to={`/property/${property.id}`} className="flex flex-col md:flex-row">
          <div className="relative md:w-80 h-48 md:h-auto flex-shrink-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <ApperIcon
                name="Heart"
                size={20}
                className={isFavorite ? 'text-error fill-current' : 'text-gray-600'}
              />
            </motion.button>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-heading font-semibold text-primary break-words">
                {property.title}
              </h3>
              <span className="text-2xl font-bold text-secondary">
                {formatPrice(property.price)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 break-words">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Bed" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Bath" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Maximize" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{formatSquareFeet(property.squareFeet)} sqft</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Calendar" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">{property.yearBuilt}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm break-words line-clamp-2">
              {property.description}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden max-w-full"
    >
      <Link to={`/property/${property.id}`}>
        <div className="relative h-48">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <ApperIcon
              name="Heart"
              size={18}
              className={isFavorite ? 'text-error fill-current' : 'text-gray-600'}
            />
          </motion.button>
          <div className="absolute bottom-3 left-3">
            <span className="text-white text-xl font-bold">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-heading font-semibold text-primary mb-2 break-words">
            {property.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 break-words">
            {property.address}, {property.city}, {property.state}
          </p>
          
          <div className="flex justify-between items-center text-sm text-gray-700">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Bed" size={14} className="text-gray-500" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Bath" size={14} className="text-gray-500" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Maximize" size={14} className="text-gray-500" />
              <span>{formatSquareFeet(property.squareFeet)}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {property.propertyType} • Built {property.yearBuilt}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;