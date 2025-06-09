import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const BrowsePageLoadingSkeleton = ({ isError, errorMessage, onRetry, isEmpty }) => {
    if (isError) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
            >
                <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                    <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Properties</h3>
                    <p className="text-gray-600 mb-4">{errorMessage}</p>
                    <Button
                        onClick={onRetry}
                        className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
                    >
                        Try Again
                    </Button>
                </div>
            </motion.div>
        );
    }

    if (isEmpty) {
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
};

export default BrowsePageLoadingSkeleton;