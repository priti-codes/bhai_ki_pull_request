import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CreditCard, Check, RefreshCw, Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface BuyNowModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface SubscriptionOption {
  frequency: string;
  discount: number;
  label: string;
  description: string;
}

const subscriptionOptions: SubscriptionOption[] = [
  { frequency: 'weekly', discount: 5, label: 'Weekly', description: 'Every 7 days' },
  { frequency: 'bi-weekly', discount: 8, label: 'Bi-Weekly', description: 'Every 14 days' },
  { frequency: 'monthly', discount: 10, label: 'Monthly', description: 'Every 30 days' },
  { frequency: 'bi-monthly', discount: 12, label: 'Bi-Monthly', description: 'Every 60 days' },
];

// Essential products that are eligible for subscription
const essentialProducts = ['diaper', 'formula', 'cereal', 'wipes', 'powder', 'oil', 'soap', 'shampoo'];

interface BuyNowModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function BuyNowModal({ product, isOpen, onClose }: BuyNowModalProps) {
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [enableSubscription, setEnableSubscription] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const { toast } = useToast();

  // Check if product is eligible for subscription
  const isEssentialProduct = essentialProducts.some(essential => 
    product.name.toLowerCase().includes(essential)
  );

  const selectedOption = subscriptionOptions.find(opt => opt.frequency === selectedFrequency);
  const subscriptionDiscount = enableSubscription && selectedOption ? selectedOption.discount : 0;
  const discountedPrice = product.price * (1 - subscriptionDiscount / 100);
  const totalSavings = enableSubscription ? product.price - discountedPrice : 0;

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
      
      const orderMessage = enableSubscription 
        ? `Subscription order placed! 🎉 Your ${product.name} will be delivered ${selectedOption?.label.toLowerCase()} with ${subscriptionDiscount}% savings.`
        : `Order placed successfully! 🎉 Your ${product.name} will be delivered soon.`;
      
      toast({
        title: enableSubscription ? "Subscription Activated!" : "Order Placed Successfully!",
        description: orderMessage
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
                <div className="relative w-16 h-16 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.emoji ? (
                    <span className="text-2xl">{product.emoji}</span>
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  {isEssentialProduct && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0.5">
                      <RefreshCw className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  {isEssentialProduct && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      <Package className="w-3 h-3 mr-1" />
                      Auto-Buy Available
                    </Badge>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-lg font-bold ${enableSubscription ? 'text-green-600' : 'text-primary'}`}>
                      ₹{enableSubscription ? Math.round(discountedPrice) : product.price}
                    </span>
                    {product.originalPrice && !enableSubscription && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    {enableSubscription && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                        <Badge variant="destructive" className="text-xs">
                          {subscriptionDiscount}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>
                  {enableSubscription && totalSavings > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      💰 You save ₹{Math.round(totalSavings)} per order with subscription!
                    </p>
                  )}
                </div>
              </div>

              {/* Subscription Options - Only for Essential Products */}
              {isEssentialProduct && (
                <div className="space-y-4 p-4 border-2 border-dashed border-purple-200 rounded-lg bg-purple-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-purple-600" />
                      <Label htmlFor="subscription-toggle" className="text-sm font-medium">
                        Auto-Buy Subscription
                      </Label>
                      <Badge variant="secondary" className="text-xs">
                        Save up to 12%
                      </Badge>
                    </div>
                    <Switch
                      id="subscription-toggle"
                      checked={enableSubscription}
                      onCheckedChange={setEnableSubscription}
                    />
                  </div>
                  
                  {enableSubscription && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="space-y-2">
                        <Label className="text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Delivery Frequency
                        </Label>
                        <Select value={selectedFrequency} onValueChange={setSelectedFrequency}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {subscriptionOptions.map((option) => (
                              <SelectItem key={option.frequency} value={option.frequency}>
                                <div className="flex items-center justify-between w-full">
                                  <span>{option.label}</span>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({option.description}) - {option.discount}% off
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="bg-white p-3 rounded-md border">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="font-medium">Subscription Benefits:</span>
                        </div>
                        <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-6">
                          <li>• {selectedOption?.discount}% discount on every order</li>
                          <li>• Free delivery on all subscription orders</li>
                          <li>• Skip or pause anytime</li>
                          <li>• Priority customer support</li>
                          <li>• Cancel anytime with no penalties</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

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
                  className={`flex-1 ${enableSubscription ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      {enableSubscription ? (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Start Subscription
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Confirm Purchase
                        </>
                      )}
                    </div>
                  )}
                </Button>
              </div>
              
              {enableSubscription && (
                <div className="text-xs text-center text-muted-foreground mt-2">
                  <p>💡 First delivery in 2-3 days, then {selectedOption?.label.toLowerCase()}</p>
                  <p>You can modify or cancel anytime from your account</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}