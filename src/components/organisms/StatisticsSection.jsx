import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';

const statisticsData = [
    { number: '2,500+', label: 'Properties Listed' },
    { number: '1,200+', label: 'Happy Families' },
    { number: '50+', label: 'Neighborhoods' },
    { number: '15+', label: 'Years Experience' }
];

const StatisticsSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {statisticsData.map((stat, index) => (
                        <StatCard key={stat.label} {...stat} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StatisticsSection;