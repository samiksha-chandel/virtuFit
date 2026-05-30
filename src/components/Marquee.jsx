import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const brandItems = products.map((p) => p.brand);
const uniqueBrands = [...new Set(brandItems)];

export default function Marquee() {
  return (
    <div className="py-12 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...uniqueBrands, ...uniqueBrands, ...uniqueBrands].map((brand, i) => (
          <span
            key={i}
            className="text-4xl font-bold font-display whitespace-nowrap text-white/40 hover:text-gradient transition-colors cursor-default"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
}