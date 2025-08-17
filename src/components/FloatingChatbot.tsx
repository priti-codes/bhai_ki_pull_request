import { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Star, ShoppingCart, CreditCard, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BuyNowModal } from './BuyNowModal';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product, searchProducts } from '@/data/products';
import Groq from 'groq-sdk';

interface ChatMessage {
  id: string;
  text?: string;
  isBot: boolean;
  timestamp: Date;
  products?: Product[];
  showViewMore?: boolean;
  allProducts?: Product[];
  displayedCount?: number;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    text: "Hi! 👶 I'm your FirstCry AI assistant! I can help you with:\n\n🛍️ Finding Products: Order me Horlicks Growth+\n❓ Answering Questions: How to feed my baby?\n💡 Giving Tips: Baby sleep tips\n\nWhat can I help you with today?",
    isBot: true,
    timestamp: new Date()
  }
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

const extractKeywords = (text: string): string[] => {
  // Remove common words and extract meaningful keywords
  const commonWords = ['order', 'me', 'show', 'find', 'get', 'buy', 'want', 'need', 'looking', 'for', 'the', 'a', 'an'];
  
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && 
      !commonWords.includes(word) && 
      /^[a-z]+/.test(word)
    );
};

  const searchForProducts = (query: string): Product[] => {
    const keywords = extractKeywords(query);
    let foundProducts: Product[] = [];

    // Search by the full query first
    foundProducts = searchProducts(query);

    // If no results, try individual keywords
    if (foundProducts.length === 0 && keywords.length > 0) {
      for (const keyword of keywords) {
        const keywordResults = searchProducts(keyword);
        foundProducts = [...foundProducts, ...keywordResults];
      }
      // Remove duplicates
      foundProducts = foundProducts.filter((product, index, self) => 
        index === self.findIndex(p => p.id === product.id)
      );
    }

    // Sort by rating (highest first)
    return foundProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  };

  const getGroqResponse = async (userMessage: string): Promise<string> => {
    // Check if it's a product search first
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('find') || 
        lowerMessage.includes('show') || lowerMessage.includes('get me') || lowerMessage.includes('search')) {
      return "PRODUCT_SEARCH_NEEDED";
    }

    // Always try to use Groq API for all questions
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      console.log('API Key exists:', !!apiKey);
      console.log('API Key starts with gsk_:', apiKey?.startsWith('gsk_'));
      
      if (!apiKey || apiKey === 'your_groq_api_key_here' || apiKey === 'gsk_your_api_key_here') {
        return "I need a valid Groq API key to answer your questions! 🔑\n\nPlease:\n1. Get a free API key from console.groq.com\n2. Add it to your .env.local file\n3. Restart the development server\n\nThen I can provide intelligent AI responses!";
      }
      
      // Initialize Groq client
      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });

      console.log('Making Groq API call...');
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a helpful baby care assistant, made for FirstCry. You specialize in:
            - Baby feeding, nutrition, and formula advice
            - Sleep schedules and sleep training
            - Baby development milestones
            - Baby safety and childproofing
            - Diaper care and potty training
            - Baby health and wellness
            - Baby toys and activities
            - Baby clothing and essentials
            
            Always provide helpful, accurate, and safe advice for parents. Use emojis to make responses friendly and engaging. Keep responses concise but informative. If asked about products, you can mention that you can help find products on FirstCry. Use bullet points, but avoid using Formating elements. Implement psychological marketing strategies to increase potential sales of the company`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 500
      });

      console.log('Groq API response received:', completion.choices[0]?.message?.content);
      return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Could you please try again?";
    } catch (error) {
      console.error('Groq API Error:', error);
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "❌ Invalid API key! Please check your Groq API key in .env.local file.\n\nMake sure it starts with 'gsk_' and is valid.";
        }
        if (error.message.includes('quota') || error.message.includes('limit')) {
          return "⚠️ Rate limit exceeded! Please try again in a moment.";
        }
        if (error.message.includes('network') || error.message.includes('fetch')) {
          return "🌐 Network error! Please check your internet connection and try again.";
        }
      }
      
      return "I'm sorry, I'm having trouble processing your request right now. Please try again! 😊";
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleOrderNow = (product: Product) => {
    setSelectedProduct(product);
    setShowBuyNowModal(true);
  };

  const handleViewMore = (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.allProducts) {
        const currentCount = msg.displayedCount || 3;
        const newCount = Math.min(currentCount + 3, msg.allProducts.length);
        return {
          ...msg,
          products: msg.allProducts.slice(0, newCount),
          displayedCount: newCount,
          showViewMore: newCount < msg.allProducts.length
        };
      }
      return msg;
    }));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response first
      const aiResponse = await getGroqResponse(userQuery);

      if (aiResponse === "PRODUCT_SEARCH_NEEDED") {
        // Handle product search
        const foundProducts = searchForProducts(userQuery);

        if (foundProducts.length > 0) {
          const displayedProducts = foundProducts.slice(0, 3);
          const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: `Great! I found ${foundProducts.length} product${foundProducts.length > 1 ? 's' : ''} for you. Here are the top-rated ones:`,
            isBot: true,
            timestamp: new Date(),
            products: displayedProducts,
            allProducts: foundProducts,
            displayedCount: 3,
            showViewMore: foundProducts.length > 3
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I couldn't find that product. Try again with different keywords like 'diaper', 'food', 'clothes', or 'toys'. 😊",
            isBot: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botResponse]);
        }
      } else {
        // Handle general questions with AI response
        const botResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again! 😊",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }

    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        animate={{ 
          y: [0, -8, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 shadow-2xl border-4 border-white"
          size="icon"
        >
          <div className="text-2xl">👶</div>
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              opacity: { duration: 0.2 }
            }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[500px] sm:h-[600px]"
          >
            <Card className="w-full h-full shadow-2xl border-2 border-purple-200 bg-gradient-to-b from-white to-purple-50">
              <CardHeader className="pb-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="text-xl">👶</div>
                    FirstCry AI Assistant
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col h-full p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className="flex flex-col max-w-[85%]">
                        {message.text && (
                          <div
                            className={`p-3 rounded-2xl text-sm whitespace-pre-line ${
                              message.isBot
                                ? 'bg-gray-100 text-gray-800 rounded-bl-md'
                                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-md'
                            }`}
                          >
                            {message.text}
                          </div>
                        )}
                        
                        {/* Product Cards */}
                        {message.products && message.products.length > 0 && (
                          <div className="mt-2 space-y-3">
                            {message.products.map((product) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border-2 border-purple-100 rounded-xl p-3 shadow-md"
                              >
                                <div className="flex gap-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
                                      {product.name}
                                    </h4>
                                    <div className="flex items-center gap-1 mt-1">
                                      <div className="flex items-center">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-gray-600 ml-1">
                                          {product.rating || 4.0}
                                        </span>
                                      </div>
                                      {product.badge && (
                                        <Badge variant="secondary" className="text-xs py-0 px-1">
                                          {product.badge}
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="font-bold text-green-600">
                                        ₹{product.price}
                                      </span>
                                      {product.originalPrice && (
                                        <span className="text-xs text-gray-500 line-through">
                                          ₹{product.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex gap-2 mt-2 flex-col">
                                      <Button
                                        size="sm"
                                        onClick={() => handleAddToCart(product)}
                                        className="flex-1 h-7 pt-1 pb-1 text-xs bg-green-500 hover:bg-green-600"
                                      >
                                        <ShoppingCart className="w-3 h-3 mr-1" />
                                        Add to Cart
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => handleOrderNow(product)}
                                        className="flex-1 h-7 pt-1 pb-1 text-xs bg-orange-500 hover:bg-orange-600"
                                      >
                                        <CreditCard className="w-3 h-3 mr-1" />
                                        Order Now
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                            {/* View More Button */}
                            {message.showViewMore && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-center"
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewMore(message.id)}
                                  className="bg-white border-purple-200 text-purple-600 hover:bg-purple-50"
                                >
                                  <MoreHorizontal className="w-4 h-4 mr-1" />
                                  View More Products ({(message.allProducts?.length || 0) - (message.displayedCount || 0)} more)
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-purple-100 bg-white rounded-b-lg">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      disabled={isTyping}
                      className="flex-1 border-purple-200 focus:border-purple-400"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isTyping || !inputValue.trim()}
                      size="icon"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy Now Modal */}
      {selectedProduct && (
        <BuyNowModal
          product={selectedProduct}
          isOpen={showBuyNowModal}
          onClose={() => {
            setShowBuyNowModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}

