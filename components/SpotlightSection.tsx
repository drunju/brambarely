import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ServiceItem } from '../types';
import { ArrowUpRight, Sparkles as SparkleIcon } from 'lucide-react';

interface Props {
  item: ServiceItem;
  index: number;
}

export const SpotlightSection: React.FC<Props> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Parallax & Dolly Zoom Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]); // Dolly zoom
  
  // Spotlight Sweep Animation
  const spotlightX = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "50%", "200%"]);

  return (
    <section ref={ref} className="relative w-full min-h-screen overflow-hidden bg-white flex items-center justify-center py-20 md:py-0">
      
      {/* 1. Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: yBg, scale: scaleBg }}
        >
          <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover object-center transition-transform duration-700"
          />
          {/* Cinematic Overlay: Barbie-pink tint + dreamy white fade for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-barbie-pink/10 mix-blend-overlay opacity-80" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
        </motion.div>
      </div>

      {/* 2. The "Spotlight" Sweep Effect */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ 
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
            left: spotlightX,
            opacity: 0.6,
            width: '150%',
            height: '100%',
            top: 0,
            transform: 'skewX(-20deg)'
        }}
      />

      {/* 3. Floating Particles (Dust/Glitter) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-barbie-pink rounded-full opacity-60 blur-sm"
             style={{
               width: Math.random() * 10 + 5,
               height: Math.random() * 10 + 5,
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
             }}
             animate={{
               y: [0, -100, 0],
               opacity: [0, 1, 0],
               scale: [0.5, 1.5, 0.5]
             }}
             transition={{
               duration: 5 + Math.random() * 5,
               repeat: Infinity,
               ease: "easeInOut",
               delay: Math.random() * 2
             }}
           />
        ))}
      </div>

      {/* 4. Main Content Layout */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center">
        
        <div className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-12 md:gap-24`}>
            
            {/* Number Reveal - Massive & Springy */}
            <div className="relative w-full md:w-1/3 flex justify-center md:justify-end">
                <motion.div
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                    transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 12, 
                        delay: 0.2 
                    }}
                    className="relative"
                >
                    <span className="text-[12rem] md:text-[16rem] leading-none font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-barbie-pink to-barbie-gold drop-shadow-2xl opacity-90 select-none"
                          style={{ filter: 'drop-shadow(0px 10px 20px rgba(224, 33, 138, 0.3))' }}>
                        {item.number}
                    </span>
                    {/* Burst behind number */}
                    <motion.div 
                        animate={isInView ? { scale: [0, 1.5], opacity: [1, 0] } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute inset-0 bg-barbie-pink/20 rounded-full blur-xl -z-10"
                    />
                </motion.div>
            </div>

            {/* Text Content - Editorial Style */}
            <div className="w-full md:w-2/3 bg-white/60 backdrop-blur-md p-8 md:p-12 border-l-4 border-barbie-pink shadow-lg rounded-r-3xl">
                
                {/* Subtitle with letter spacing expansion */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex items-center space-x-3 mb-4"
                >
                    <SparkleIcon className="w-5 h-5 text-barbie-gold animate-pulse" />
                    <span className="text-barbie-gold font-sans font-bold tracking-[0.3em] text-sm uppercase">
                        {item.subtitle}
                    </span>
                </motion.div>

                {/* Main Heading with Cinematic Reveal */}
                <motion.h2 
                    initial={{ letterSpacing: "0.2em", filter: "blur(10px)", opacity: 0, y: 20 }}
                    animate={isInView ? { letterSpacing: "0em", filter: "blur(0px)", opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "circOut", delay: 0.5 }}
                    className="text-5xl md:text-7xl font-serif text-charcoal mb-6 leading-[0.9]"
                >
                    {item.title}
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-gray-700 font-sans text-xl leading-relaxed mb-8 max-w-xl"
                >
                    {item.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 }}
                >
                    <button className="group relative px-8 py-3 bg-charcoal text-white rounded-full overflow-hidden font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(224,33,138,0.6)] transition-shadow duration-300">
                        <span className="relative z-10 group-hover:text-barbie-pink transition-colors duration-300 flex items-center gap-2">
                            Explore Service <ArrowUpRight className="w-4 h-4" />
                        </span>
                        <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                    </button>
                </motion.div>

            </div>
        </div>
      </div>

    </section>
  );
};