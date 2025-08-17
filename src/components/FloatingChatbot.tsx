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
import { Product, searchProducts, demoProducts } from '@/data/products';
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
    text: "Hi! 👶 I'm your FirstCry AI assistant! I can help you with:\n\n🛍️ **Smart Product Search:**\n• 'T-shirt for age 5 years, price Rs 500, rating 4+'\n• 'Baby food under ₹300 with 4+ rating'\n• 'Dress for 2-year-old budget ₹600'\n\n❓ **Baby Care Questions:**\n• 'How to feed my baby?'\n• 'Baby sleep tips'\n\n💡 **Filter Options:**\n• Age (0-8 years)\n• Price range (₹100-₹2000)\n• Rating (1-5 stars)\n• Product type (clothes, food, toys)\n\nWhat can I help you with today?",
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

// Extract filter criteria from user message
interface FilterCriteria {
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  minRating?: number;
  ageRange?: string;
  keywords?: string[];
}

const extractFilters = (message: string): FilterCriteria => {
  const lowerMessage = message.toLowerCase();
  const filters: FilterCriteria = {};

  // Extract price range
  const priceMatches = lowerMessage.match(/(?:price|cost|budget).*?(?:rs\.?|₹)\s*(\d+)/i);
  if (priceMatches) {
    filters.maxPrice = parseInt(priceMatches[1]);
  }

  // Extract minimum price
  const minPriceMatches = lowerMessage.match(/(?:above|over|minimum).*?(?:rs\.?|₹)\s*(\d+)/i);
  if (minPriceMatches) {
    filters.minPrice = parseInt(minPriceMatches[1]);
  }

  // Extract rating
  const ratingMatches = lowerMessage.match(/rating\s*(\d+(?:\.\d+)?)\+?/i);
  if (ratingMatches) {
    filters.minRating = parseFloat(ratingMatches[1]);
  }

  // Extract age
  const ageMatches = lowerMessage.match(/age\s*(\d+)(?:\s*(?:years?|y|months?|m))?/i);
  if (ageMatches) {
    const age = parseInt(ageMatches[1]);
    // Map age to age ranges
    if (age === 0) filters.ageRange = '0-6m';
    else if (age <= 1) filters.ageRange = '0-18m';
    else if (age <= 2) filters.ageRange = '1-3y';
    else if (age <= 5) filters.ageRange = '2-6y';
    else if (age <= 8) filters.ageRange = '5-8y';
  }

  // Extract product category/type
  if (lowerMessage.includes('t-shirt') || lowerMessage.includes('tshirt')) {
    filters.category = 'baby-casuals';
    filters.keywords = ['t-shirt', 'shirt'];
  } else if (lowerMessage.includes('dress')) {
    filters.category = 'baby-casuals';
    filters.keywords = ['dress'];
  } else if (lowerMessage.includes('food') || lowerMessage.includes('cereal') || lowerMessage.includes('formula')) {
    filters.category = 'baby-food';
  } else if (lowerMessage.includes('traditional') || lowerMessage.includes('ethnic')) {
    filters.category = 'baby-traditionals';
  }

  return filters;
};

const ageRangeMatches = (productAge: string, requestedAge: string): boolean => {
  // Convert age ranges to comparable numbers for overlap checking
  const parseAge = (age: string) => {
    if (age.includes('m')) return parseInt(age) / 12; // Convert months to years
    if (age.includes('y')) return parseInt(age);
    return 0;
  };

  const getAgeRange = (ageStr: string) => {
    const parts = ageStr.split('-');
    return {
      min: parseAge(parts[0]),
      max: parseAge(parts[1])
    };
  };

  const productRange = getAgeRange(productAge);
  const requestedRange = getAgeRange(requestedAge);

  // Check if ranges overlap
  return productRange.min <= requestedRange.max && productRange.max >= requestedRange.min;
};

