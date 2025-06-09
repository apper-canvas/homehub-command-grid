import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import ImageGallery from '../components/ImageGallery';
import PropertyMap from '../components/PropertyMap';
import propertyService from '../services/api/propertyService';
import favoriteService from '../services/api/favoriteService';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getById(id);
        setProperty(result);
        
        // Check if property is in favorites
        const favorites = favoriteService.getFavoriteIds();
        setIsFavorite(favorites.includes(id));
      } catch (err) {
        setError(err.message || 'Failed to load property');
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.addFavorite(id);
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Gallery */}
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          
          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
            <ApperIcon name="Home" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Not Found</h3>
            <p className="text-gray-600 mb-4">
              {error || 'The property you are looking for could not be found.'}
            </p>
            <Link
              to="/browse"
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ApperIcon name="ChevronRight" size={14} />
          <Link to="/browse" className="hover:text-secondary transition-colors">Browse</Link>
          <ApperIcon name="ChevronRight" size={14} />
          <span className="text-gray-900 break-words">{property.title}</span>
        </div>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2 break-words">
              {property.title}
            </h1>
            <p className="text-gray-600 flex items-center space-x-1 break-words">
              <ApperIcon name="MapPin" size={16} />
              <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-secondary">
                {formatPrice(property.price)}
              </div>
              <div className="text-sm text-gray-600">
                ${Math.round(property.price / property.squareFeet)}/sqft
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteToggle}
              className="p-3 bg-white border border-gray-300 rounded-lg hover:border-secondary transition-colors"
            >
              <ApperIcon
                name="Heart"
                size={24}
                className={isFavorite ? 'text-error fill-current' : 'text-gray-600'}
              />
            </motion.button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bed" size={16} className="text-gray-500" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-gray-600">bedrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bath" size={16} className="text-gray-500" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-gray-600">bathrooms</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Maximize" size={16} className="text-gray-500" />
            <span className="font-medium">{formatSquareFeet(property.squareFeet)}</span>
            <span className="text-gray-600">sqft</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Calendar" size={16} className="text-gray-500" />
            <span className="font-medium">{property.yearBuilt}</span>
            <span className="text-gray-600">built</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Home" size={16} className="text-gray-500" />
            <span className="font-medium">{property.propertyType}</span>
          </div>
        </div>
      </motion.div>

      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <ImageGallery images={property.images} title={property.title} />
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed break-words">{property.description}</p>
          </motion.div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-primary mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ApperIcon name="Check" size={16} className="text-success flex-shrink-0" />
                    <span className="text-gray-700 break-words">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Property Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-primary mb-4">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Square Feet:</span>
                  <span className="font-medium">{formatSquareFeet(property.squareFeet)}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built:</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span className="font-medium">
                    {new Date(property.listingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per sqft:</span>
                  <span className="font-medium">
                    ${Math.round(property.price / property.squareFeet)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
          >
            <h3 className="text-lg font-semibold text-primary mb-4">Contact Agent</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="I'm interested in this property..."
                  defaultValue={`I'm interested in ${property.title} at ${property.address}.`}
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-3 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors font-medium"
              >
                Send Message
              </motion.button>
            </form>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Calendar" size={18} />
                <span>Schedule Tour</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PropertyMap 
              coordinates={property.coordinates}
              address={`${property.address}, ${property.city}, ${property.state} ${property.zipCode}`}
              title={property.title}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;