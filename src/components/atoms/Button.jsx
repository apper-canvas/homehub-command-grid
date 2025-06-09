import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, type = 'button', ...motionProps }) => {
    return (
        <motion.button 
            type={type} 
            onClick={onClick} 
            className={className} 
            {...motionProps}
        >
            {children}
        </motion.button>
    );
};

export default Button;