import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ViewModeToggle from '@/components/molecules/ViewModeToggle';

const ResultsHeader = ({ filteredPropertiesCount, activeFiltersCount, onClearFilters, viewMode, setViewMode }) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                    {filteredPropertiesCount} {filteredPropertiesCount === 1 ? 'property' : 'properties'} found
                </p>
                {activeFiltersCount > 0 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Button
                            onClick={onClearFilters}
                            className="text-sm text-secondary hover:text-secondary/80 transition-colors bg-transparent p-0"
                        >
                            Clear all filters
                        </Button>
                    </motion.div>
                )}
            </div>
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
    );
};

export default ResultsHeader;