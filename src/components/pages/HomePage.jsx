import React, { useState, useEffect } from 'react';
import propertyService from '@/services/api/propertyService';
import HeroSection from '@/components/organisms/HeroSection';
import QuickActionsSection from '@/components/organisms/QuickActionsSection';
import FeaturedPropertiesSection from '@/components/organisms/FeaturedPropertiesSection';
import StatisticsSection from '@/components/organisms/StatisticsSection';

const HomePage = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadFeaturedProperties = async () => {
            setLoading(true);
            try {
                const allProperties = await propertyService.getAll();
                // Show first 3 properties as featured
                setFeaturedProperties(allProperties.slice(0, 3));
            } catch (error) {
                console.error('Failed to load featured properties:', error);
            } finally {
                setLoading(false);
            }
        };
        loadFeaturedProperties();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to browse page with search query
            window.location.href = `/browse?location=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="min-h-screen">
            <HeroSection 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                handleSearch={handleSearch} 
            />
            <QuickActionsSection />
            <FeaturedPropertiesSection 
                featuredProperties={featuredProperties} 
                loading={loading} 
            />
            <StatisticsSection />
        </div>
    );
};

export default HomePage;