import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/data/products';
import { BuyNowModal } from './BuyNowModal';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onAddToCart?.(product);
    setIsLoading(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="group overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 border-0 bg-card">
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.badge && (
              <Badge 
                className="absolute top-2 left-2 bg-primary text-primary-foreground font-medium shadow-sm"
              >
                {product.badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge 
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground font-bold"
              >
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-card-foreground line-clamp-2 text-sm leading-relaxed">
                {product.name}
              </h3>
              
              {product.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex gap-2 pt-2">
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
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <BuyNowModal
        product={product}
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
      />
    </>
  );
}