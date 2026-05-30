import React, { useRef } from 'react'; import { motion, useMotionValue, useTransform } from 'framer-motion'; import { Check } from 'lucide-react';

export default function ProductCard({ product, isSelected, onSelect, index = 0 }) { const cardRef = useRef(null);

const x = useMotionValue(0); const y = useMotionValue(0);

const rotateX = useTransform(y, [-100, 100], [5, -5]); const rotateY = useTransform(x, [-100, 100], [-5, 5]);

const handleMouseMove = (e) => { const rect = cardRef.current.getBoundingClientRect(); const centerX = rect.left + rect.width / 2; const centerY = rect.top + rect.height / 2; x.set(e.clientX - centerX); y.set(e.clientY - centerY); };

const handleMouseLeave = () => { x.set(0); y.set(0); };

return ( <motion.div ref={cardRef} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} whileHover={{ scale: 1.02 }} onClick={() => onSelect(product)} className={`relative cursor-pointer group ${isSelected ? 'ring-2 ring-primary' : ''}`} > <div className={`glass-card p-4 transition-all duration-300 ${isSelected ? 'shadow-lg shadow-primary/20 border-primary/50' : 'hover:border-white/20'}`}> <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4"> <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </div>

    <div className="space-y-2">
      <span className="text-xs font-medium text-primary">{product.brand}</span>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-white/60 line-clamp-2">{product.description}</p>
      <p className="text-lg font-bold text-gradient">${product.price}</p>
    </div>

    <motion.div
      className="absolute inset-0 rounded-2xl"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      style={{
        background: `linear-gradient(135deg, ${product.colors[0]}20, ${product.colors[1]}20)`,
        border: `1px solid ${product.colors[1]}40`
      }}
    />
  </div>
</motion.div>
); }