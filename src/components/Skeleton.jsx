import { motion } from 'framer-motion';

export default function Skeleton({ className = '', ...props }) {
  return (
    <motion.div
      className={`bg-white/5 animate-pulse rounded-lg ${className}`}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card p-4">
      <Skeleton className="aspect-[3/4] mb-4" />
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}