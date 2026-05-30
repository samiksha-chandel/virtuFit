import React, { useEffect } from 'react'; import { useNavigate } from 'react-router-dom'; import { motion } from 'framer-motion'; import { useAuth } from '../contexts/AuthContext'; import ProductCard from '../components/ProductCard'; import Button from '../components/Button'; import { products } from '../data/products'; import { ArrowRight } from 'lucide-react'; import { useApp } from '../contexts/AppContext';

export default function ProductSelection() { const { user } = useAuth(); const navigate = useNavigate(); const [selectedProduct, setSelectedProduct] = React.useState(null);

useEffect(() => { if (!user) { navigate('/login'); } }, [user, navigate]);
const { selectProduct } = useApp();
const handleContinue = () => {if (selectedProduct) {selectProduct(selectedProduct);navigate('/upload');}};

return ( <div className="min-h-screen pt-24 pb-12"> <div className="max-w-7xl mx-auto px-6"> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12" > <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium mb-4"> Step 1 of 3 </span> <h1 className="text-4xl md:text-5xl font-bold font-display mb-4"> Select Your <span className="text-gradient">Product</span> </h1> <p className="text-white/60 text-lg"> Choose from our curated collection of premium fashion </p> </motion.div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProduct?.id === product.id}
          onSelect={setSelectedProduct}
          index={index}
        />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center mt-12"
    >
      <Button
        size="lg"
        disabled={!selectedProduct}
        onClick={handleContinue}
        className="gap-2"
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  </div>
</div>
); }