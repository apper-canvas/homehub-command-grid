import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const FeaturedPropertiesSection = ({ featuredProperties, loading }) => {
    return (
        <section className="py-16 bg-main">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                        Featured Properties
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover some of our most popular listings. These properties have been carefully 
                        selected for their outstanding features and value.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PropertyCard property={property} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8"
                >
                    <Link
                        to="/browse"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                    >
                        <span>View All Properties</span>
                        <ApperIcon name="ArrowRight" size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedPropertiesSection;