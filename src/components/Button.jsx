import React from 'react'; import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) { const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full overflow-hidden transition-all duration-300";

const variants = { primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30", secondary: "glass text-white hover:bg-white/10", ghost: "text-white/60 hover:text-white", outline: "border border-glass-border text-white hover:bg-white/5" };

const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };

return ( <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} > <span className="relative z-10 flex items-center gap-2">{children}</span> </motion.button> ); }