import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ViewModeToggle = ({ viewMode, setViewMode }) => {
    return (
        <div className="flex items-center space-x-2">
            <Button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                <ApperIcon name="Grid3X3" size={20} />
            </Button>
            <Button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                <ApperIcon name="List" size={20} />
            </Button>
        </div>
    );
};

export default ViewModeToggle;