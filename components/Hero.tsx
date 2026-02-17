import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from './Sparkles';
import { Heart } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
  isHidden: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onEnter, isHidden }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1596496050844-361d52648433?q=80&w=2070&auto=format&fit=crop" 
                alt="Glamorous Background" 
                className="w-full h-full object-cover opacity-90"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
             <div className="absolute inset-0 bg-barbie-pink/10 mix-blend-overlay"></div>
          </div>

          <Sparkles active={isHovered} />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-barbie-gold tracking-[0.3em] font-sans font-bold text-sm md:text-lg mb-4 uppercase"
            >
                Elevating OnlyFans Creators
            </motion.h2>

            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="font-sans font-extrabold text-5xl md:text-8xl text-charcoal mb-2 tracking-tight"
            >
              BRAMINGHAM
            </motion.h1>
            
            <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                className="font-serif italic text-5xl md:text-8xl text-barbie-pink mb-12 drop-shadow-sm"
            >
              BARELY
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 font-sans text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed"
            >
                Where creators shine in the spotlight.
            </motion.p>

            <motion.button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-white border-2 border-barbie-pink text-barbie-pink font-bold uppercase tracking-widest text-sm md:text-base rounded-full shadow-[0_4px_14px_0_rgba(224,33,138,0.39)] hover:bg-barbie-pink hover:text-white hover:shadow-[0_6px_20px_rgba(224,33,138,0.23)] transition-all duration-300"
            >
               <span className="mr-2">Step into the Spotlight</span>
               <Heart className={`w-4 h-4 fill-current transition-transform duration-500 ${isHovered ? 'animate-bounce' : ''}`} />
            </motion.button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-gray-400 text-xs font-sans tracking-widest opacity-60">
             EST. 2024 • LONDON • LOS ANGELES
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};