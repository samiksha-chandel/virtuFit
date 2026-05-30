import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingBag, Percent } from 'lucide-react';

const icons = {
  users: Users,
  tryons: ShoppingBag,
  conversion: Percent,
  trending: TrendingUp
};

export default function StatsCard({ 
  title, 
  value, 
  icon, 
  trend,
  index = 0 
}) {
  const Icon = icons[icon] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        
        {trend && (
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>{trend}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-white/60 mt-1">{title}</p>
      </div>
    </motion.div>
  );
}