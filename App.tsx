import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Hero } from './components/Hero';
import { TransitionLayer } from './components/TransitionLayer';
import { SpotlightSection } from './components/SpotlightSection';
import { services } from './data';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  
  // Custom scroll progress for the "Barbie runway" indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleEnter = () => {
    setShowTransition(true);
    // Short delay to allow button animation before triggering overlay
    setTimeout(() => {
        setHasEntered(true);
    }, 500);
  };

  const handleAnimationComplete = () => {
    setShowTransition(false);
  };

  // Scroll to top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-barbie-soft min-h-screen text-charcoal font-sans selection:bg-barbie-pink selection:text-white">
      
      <Hero 
        onEnter={handleEnter} 
        isHidden={hasEntered} 
      />
      
      <TransitionLayer 
        isVisible={showTransition} 
        onAnimationComplete={handleAnimationComplete} 
      />

      {/* Main Website Content (Revealed after transition) */}
      <main className={`relative transition-opacity duration-1000 ${hasEntered && !showTransition ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        
        {/* Sticky Header / Brand Mark */}
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 2.5, type: 'spring' }}
            className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference text-white pointer-events-none"
        >
            <div className="font-sans font-extrabold tracking-tighter text-2xl pointer-events-auto cursor-pointer">
                BB.
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-widest pointer-events-auto">
                <a href="#strategy" className="hover:text-barbie-pink transition-colors">Services</a>
                <a href="#talent" className="hover:text-barbie-pink transition-colors">Talent</a>
                <a href="#" className="hover:text-barbie-pink transition-colors">Apply</a>
            </nav>
        </motion.header>

        {/* Runway Progress Bar */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-barbie-pink origin-left z-50"
            style={{ scaleX }}
        />

        {/* Intro Space before sections */}
        <section className="h-[50vh] flex items-center justify-center bg-white">
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
             >
                 <h2 className="text-barbie-pink font-script text-6xl md:text-8xl mb-4">Welcome Home, Doll</h2>
                 <p className="text-gray-400 font-sans uppercase tracking-[0.3em] text-xs">The world is watching</p>
                 <div className="mt-8 flex justify-center">
                     <ArrowUp className="animate-bounce text-barbie-pink w-6 h-6" />
                 </div>
             </motion.div>
        </section>

        {/* Service Sections */}
        {services.map((service, index) => (
          <SpotlightSection key={service.id} item={service} index={index} />
        ))}

        {/* Footer */}
        <footer className="bg-charcoal text-white py-24 px-6 md:px-12 relative overflow-hidden">
             <div className="container mx-auto relative z-10 text-center">
                 <h2 className="font-sans font-extrabold text-5xl md:text-8xl mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                     READY TO GLOW?
                 </h2>
                 <p className="font-serif italic text-2xl text-barbie-pink mb-12">
                     Your empire awaits.
                 </p>
                 <button className="bg-barbie-pink text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-barbie-pink transition-all duration-300 transform hover:scale-110 shadow-lg shadow-barbie-pink/50">
                     Apply Now
                 </button>
                 
                 <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans tracking-widest uppercase">
                     <p>&copy; 2024 Bramingham Barely.</p>
                     <div className="flex space-x-8 mt-4 md:mt-0">
                         <a href="#" className="hover:text-white transition-colors">Instagram</a>
                         <a href="#" className="hover:text-white transition-colors">Twitter</a>
                         <a href="#" className="hover:text-white transition-colors">Email</a>
                     </div>
                 </div>
             </div>
             
             {/* Abstract Pink Glow in Footer */}
             <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-barbie-pink/5 blur-[120px] rounded-full pointer-events-none"></div>
        </footer>

      </main>
    </div>
  );
}