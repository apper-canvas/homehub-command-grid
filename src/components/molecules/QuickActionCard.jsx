import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const QuickActionCard = ({ icon, title, desc, link, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -4 }}
            className="group"
        >
            <Link 
                to={link}
                className="block p-6 bg-gray-50 rounded-lg hover:bg-secondary/5 transition-all duration-200 text-center"
            >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <ApperIcon name={icon} size={24} className="text-secondary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
            </Link>
        </motion.div>
    );
};

export default QuickActionCard;