import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  title: string;
  color: string;
  tagline: string;
  onClick: () => void;
}

export function CategoryCard({ title, color, tagline, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`${color} border-0 shadow-card hover:shadow-soft cursor-pointer transition-all duration-300 overflow-hidden`}
        onClick={onClick}
      >
        <CardContent className="p-6 h-32 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
          
          <div className="flex justify-end">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full"
            >
              <ArrowRight className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}