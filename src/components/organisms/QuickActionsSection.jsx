import React from 'react';
import { motion } from 'framer-motion';
import QuickActionCard from '@/components/molecules/QuickActionCard';

const quickActionsData = [
    { icon: 'Search', title: 'Browse Properties', desc: 'Explore all listings', link: '/browse' },
    { icon: 'MapPin', title: 'Map View', desc: 'See properties on map', link: '/map' },
    { icon: 'Heart', title: 'Favorites', desc: 'Your saved properties', link: '/favorites' },
    { icon: 'Calculator', title: 'Mortgage Calculator', desc: 'Calculate payments', link: '/calculator' }
];

const QuickActionsSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                    {quickActionsData.map((action, index) => (
                        <QuickActionCard key={action.title} {...action} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default QuickActionsSection;