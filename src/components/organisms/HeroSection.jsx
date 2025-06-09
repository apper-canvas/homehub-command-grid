import React from 'react';
import { motion } from 'framer-motion';
import SearchInputWithButton from '@/components/molecules/SearchInputWithButton';

const HeroSection = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
        <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Find Your Dream Home
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
                        Discover the perfect property with our comprehensive real estate platform. 
                        Browse thousands of listings and find your next home today.
                    </p>
                    <SearchInputWithButton 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery} 
                        handleSearch={handleSearch} 
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;