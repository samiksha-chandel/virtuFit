import React, { useState, useCallback, useEffect } from 'react'; import { useNavigate } from 'react-router-dom'; import { motion, AnimatePresence } from 'framer-motion'; import { useAuth } from '../contexts/AuthContext'; import { useApp } from '../contexts/AppContext'; import Button from '../components/Button'; import { Upload, Image as ImageIcon, X, Sparkles, ArrowRight, ArrowLeft, RefreshCcw } from 'lucide-react';

export default function PhotoUpload() { const { user } = useAuth(); const { selectProduct, uploadImage, selectedProduct } = useApp(); const navigate = useNavigate(); const [dragActive, setDragActive] = useState(false); const [imagePreview, setImagePreview] = useState(null);

useEffect(() => { if (!user) navigate('/login'); if (!selectedProduct) navigate('/products'); }, [user, navigate, selectedProduct]);

const handleDrag = useCallback((e) => { e.preventDefault(); e.stopPropagation(); if (e.type === 'dragenter' || e.type === 'dragover') { setDragActive(true); } else if (e.type === 'dragleave') { setDragActive(false); } }, []);

const handleDrop = useCallback((e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); const files = e.dataTransfer.files; if (files && files[0]) handleFile(files[0]); }, []);

const handleFile = (file) => { if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; } const reader = new FileReader(); reader.onload = (e) => setImagePreview(e.target.result); reader.readAsDataURL(file); };

const handleFileInput = (e) => { const file = e.target.files[0]; if (file) handleFile(file); };

const useSampleImage = () => { setImagePreview('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=800&fit=crop&crop=faces'); };

const removeImage = () => setImagePreview(null);

const handleContinue = () => { if (imagePreview) { uploadImage(imagePreview); navigate('/tryon'); } };

return ( <div className="min-h-screen pt-24 pb-12"> <div className="max-w-4xl mx-auto px-6"> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12"> <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium mb-4">Step 2 of 3</span> <h1 className="text-4xl md:text-5xl font-bold font-display mb-4"> Upload Your <span className="text-gradient">Photo</span> </h1> <p className="text-white/60 text-lg">Add a full-body photo for the best virtual try-on experience</p> </motion.div>

    {selectedProduct && (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-8 p-4 glass rounded-xl">
        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <p className="text-sm text-white/60">Selected Product</p>
          <p className="font-semibold">{selectedProduct.name}</p>
        </div>
        <button onClick={() => navigate('/products')} className="ml-auto p-2 text-white/60 hover:text-white">
          <RefreshCcw className="w-5 h-5" />
        </button>
      </motion.div>
    )}

    <AnimatePresence mode="wait">
      {!imagePreview ? (
        <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragActive ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-white/40'}`}>
            <input type="file" accept="image/*" onChange={handleFileInput} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{dragActive ? 'Drop your image here' : 'Drag & drop your photo'}</h3>
              <p className="text-white/60 mb-6">or click to browse from your device</p>
              <div className="flex items-center gap-4 text-sm text-white/40"><span>JPG</span><span>•</span><span>PNG</span><span>•</span><span>WEBP</span></div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/40 mb-4">or use a sample photo</p>
            <Button variant="secondary" onClick={useSampleImage}><ImageIcon className="w-5 h-5 mr-2" />Use Sample Photo</Button>
          </div>
        </motion.div>
      ) : (
        <motion.div key="preview" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <button onClick={removeImage} className="absolute top-4 right-4 p-3 rounded-full glass hover:bg-white/20"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="secondary" onClick={removeImage}><RefreshCcw className="w-5 h-5 mr-2" />Change Photo</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-12">
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => navigate('/products')}><ArrowLeft className="w-5 h-5 mr-2" />Back</Button>
        <Button size="lg" disabled={!imagePreview} onClick={handleContinue}>Generate Try-On<Sparkles className="w-5 h-5 ml-2" /></Button>
      </div>
    </motion.div>
  </div>
</div>
); }