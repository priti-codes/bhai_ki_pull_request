'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/data/products';
import { BuyNowModal } from '@/components/BuyNowModal';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const { toast } = useToast();

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

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedCart: Product[] = [];
    groupedItems.forEach(item => {
      const quantity = item.id === productId ? newQuantity : item.quantity;
      for (let i = 0; i < quantity; i++) {
        updatedCart.push(item);
      }
    });

    setCartItems(updatedCart);
    toast({
      title: "Cart updated! 🛒",
      description: "Item quantity has been updated."
    });
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    toast({
      title: "Item removed! 🗑️",
      description: "Item has been removed from your cart."
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared! 🧹",
      description: "All items have been removed from your cart."
    });
  };

  const handleBuyNow = (product: Product) => {
    setCheckoutProduct(product);
    setShowCheckoutModal(true);
  };

  const subtotal = groupedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (groupedItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-400 mb-4"
            >
              <ShoppingBag className="h-24 w-24 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-primary text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <Badge variant="secondary">{groupedItems.length} items</Badge>
          </div>
          
          {groupedItems.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {groupedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center text-2xl">
                            🍼
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                              <p className="text-muted-foreground text-sm">{item.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (item.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-1">
                              ({item.rating || 0})
                            </span>
                          </div>

                          {/* Price and Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleBuyNow(item)}
                              >
                                Buy Now
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                            </div>
                          </div>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({groupedItems.length} items)</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <p className="text-sm text-green-600">🎉 Free shipping on orders over ₹500!</p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-semibold mb-6">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>

                  <Button className="w-full bg-gradient-primary text-white text-lg py-6">
                    Proceed to Checkout
                  </Button>

                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <p>✓ Safe and secure checkout</p>
                    <p>✓ Easy returns within 30 days</p>
                    <p>✓ Free gift wrapping available</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {checkoutProduct && (
        <BuyNowModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          product={checkoutProduct}
        />
      )}
    </div>
  );
}
