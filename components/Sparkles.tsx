import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Generate a random number between min and max
const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface SparkleProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

const SparkleInstance: React.FC<SparkleProps> = ({ color = '#FF69B4', size = 10, style }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1, 0], 
        rotate: [0, 90, 180],
        opacity: [0, 1, 0] 
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </motion.svg>
  );
};

export const Sparkles: React.FC<{ active: boolean }> = ({ active }) => {
  const [sparkles, setSparkles] = useState<{ id: string; top: string; left: string }[]>([]);

  useEffect(() => {
    if (!active) {
      setSparkles([]);
      return;
    }

    const interval = setInterval(() => {
      const id = String(Date.now());
      const sparkle = {
        id,
        top: `${random(0, 100)}%`,
        left: `${random(0, 100)}%`,
      };

      setSparkles((prev) => [...prev, sparkle]);

      // Cleanup old sparkles
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 1000);
    }, 100); // New sparkle every 100ms

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {sparkles.map((s) => (
        <SparkleInstance
          key={s.id}
          style={{ position: 'absolute', top: s.top, left: s.left }}
        />
      ))}
    </div>
  );
};