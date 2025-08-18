import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { DraggableSection } from '@/components/DraggableSection';
import { CategoryCard } from '@/components/CategoryCard';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import { ProductCard } from '@/components/ProductCard';
import { demoProducts, categories, searchProducts, Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const [sectionOrder, setSectionOrder] = useState(categories);
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [activeRecommendationId, setActiveRecommendationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { addToCart, cartCount } = useCart();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSectionOrder(items);
    toast({
      title: "Section moved! 🎯",
      description: "Your layout has been updated."
    });
  };

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart.`
    });
  }, [addToCart, toast]);

  const handleRecommendationToggle = useCallback((productId: string, show: boolean) => {
    if (show) {
      setActiveRecommendationId(productId);
    } else {
      setActiveRecommendationId(null);
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
      toast({
        title: `Found ${results.length} products`,
        description: `Showing results for "${query}"`
      });
    } else {
      setSearchResults(null);
    }
  }, [toast]);

  const handleCategoryClick = (categoryId: string) => {
    const categoryProducts = demoProducts[categoryId] || [];
    setSearchResults(categoryProducts);
    const category = categories.find(c => c.id === categoryId);
    toast({
      title: `${category?.name} Products`,
      description: `Showing ${categoryProducts.length} products`
    });
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-hidden">
      <Header onSearch={handleSearch} cartCount={cartCount} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text h-20 text-transparent mb-4">
            Everything for Your Little One
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover trusted baby products, handpicked by parents and recommended by doctors
          </p>
        </motion.div>

        {/* Search Results or Category Grid */}
        {searchResults ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <button
                onClick={() => setSearchResults(null)}
                className="text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {searchResults.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  showRecommendations={activeRecommendationId === product.id}
                  onRecommendationToggle={handleRecommendationToggle}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {/* Categories Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CategoryCard
                      title={category.name}
                      color={category.color}
                      tagline={category.tagline}
                      onClick={() => handleCategoryClick(category.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Draggable Product Sections */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-8"
                  >
                    {sectionOrder.map((category, index) => {
                      const products = demoProducts[category.id] || [];
                      if (products.length === 0) return null;

                      return (
                        <Draggable key={category.id} draggableId={category.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`transition-all duration-200 ${
                                snapshot.isDragging ? 'rotate-2 scale-105 shadow-float' : ''
                              }`}
                            >
                              <DraggableSection
                                title={category.name}
                                products={products}
                                color={category.color}
                                tagline={category.tagline}
                                dragHandleProps={provided.dragHandleProps}
                                onAddToCart={handleAddToCart}
                                activeRecommendationId={activeRecommendationId}
                                onRecommendationToggle={handleRecommendationToggle}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default Index;