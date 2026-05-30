import React, { useEffect } from 'react'; import { useLocation } from 'react-router-dom'; import { motion, AnimatePresence } from 'framer-motion'; import Lenis from 'lenis'; import Navigation from '../components/Navigation'; import BackgroundSystem from '../components/BackgroundSystem';

const pageVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

export default function Layout({ children }) { const location = useLocation();

useEffect(() => { const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

return () => lenis.destroy();
}, []);

useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

return ( <div className="relative min-h-screen overflow-hidden"> <BackgroundSystem /> <Navigation />

  <main className="relative z-10">
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </main>
</div>
); }