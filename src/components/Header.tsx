import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceSearchBar } from './VoiceSearchBar';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartCount?: number;
}

export function Header({ onSearch, cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              <img src="/logo.png" alt="FirstCry Logo" className='w-32 h-10' />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Categories
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Offers
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              New Arrivals
            </Button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <VoiceSearchBar onSearch={onSearch} />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border pt-4"
          >
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start">
                Categories
              </Button>
              <Button variant="ghost" className="justify-start">
                Offers
              </Button>
              <Button variant="ghost" className="justify-start">
                New Arrivals
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}