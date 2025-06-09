import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ number, label, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
        >
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                {number}
            </div>
            <div className="text-gray-600">{label}</div>
        </motion.div>
    );
};

export default StatCard;