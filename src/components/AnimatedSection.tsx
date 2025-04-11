'use client';

import { motion, Variants } from 'framer-motion';
import React from 'react';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  amount?: number;
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  id, 
  delay = 0, 
  amount = 0.2 
}) => {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: amount }}
      transition={{ delay: delay }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection; 