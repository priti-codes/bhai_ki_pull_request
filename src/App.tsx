import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import { CartPage } from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import { Product } from "./data/products";

const queryClient = new QueryClient();

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<Index cartItems={cartItems} onUpdateCart={setCartItems} />} 
            />
            <Route 
              path="/cart" 
              element={<CartPage cartItems={cartItems} onUpdateCart={setCartItems} />} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
