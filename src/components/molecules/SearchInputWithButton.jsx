import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchInputWithButton = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
        >
            <div className="relative">
                <ApperIcon 
                    name="Search" 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <Input
                    type="text"
                    placeholder="Enter city, neighborhood, or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-32 py-4 text-gray-900 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                />
                <Button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-6 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors font-medium"
                >
                    Search
                </Button>
            </div>
        </motion.form>
    );
};

export default SearchInputWithButton;