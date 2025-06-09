import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import propertyService from '@/services/api/propertyService';
import SearchFilters from '@/components/SearchFilters'; // Existing organism
import PropertiesDisplay from '@/components/organisms/PropertiesDisplay';
import BrowsePageLoadingSkeleton from '@/components/organisms/BrowsePageLoadingSkeleton';
import ResultsHeader from '@/components/molecules/ResultsHeader';

const BrowsePage = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [searchFilters, setSearchFilters] = useState({
        priceMin: '',
        priceMax: '',
        propertyType: [],
        bedroomsMin: '',
        bathroomsMin: '',
        squareFeetMin: '',
        location: ''
    });

    useEffect(() => {
        const loadProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await propertyService.getAll();
                setProperties(result);
                setFilteredProperties(result);
            } catch (err) {
                setError(err.message || 'Failed to load properties');
                toast.error('Failed to load properties');
            } finally {
                setLoading(false);
            }
        };
        loadProperties();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...properties];

            // Price range filter
            if (searchFilters.priceMin) {
                filtered = filtered.filter(property => property.price >= parseInt(searchFilters.priceMin));
            }
            if (searchFilters.priceMax) {
                filtered = filtered.filter(property => property.price <= parseInt(searchFilters.priceMax));
            }

            // Property type filter
            if (searchFilters.propertyType.length > 0) {
                filtered = filtered.filter(property => 
                    searchFilters.propertyType.includes(property.propertyType)
                );
            }

            // Bedrooms filter
            if (searchFilters.bedroomsMin) {
                filtered = filtered.filter(property => property.bedrooms >= parseInt(searchFilters.bedroomsMin));
            }

            // Bathrooms filter
            if (searchFilters.bathroomsMin) {
                filtered = filtered.filter(property => property.bathrooms >= parseInt(searchFilters.bathroomsMin));
            }

            // Square feet filter
            if (searchFilters.squareFeetMin) {
                filtered = filtered.filter(property => property.squareFeet >= parseInt(searchFilters.squareFeetMin));
            }

            // Location filter
            if (searchFilters.location) {
                const searchTerm = searchFilters.location.toLowerCase();
                filtered = filtered.filter(property =>
                    property.city.toLowerCase().includes(searchTerm) ||
                    property.state.toLowerCase().includes(searchTerm) ||
                    property.address.toLowerCase().includes(searchTerm)
                );
            }

            setFilteredProperties(filtered);
        };

        applyFilters();
    }, [searchFilters, properties]);

    const handleFilterChange = (newFilters) => {
        setSearchFilters(newFilters);
    };

    const clearFilters = () => {
        setSearchFilters({
            priceMin: '',
            priceMax: '',
            propertyType: [],
            bedroomsMin: '',
            bathroomsMin: '',
            squareFeetMin: '',
            location: ''
        });
    };

    const activeFiltersCount = Object.values(searchFilters).filter(value => 
        Array.isArray(value) ? value.length > 0 : value !== ''
    ).length;

    if (loading || error || properties.length === 0) {
        return (
            <BrowsePageLoadingSkeleton 
                isError={!!error} 
                errorMessage={error} 
                onRetry={() => window.location.reload()} 
                isEmpty={!loading && !error && properties.length === 0} 
            />
        );
    }

    return (
        <div className="space-y-6">
            <SearchFilters
                filters={searchFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
            />

            <ResultsHeader
                filteredPropertiesCount={filteredProperties.length}
                activeFiltersCount={activeFiltersCount}
                onClearFilters={clearFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            <PropertiesDisplay
                filteredProperties={filteredProperties}
                viewMode={viewMode}
                onClearFilters={clearFilters}
            />
        </div>
    );
};

export default BrowsePage;