const searchProductsWithFilters = (query: string, filters: FilterCriteria): Product[] => {
  let allProducts: Product[] = [];
  
  // Get all products from all categories or specific category
  if (filters.category) {
    allProducts = demoProducts[filters.category] || [];
  } else {
    allProducts = Object.values(demoProducts).flat();
  }

  let filteredProducts = allProducts;

  // Apply keyword filter
  if (filters.keywords && filters.keywords.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.keywords!.some(keyword =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } else {
    // Use existing search if no specific keywords
    const searchResults = searchProducts(query);
    if (searchResults.length > 0) {
      filteredProducts = searchResults;
    }
  }

  // Apply price filters
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice!);
  }
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice!);
  }

  // Apply rating filter
  if (filters.minRating) {
    filteredProducts = filteredProducts.filter(product => 
      (product.rating || 0) >= filters.minRating!
    );
  }

  // Apply age range filter
  if (filters.ageRange) {
    filteredProducts = filteredProducts.filter(product => 
      product.ageRange && ageRangeMatches(product.ageRange, filters.ageRange!)
    );
  }

  // Sort by rating (highest first), then by popularity
  return filteredProducts.sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return (b.rating || 0) - (a.rating || 0);
  });
};

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
    // Check if it's a product search first - enhanced detection
    const lowerMessage = userMessage.toLowerCase();
    const productKeywords = ['order', 'buy', 'find', 'show', 'get me', 'search', 'want', 'need', 'looking for'];
    const filterKeywords = ['price', 'rating', 'age', 'years', 'rs', '₹', 'budget', 'cost'];
    const productTypes = ['t-shirt', 'shirt', 'dress', 'clothes', 'food', 'formula', 'diaper', 'toy'];
    
    const hasProductKeyword = productKeywords.some(keyword => lowerMessage.includes(keyword));
    const hasFilterKeyword = filterKeywords.some(keyword => lowerMessage.includes(keyword));
    const hasProductType = productTypes.some(type => lowerMessage.includes(type));
    
    if (hasProductKeyword || hasFilterKeyword || hasProductType) {
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
        // Handle product search with filters
        const filters = extractFilters(userQuery);
        const foundProducts = searchProductsWithFilters(userQuery, filters);

        if (foundProducts.length > 0) {
          const displayedProducts = foundProducts.slice(0, 3);
          
          // Create a more detailed response based on filters
          let responseText = `Great! I found ${foundProducts.length} product${foundProducts.length > 1 ? 's' : ''} matching your criteria:`;
          
          if (filters.maxPrice) responseText += `\n💰 Under ₹${filters.maxPrice}`;
          if (filters.minRating) responseText += `\n⭐ Rating ${filters.minRating}+ stars`;
          if (filters.ageRange) responseText += `\n👶 Age: ${filters.ageRange}`;
          
          responseText += `\n\nHere are the top-rated ones:`;
          
          const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            isBot: true,
            timestamp: new Date(),
            products: displayedProducts,
            allProducts: foundProducts,
            displayedCount: 3,
            showViewMore: foundProducts.length > 3
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          let noResultsText = "Sorry, I couldn't find products matching your criteria. ";
          
          if (filters.maxPrice || filters.minRating || filters.ageRange) {
            noResultsText += "Try adjusting your filters:\n";
            if (filters.maxPrice) noResultsText += `• Increase budget from ₹${filters.maxPrice}\n`;
            if (filters.minRating) noResultsText += `• Lower rating requirement from ${filters.minRating}+\n`;
            if (filters.ageRange) noResultsText += `• Try different age range\n`;
          } else {
            noResultsText += "Try different keywords like 'diaper', 'food', 'clothes', or 'toys'. 😊";
          }
          
          const botResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: noResultsText,
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
                                    {product.isPopular && (
                                      <Badge className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 py-0.5">
                                        ⭐
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
                                      {product.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex items-center">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-gray-600 ml-1">
                                          {product.rating || 4.0}
                                        </span>
                                      </div>
                                      {product.ageRange && (
                                        <Badge variant="outline" className="text-xs py-0 px-1 border-purple-200 text-purple-600">
                                          👶 {product.ageRange}
                                        </Badge>
                                      )}
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

