import React from 'react'; import { Link, useLocation } from 'react-router-dom'; import { motion } from 'framer-motion'; import { useAuth } from '../contexts/AuthContext'; import { Sparkles, LogOut, Menu, X } from 'lucide-react'; import { useState } from 'react';

export default function Navigation() { const { user, logOut } = useAuth(); const location = useLocation(); const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const isLanding = location.pathname === '/'; const isLogin = location.pathname === '/login'; const isAdmin = location.pathname === '/admin';

const navLinks = [ { path: '/products', label: 'Products' }, { path: '/upload', label: 'Try On' }, { path: '/admin',  label: 'Admin'} ];

return ( <> <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className={`fixed top-0 left-0 w-full z-[9999] px-6 py-4 ${isLanding ? 'bg-transparent' : 'glass'}`} > <div className="w-full flex items-center"> <Link to="/" className="flex items-center gap-2 group"> <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center"> <Sparkles className="w-5 h-5 text-white" /> </div> <span className="text-xl font-bold font-display tracking-tight"> Virtu<span className="text-gradient">Fit</span> </span> </Link>

      <div className="hidden md:flex items-center gap-8 ml-12">
        {!isLogin && !isAdmin && navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors duration-300 ${
              location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4 ml-auto">
        {user ? (
          <>
            {user.email === 'admin@virtufit.com' && (
              <Link
                to="/admin"
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={logOut}
              className="p-2 rounded-lg text-white/60 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary/50">
              <img
                src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
            </div>
          </>
        ) : !isLogin ? (
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        ) : null}
      </div>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-white"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

    {mobileMenuOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden fixed top-20 left-4 right-4 mt-2 rounded-2xl overflow-hidden z-[10000]">
          
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3 text-white/60 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
        {user && (
          <button
            onClick={() => {
              logOut();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-3 text-white/60 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        )}
      </motion.div>
    )}
  </motion.nav>
</>
); }