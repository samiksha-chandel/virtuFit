import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [appReady, setAppReady] = useState(false);

  const generateResult = async () => {
    setIsGenerating(true);
    setGenerationStage(0);

    const stages = [
      { stage: 1, message: 'Uploading image...', duration: 800 },
      { stage: 2, message: 'Detecting body landmarks...', duration: 1200 },
      { stage: 3, message: 'Analyzing proportions...', duration: 1000 },
      { stage: 4, message: 'Mapping garment placement...', duration: 1500 },
      { stage: 5, message: 'Optimizing fit...', duration: 800 },
      { stage: 6, message: 'Rendering result...', duration: 1000 },
      { stage: 7, message: 'Finalizing preview...', duration: 600 },
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, stages[i].duration));
      setGenerationStage(stages[i].stage);
    }

    setTryOnResult({
      originalImage: uploadedImage,
      product: selectedProduct,
      generatedAt: new Date()
    });
    
    setIsGenerating(false);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  const uploadImage = (imageData) => {
    setUploadedImage(imageData);
  };

  const resetTryOn = () => {
    setUploadedImage(null);
    setSelectedProduct(null);
    setTryOnResult(null);
    setGenerationStage(0);
  };

  return (
    <AppContext.Provider value={{
      selectedProduct,
      uploadedImage,
      tryOnResult,
      isGenerating,
      generationStage,
      appReady,
      setAppReady,
      selectProduct,
      uploadImage,
      generateResult,
      resetTryOn
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}