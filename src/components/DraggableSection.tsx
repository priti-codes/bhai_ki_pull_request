import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '@/data/products';

interface DraggableSectionProps {
  title: string;
  products: Product[];
  color: string;
  tagline: string;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  onAddToCart?: (product: Product) => void;
}

export function DraggableSection({ 
  title, 
  products, 
  color, 
  tagline, 
  dragHandleProps,
  onAddToCart 
}: DraggableSectionProps) {
  return (
    <motion.div
      layout
      className="bg-card rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className={`w-4 h-4 rounded-full ${color}`} />
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </motion.div>
  );
}