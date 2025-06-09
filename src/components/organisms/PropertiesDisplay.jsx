import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const PropertiesDisplay = ({ filteredProperties, viewMode, onClearFilters }) => {
    if (filteredProperties.length === 0) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
            >
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <ApperIcon name="Search" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Match Your Filters</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search criteria to see more results</p>
                    <Button
                        onClick={onClearFilters}
                        className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
                    >
                        Clear Filters
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
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
    );
};

export default PropertiesDisplay;