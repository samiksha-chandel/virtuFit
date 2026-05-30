import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Button from '../components/Button';
import AIProgress from '../components/AIProgress';
import { ArrowLeft, Download, RefreshCcw, ZoomIn, ZoomOut, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TryOn() {
  const { user } = useAuth();
  const { selectedProduct, uploadedImage, isGenerating, generationStage, generateResult } = useApp();
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
    if (!selectedProduct || !uploadedImage) navigate('/products');
  }, [user, navigate, selectedProduct, uploadedImage]);

  const handleGenerate = async () => {
    await generateResult();
    setTimeout(() => setShowResult(true), 500);
  };

  const handleDownload = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';

    const overlayImg = new Image();
    overlayImg.crossOrigin = 'anonymous';

    baseImg.src = uploadedImage;
    overlayImg.src = selectedProduct.image;

    await Promise.all([
      new Promise((resolve) => (baseImg.onload = resolve)),
      new Promise((resolve) => (overlayImg.onload = resolve))
    ]);

    canvas.width = baseImg.width;
    canvas.height = baseImg.height;

    ctx.drawImage(baseImg, 0, 0);

    const overlayWidth = canvas.width * 0.75;
    const overlayHeight = canvas.height * 0.75;

    const x = (canvas.width - overlayWidth) / 2;
    const y = (canvas.height - overlayHeight) / 2;

    ctx.drawImage(
      overlayImg,
      x,
      y,
      overlayWidth,
      overlayHeight
    );

    const link = document.createElement('a');
    link.download = 'virtufit-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!selectedProduct || !uploadedImage) return null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium mb-4">Step 3 of 3</span>
          <h1 className="text-4xl md:text-5xl font-bold font-display">Virtual <span className="text-gradient">Try-On</span></h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20">
              <AIProgress currentStage={generationStage} />
            </motion.div>
          ) : showResult ? (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="glass-card p-2">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                      <motion.img src={uploadedImage} alt="Original" className="w-full h-full object-cover" style={{ scale: zoom }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="w-3/4 h-3/4 relative">
                          <img src={selectedProduct.image} alt="Overlay" className="w-full h-full object-contain" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-3 rounded-full glass hover:bg-white/10"><ZoomOut className="w-5 h-5" /></button>
                    <span className="text-sm text-white/60 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(z => Math.min(2, z + 0.25))} className="p-3 rounded-full glass hover:bg-white/10"><ZoomIn className="w-5 h-5" /></button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Try-On Complete!</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div><p className="text-sm text-white/60">Product</p><p className="font-semibold">{selectedProduct.name}</p><p className="text-primary font-bold">${selectedProduct.price}</p></div>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 mb-6"><CheckCircle2 className="w-5 h-5" /><span className="text-sm font-medium">AI Fit Optimized</span></div>
                    <div className="space-y-3">
                      <Button className="w-full gap-2" onClick={handleDownload}><Download className="w-5 h-5" />Download Result</Button>
                      <Button variant="ghost" className="w-full gap-2" onClick={() => navigate('/products')}><RefreshCcw className="w-5 h-5" />Try Another</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="max-w-2xl mx-auto text-center py-20">
                <div className="glass-card p-12">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center mx-auto mb-8"><Sparkles className="w-12 h-12 text-white" /></div>
                  <h2 className="text-2xl font-bold mb-4">Ready to Generate</h2>
                  <p className="text-white/60 mb-8">Click below to see how {selectedProduct.name} looks on you!</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden"><img src={uploadedImage} alt="Your" className="w-full h-full object-cover" /></div>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white/5"><img src={selectedProduct.image} alt="Product" className="w-full h-full object-cover" /></div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button variant="secondary" onClick={() => navigate('/upload')}><ArrowLeft className="w-5 h-5 mr-2" />Back</Button>
                    <Button size="lg" onClick={handleGenerate}><Sparkles className="w-5 h-5 mr-2" />Generate Try-On</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}