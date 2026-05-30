import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Marquee from '../components/Marquee';
import { Sparkles, ScanFace, Shirt, Download, ArrowRight, Play, Star } from 'lucide-react';

const features = [
  { icon: ScanFace, title: 'AI Body Detection', description: 'Advanced algorithms analyze your body type for precise virtual fitting' },
  { icon: Shirt, title: 'Premium Fashion', description: 'Curated collection of luxury brands and designer pieces' },
  { icon: Download, title: 'High-Res Results', description: 'Download photorealistic try-on images in stunning quality' }
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Fashion Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', text: 'VirtuFit completely transformed how I shop for clothes. The accuracy is incredible.', rating: 5 },
  { name: 'Marcus Webb', role: 'Style Influencer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', text: 'Finally, an app that lets me try everything before buying. Game changer.', rating: 5 },
  { name: 'Yuki Tanaka', role: 'Creative Director', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki', text: 'The virtual try-on quality is unmatched. It feels like magic.', rating: 5 }
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { value: '10K+', label: 'Products' },
    { value: '50K+', label: 'Try-Ons Daily' },
    { value: '98%', label: 'Accuracy' },
    { value: '4.9', label: 'App Rating' }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>The Future of Fashion</span>
            </motion.span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6">
              Try Before<br />
              <span className="text-gradient">You Buy</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10">
              Experience luxury fashion in your own space. Our AI-powered virtual try-on delivers photorealistic results instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => user ? navigate('/products') : navigate('/login')} className="group">
                Start Trying On <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => window.open("https://youtu.be/m4jUq0fsEys", "_blank")}><Play className="w-5 h-5 mr-2" />Watch Demo</Button>
            </div>
          </motion.div>
        </div>

      </section>

      <section className="py-8 border-y border-white/5">
        <Marquee />
      </section>

      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">How It Works</h2>
            <p className="text-white/60 text-lg">Three simple steps to find your perfect look</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8 text-center group hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-gradient">{stat.value}</p>
                <p className="text-white/60 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Loved by Thousands</h2>
            <p className="text-white/60 text-lg">See what our community is saying</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-primary text-primary" />))}
                </div>
                <p className="text-white/80 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">Ready to Find<br /><span className="text-gradient">Your Style?</span></h2>
            <p className="text-xl text-white/60 mb-10">Join thousands of fashion-forward individuals already using VirtuFit</p>
            <Button size="lg" onClick={() => user ? navigate('/products') : navigate('/login')}>Get Started Free<ArrowRight className="w-5 h-5 ml-2" /></Button>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold font-display">VirtuFit</span>
            </div>
            <p className="text-white/40 text-sm">© 2027 VirtuFit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}