import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '@/data/products';
import { Sparkles, X } from 'lucide-react';

interface RecommendationsProps {
  baseProduct: Product;
  recommendations: Product[];
  onAddToCart: (product: Product) => void;
  onDismiss: () => void;
}

export const Recommendations = ({ 
  baseProduct, 
  recommendations, 
  onAddToCart, 
  onDismiss 
}: RecommendationsProps) => {
  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 my-6 mx-auto w-full relative"
    >
      {/* Dismiss Button */}
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 transition-colors"
        aria-label="Dismiss recommendations"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-orange-100 p-2 rounded-full">
          <Sparkles className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-orange-900">
            Perfect with "{baseProduct.name}"
          </h3>
          <p className="text-sm text-orange-700">
            Parents who bought this also added these items
          </p>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-orange-100"
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              compact={true}
            />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-orange-600">
          💡 Add multiple items for bundle discounts
        </p>
      </div>
    </motion.div>
  );
};
