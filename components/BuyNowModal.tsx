import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface BuyNowModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function BuyNowModal({ product, isOpen, onClose }: BuyNowModalProps) {
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();

  const handleConfirmPurchase = async () => {
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter your delivery address",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderPlaced(true);
    setIsProcessing(false);
    
    // Auto close after success
    setTimeout(() => {
      setOrderPlaced(false);
      onClose();
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your ${product.name} will be delivered soon.`
      });
    }, 2000);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setOrderPlaced(false);
      setAddress('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Quick Checkout
          </DialogTitle>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          {orderPlaced ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-green-600" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-green-600">Order Placed!</h3>
                <p className="text-sm text-muted-foreground">
                  Your order will be delivered within 2-3 days
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Product Summary */}
              <div className="flex gap-4 p-4 bg-muted rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Input */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  placeholder="Enter your full address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmPurchase}
                  disabled={isProcessing}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Confirm Purchase'
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}