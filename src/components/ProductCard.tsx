import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Zap, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product, getRecommendations } from '@/data/products';
import { BuyNowModal } from './BuyNowModal';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  compact?: boolean;
  showRecommendations?: boolean;
  onRecommendationToggle?: (productId: string, show: boolean) => void;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  compact = false, 
  showRecommendations = false,
  onRecommendationToggle 
}: ProductCardProps) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showRecommendations) {
      const recs = getRecommendations(product, 4);
      setRecommendations(recs);
    }
  }, [showRecommendations, product]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onAddToCart?.(product);
    
    // Show recommendations for this product
    onRecommendationToggle?.(product.id, true);
    
    // Auto-hide after 15 seconds
    setTimeout(() => {
      onRecommendationToggle?.(product.id, false);
    }, 15000);
    
    setIsLoading(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <motion.div
        ref={cardRef}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <Card className="group overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 border-0 bg-card">
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                compact ? 'h-32' : 'h-48'
              }`}
            />
            {product.badge && (
              <Badge 
                className={`absolute top-2 left-2 bg-primary text-primary-foreground font-medium shadow-sm ${
                  compact ? 'text-xs px-1 py-0' : ''
                }`}
              >
                {product.badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge 
                className={`absolute top-2 right-2 bg-destructive text-destructive-foreground font-bold ${
                  compact ? 'text-xs px-1 py-0' : ''
                }`}
              >
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          
          <CardContent className={compact ? "p-3 space-y-2" : "p-4 space-y-3"}>
            <div>
              <h3 className={`font-semibold text-card-foreground line-clamp-2 leading-relaxed ${
                compact ? 'text-xs' : 'text-sm'
              }`}>
                {product.name}
              </h3>
              
              {product.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {product.rating} {compact ? '' : `(${product.reviews})`}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`font-bold text-primary ${compact ? 'text-sm' : 'text-lg'}`}>
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            
            <div className={`flex gap-2 ${compact ? 'pt-1' : 'pt-2'}`}>
              {compact ? (
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  {isLoading ? 'Adding...' : 'Add to Cart'}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={handleAddToCart}
                    disabled={isLoading}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    {isLoading ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium"
                    onClick={() => setShowBuyModal(true)}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Buy Now
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Modal - Positioned relative to this specific product */}
        <AnimatePresence>
          {showRecommendations && recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full z-[60] mt-4 pointer-events-auto"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100vw',
                maxWidth: '1200px'
              }}
            >
              <div className="mx-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-6 shadow-2xl backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-orange-900">
                        Perfect with "{product.name}"
                      </h4>
                      <p className="text-sm text-orange-700">
                        Frequently bought together by other parents
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRecommendationToggle?.(product.id, false)}
                    className="text-orange-400 hover:text-orange-600 transition-colors p-2 hover:bg-orange-100 rounded-full flex-shrink-0"
                    aria-label="Close recommendations"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendations.slice(0, 4).map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col gap-3">
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight mb-2">
                            {rec.name}
                          </h5>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-sm font-bold text-primary">
                              ₹{rec.price}
                            </span>
                            {rec.rating && (
                              <div className="flex items-center">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-500 ml-1">
                                  {rec.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="w-full text-xs bg-primary hover:bg-primary/90"
                            onClick={() => {
                              onAddToCart?.(rec);
                              onRecommendationToggle?.(product.id, false);
                            }}
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-orange-600 font-medium">
                    💡 Bundle these items together for additional discounts
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <BuyNowModal
        product={product}
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
      />
    </>
  );
}