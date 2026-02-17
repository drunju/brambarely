import React from 'react';
import { motion } from 'framer-motion';

interface TransitionLayerProps {
  isVisible: boolean;
  onAnimationComplete: () => void;
}

export const TransitionLayer: React.FC<TransitionLayerProps> = ({ isVisible, onAnimationComplete }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-barbie-soft pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.5, times: [0, 0.1, 0.8, 1] }}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* The Silhouette Rising */}
        <motion.div
            initial={{ y: 500, opacity: 0, scale: 0.8 }}
            animate={{ y: -1000, opacity: 1, scale: 1.2 }}
            transition={{ duration: 2, ease: "easeIn" }}
            className="relative"
        >
             {/* Abstract Barbie-esque Silhouette SVG */}
            <svg width="200" height="400" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 180C50 180 70 160 70 140C70 120 60 110 50 110C40 110 30 120 30 140C30 160 50 180 50 180Z" fill="#E0218A" fillOpacity="0.2" />
                <path d="M50 110C50 110 65 100 65 80C65 60 55 55 50 55C45 55 35 60 35 80C35 100 50 110 50 110Z" fill="#E0218A" fillOpacity="0.4" />
                <circle cx="50" cy="40" r="15" fill="#E0218A" />
                {/* Hair Flow */}
                <path d="M50 25C50 25 80 25 90 60C100 95 80 120 80 120" stroke="#E0218A" strokeWidth="4" strokeLinecap="round" />
            </svg>
            
            {/* Trailing particles (Simulated with simple divs for performance) */}
            <motion.div 
                className="absolute top-full left-1/2 w-1 h-40 bg-gradient-to-t from-transparent via-white to-barbie-pink blur-md"
                style={{ translateX: '-50%' }}
            />
        </motion.div>
        
        {/* Flash of Light */}
        <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.8, duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};