import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Star, RefreshCw, Calendar, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Product } from '@/data/products';
import { BuyNowModal } from '@/components/BuyNowModal';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface CartItem extends Product {
  quantity: number;
}

interface SubscriptionSettings {
  enabled: boolean;
  frequency: string;
}

// Essential products that are eligible for subscription
const essentialProducts = ['diaper', 'formula', 'cereal', 'wipes', 'powder', 'oil', 'soap', 'shampoo'];

const subscriptionOptions = [
  { frequency: 'weekly', discount: 5, label: 'Weekly', description: 'Every 7 days' },
  { frequency: 'bi-weekly', discount: 8, label: 'Bi-Weekly', description: 'Every 14 days' },
  { frequency: 'monthly', discount: 10, label: 'Monthly', description: 'Every 30 days' },
  { frequency: 'bi-monthly', discount: 12, label: 'Bi-Monthly', description: 'Every 60 days' },
];

export function CartPage() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [subscriptionSettings, setSubscriptionSettings] = useState<Record<string, SubscriptionSettings>>({});
  const { toast } = useToast();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  // Group cart items by ID and calculate quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, [] as CartItem[]);

  // Check if item is eligible for subscription
  const isEssentialProduct = (product: Product) => {
    return essentialProducts.some(essential => 
      product.name.toLowerCase().includes(essential)
    );
  };

  // Update subscription settings for a product
  const updateSubscriptionSettings = (productId: string, settings: Partial<SubscriptionSettings>) => {
    setSubscriptionSettings(prev => ({
      ...prev,
      [productId]: { ...prev[productId], ...settings }
    }));
  };

  // Calculate discounted price for subscription items
  const getItemPrice = (item: CartItem) => {
    const subscription = subscriptionSettings[item.id];
    if (subscription?.enabled) {
      const option = subscriptionOptions.find(opt => opt.frequency === subscription.frequency);
      const discount = option ? option.discount : 0;
      return item.price * (1 - discount / 100);
    }
    return item.price;
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    // Find current quantity
    const currentQuantity = groupedItems.find(item => item.id === productId)?.quantity || 0;
    const product = cartItems.find(item => item.id === productId);
    
    if (!product) return;

    if (newQuantity > currentQuantity) {
      // Add more items
      for (let i = 0; i < newQuantity - currentQuantity; i++) {
        addToCart(product);
      }
    } else {
      // Remove some items
      for (let i = 0; i < currentQuantity - newQuantity; i++) {
        removeFromCart(productId);
      }
    }
    
    toast({
      title: "Cart updated! 🛒",
      description: "Quantity has been updated."
    });
  };

  const removeItem = (productId: string) => {
    // Remove all instances of this product
    const itemCount = cartItems.filter(item => item.id === productId).length;
    for (let i = 0; i < itemCount; i++) {
      removeFromCart(productId);
    }
    toast({
      title: "Item removed! 🗑️",
      description: "Product has been removed from your cart."
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared! 🧹",
      description: "All items have been removed from your cart."
    });
  };

  const handleBuyNow = (product: Product) => {
    setCheckoutProduct(product);
    setShowCheckoutModal(true);
  };

  const handleBuyAll = () => {
    if (groupedItems.length > 0) {
      // Show success message based on subscription status
      const subscriptionItems = groupedItems.filter(item => subscriptionSettings[item.id]?.enabled);
      
      if (subscriptionItems.length > 0) {
        toast({
          title: "Subscriptions & Orders Placed! 🎉",
          description: `${subscriptionItems.length} subscription(s) activated and ${groupedItems.length - subscriptionItems.length} one-time order(s) placed.`
        });
      } else {
        toast({
          title: "Orders Placed Successfully! 🎉",
          description: `${groupedItems.length} item(s) will be delivered soon.`
        });
      }
      
      // Clear cart after successful checkout
      setTimeout(() => {
        clearCart();
      }, 1500);
    }
  };

  const subtotal = groupedItems.reduce((total, item) => total + (getItemPrice(item) * item.quantity), 0);
  const originalSubtotal = groupedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalSavings = originalSubtotal - subtotal;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;
  
  // Check if any items have subscription enabled
  const hasSubscriptions = groupedItems.some(item => subscriptionSettings[item.id]?.enabled);

  if (groupedItems.length === 0) {
    return (
      <div className="min-h-screen bg-background w-full overflow-hidden">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>

          {/* Empty Cart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-6"
            >
              🛒
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Badge variant="secondary" className="text-sm">
              {cartItems.length} items
            </Badge>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleClearCart}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {groupedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  <Card className="shadow-card hover:shadow-soft transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                {isEssentialProduct(item) && (
                                  <Badge variant="secondary" className="text-xs">
                                    <RefreshCw className="w-3 h-3 mr-1" />
                                    Auto-Buy
                                  </Badge>
                                )}
                              </div>
                              {item.rating && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-muted-foreground">
                                    {item.rating} ({item.reviews})
                                  </span>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Subscription Options for Essential Products */}
                          {isEssentialProduct(item) && (
                            <div className="p-3 border border-dashed border-purple-200 rounded-lg bg-purple-50/50">
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor={`subscription-${item.id}`} className="text-sm font-medium flex items-center gap-2">
                                  <RefreshCw className="w-4 h-4 text-purple-600" />
                                  Subscribe and Save
                                </Label>
                                <Switch
                                  id={`subscription-${item.id}`}
                                  checked={subscriptionSettings[item.id]?.enabled || false}
                                  onCheckedChange={(enabled) => 
                                    updateSubscriptionSettings(item.id, { 
                                      enabled, 
                                      frequency: enabled ? 'monthly' : '' 
                                    })
                                  }
                                />
                              </div>
                              
                              {subscriptionSettings[item.id]?.enabled && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="space-y-2"
                                >
                                  <Select 
                                    value={subscriptionSettings[item.id]?.frequency || 'monthly'}
                                    onValueChange={(frequency) => 
                                      updateSubscriptionSettings(item.id, { frequency })
                                    }
                                  >
                                    <SelectTrigger className="h-8 text-sm">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {subscriptionOptions.map((option) => (
                                        <SelectItem key={option.frequency} value={option.frequency}>
                                          <div className="flex items-center justify-between">
                                            <span>{option.label}</span>
                                            <span className="text-xs text-green-600 ml-2">
                                              {option.discount}% off
                                            </span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </motion.div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className={`text-lg font-bold ${subscriptionSettings[item.id]?.enabled ? 'text-green-600' : 'text-primary'}`}>
                                ₹{Math.round(getItemPrice(item) * item.quantity)}
                              </div>
                              {subscriptionSettings[item.id]?.enabled && (
                                <div className="text-sm text-muted-foreground line-through">
                                  ₹{item.price * item.quantity}
                                </div>
                              )}
                              {!subscriptionSettings[item.id]?.enabled && item.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice * item.quantity}
                                </div>
                              )}
                              {subscriptionSettings[item.id]?.enabled && (
                                <div className="text-xs text-green-600">
                                  Save ₹{Math.round((item.price - getItemPrice(item)) * item.quantity)} per order
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Buy Now Button */}
                          <Button
                            onClick={() => handleBuyNow(item)}
                            className="w-full bg-primary hover:bg-primary/90"
                            size="sm"
                          >
                            Buy This Item Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{Math.round(subtotal)}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-4 h-4" />
                        Subscription Savings
                      </span>
                      <span>-₹{Math.round(totalSavings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">
                      🎉 Free shipping on orders above ₹500!
                    </p>
                  )}
                  
                  {hasSubscriptions && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                        <RefreshCw className="w-4 h-4" />
                        Subscription Benefits
                      </div>
                      <ul className="text-xs text-green-600 mt-1 space-y-1">
                        <li>• Automatic deliveries</li>
                        <li>• Free shipping on all orders</li>
                        <li>• Cancel or modify anytime</li>
                      </ul>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className={`${hasSubscriptions ? 'text-green-600' : 'text-primary'}`}>₹{Math.round(total)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleBuyAll}
                  className={`w-full text-lg py-6 ${hasSubscriptions ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {hasSubscriptions ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5" />
                      Setup Subscriptions & Checkout
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

                {hasSubscriptions && (
                  <div className="text-xs text-center text-muted-foreground">
                    <p>Subscription items will be delivered automatically</p>
                    <p>Manage or cancel anytime from your account</p>
                  </div>
                )}

                <div className="text-center">
                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Badges */}
                <div className="pt-4 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    🔒 Secure checkout guaranteed
                  </p>
                  <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                    <span>💳 All cards accepted</span>
                    <span>🚚 Fast delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutProduct && (
        <BuyNowModal
          product={checkoutProduct}
          isOpen={showCheckoutModal}
          onClose={() => {
            setShowCheckoutModal(false);
            setCheckoutProduct(null);
          }}
        />
      )}
    </div>
  );
}