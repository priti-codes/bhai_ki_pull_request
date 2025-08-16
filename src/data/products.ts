export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

export const categories = [
  { id: 'baby-food', name: 'Baby Food', color: 'bg-mint-green', tagline: 'Trusted by 1M+ parents' },
  { id: 'baby-casuals', name: 'Baby Casuals', color: 'bg-baby-blue', tagline: 'Comfort meets style' },
  { id: 'baby-traditionals', name: 'Baby Traditionals', color: 'bg-baby-pink', tagline: 'Cultural heritage' },
  { id: 'top-offers', name: 'Top Offers', color: 'bg-soft-yellow', tagline: 'Save up to 50%' },
  { id: 'parents-favourites', name: "Parents' Favourites", color: 'bg-gradient-playful', tagline: 'Most loved items' },
  { id: 'essentials', name: 'Essentials', color: 'bg-gradient-soft', tagline: 'Daily care must-haves' },
  { id: 'doctor-recommended', name: 'Doctor Recommended', color: 'bg-primary/10', tagline: 'Pediatrician approved' },
  { id: 'first-year', name: 'Best for First-Year', color: 'bg-accent', tagline: 'Perfect for newborns' }
];

export const demoProducts: Record<string, Product[]> = {
  'baby-food': [
    { id: 'bf1', name: 'Nestlé Cerelac Wheat Apple', price: 299, originalPrice: 349, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300', category: 'baby-food', badge: 'Best Seller', rating: 4.5, reviews: 1240 },
    { id: 'bf2', name: 'Gerber Puffs Banana', price: 199, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300', category: 'baby-food', badge: 'Organic', rating: 4.3, reviews: 890 },
    { id: 'bf3', name: 'Horlicks Growth+ Vanilla', price: 459, originalPrice: 520, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300', category: 'baby-food', badge: 'Doctor Recommended', rating: 4.6, reviews: 2100 },
    { id: 'bf4', name: 'Similac Gold Formula', price: 1299, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300', category: 'baby-food', badge: 'Premium', rating: 4.4, reviews: 567 },
    { id: 'bf5', name: 'Heinz Baby Rice Cereal', price: 245, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=300', category: 'baby-food', rating: 4.2, reviews: 432 },
    { id: 'bf6', name: 'Aptamil Pronutra Stage 1', price: 890, originalPrice: 950, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300', category: 'baby-food', badge: 'Trending', rating: 4.5, reviews: 789 },
    { id: 'bf7', name: 'Farex Baby Food Mix Fruit', price: 320, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300', category: 'baby-food', rating: 4.1, reviews: 623 },
    { id: 'bf8', name: 'Nestum 3 Fruits Cereal', price: 275, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300', category: 'baby-food', badge: 'New', rating: 4.3, reviews: 345 },
    { id: 'bf9', name: 'Lactogen 1 Infant Formula', price: 679, originalPrice: 720, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300', category: 'baby-food', badge: 'Best Seller', rating: 4.4, reviews: 1120 },
    { id: 'bf10', name: 'Pediasure Vanilla Delight', price: 1050, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=300', category: 'baby-food', badge: 'Doctor Recommended', rating: 4.7, reviews: 890 }
  ],
  'baby-casuals': [
    { id: 'bc1', name: 'Cotton Romper - Blue Stars', price: 499, originalPrice: 699, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'baby-casuals', badge: 'Best Seller', rating: 4.6, reviews: 834 },
    { id: 'bc2', name: 'Cartoon T-shirt Mickey', price: 299, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', category: 'baby-casuals', badge: 'Trending', rating: 4.4, reviews: 567 },
    { id: 'bc3', name: 'Denim Dungaree Set', price: 899, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300', category: 'baby-casuals', badge: 'New Arrival', rating: 4.5, reviews: 423 },
    { id: 'bc4', name: 'Striped Polo Shirt', price: 399, image: 'https://images.unsplash.com/photo-1520096515318-9df1b6ea5f45?w=300', category: 'baby-casuals', rating: 4.2, reviews: 234 },
    { id: 'bc5', name: 'Cute Animal Onesie', price: 549, originalPrice: 649, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'baby-casuals', badge: 'Organic Cotton', rating: 4.7, reviews: 789 },
    { id: 'bc6', name: 'Rainbow Dress', price: 699, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', category: 'baby-casuals', badge: 'Party Wear', rating: 4.3, reviews: 456 },
    { id: 'bc7', name: 'Superhero Cape Set', price: 799, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300', category: 'baby-casuals', badge: 'Trending', rating: 4.6, reviews: 623 },
    { id: 'bc8', name: 'Floral Summer Shorts', price: 349, originalPrice: 449, image: 'https://images.unsplash.com/photo-1520096515318-9df1b6ea5f45?w=300', category: 'baby-casuals', rating: 4.1, reviews: 345 },
    { id: 'bc9', name: 'Space Print Pajama Set', price: 599, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'baby-casuals', badge: 'Night Wear', rating: 4.4, reviews: 567 },
    { id: 'bc10', name: 'Bunny Ear Hoodie', price: 799, originalPrice: 899, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', category: 'baby-casuals', badge: 'Winter Special', rating: 4.5, reviews: 678 }
  ],
  'baby-traditionals': [
    { id: 'bt1', name: 'Kurta Pajama Set - Golden', price: 899, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1594736797933-d0cc4bf10115?w=300', category: 'baby-traditionals', badge: 'Festival Special', rating: 4.5, reviews: 432 },
    { id: 'bt2', name: 'Lehenga for Toddlers', price: 1299, image: 'https://images.unsplash.com/photo-1600659206393-1abb6e7eb8ad?w=300', category: 'baby-traditionals', badge: 'Designer', rating: 4.7, reviews: 234 },
    { id: 'bt3', name: 'Dhoti Kurta Set - White', price: 799, originalPrice: 999, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', category: 'baby-traditionals', badge: 'Pure Cotton', rating: 4.4, reviews: 567 },
    { id: 'bt4', name: 'Silk Anarkali Dress', price: 1599, image: 'https://images.unsplash.com/photo-1594736797933-d0cc4bf10115?w=300', category: 'baby-traditionals', badge: 'Premium', rating: 4.6, reviews: 345 },
    { id: 'bt5', name: 'Traditional Sherwani', price: 1899, originalPrice: 2299, image: 'https://images.unsplash.com/photo-1600659206393-1abb6e7eb8ad?w=300', category: 'baby-traditionals', badge: 'Wedding Special', rating: 4.8, reviews: 123 },
    { id: 'bt6', name: 'Ethnic Palazzo Set', price: 999, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', category: 'baby-traditionals', badge: 'Comfortable', rating: 4.3, reviews: 456 },
    { id: 'bt7', name: 'Banarasi Lehenga', price: 2499, image: 'https://images.unsplash.com/photo-1594736797933-d0cc4bf10115?w=300', category: 'baby-traditionals', badge: 'Handwoven', rating: 4.9, reviews: 89 },
    { id: 'bt8', name: 'Nehru Jacket Set', price: 1099, originalPrice: 1399, image: 'https://images.unsplash.com/photo-1600659206393-1abb6e7eb8ad?w=300', category: 'baby-traditionals', badge: 'Classic', rating: 4.4, reviews: 267 },
    { id: 'bt9', name: 'Sharara Suit', price: 1699, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', category: 'baby-traditionals', badge: 'Trending', rating: 4.5, reviews: 345 },
    { id: 'bt10', name: 'Pathani Suit', price: 849, originalPrice: 1049, image: 'https://images.unsplash.com/photo-1594736797933-d0cc4bf10115?w=300', category: 'baby-traditionals', badge: 'Eid Special', rating: 4.3, reviews: 234 }
  ],
  'essentials': [
    { id: 'es1', name: 'Pampers Baby Dry Diapers', price: 999, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1544642899-f2b5ca8a7b1a?w=300', category: 'essentials', badge: 'Best Seller', rating: 4.6, reviews: 2340 },
    { id: 'es2', name: 'Johnson Baby Shampoo', price: 245, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'essentials', badge: 'Gentle Formula', rating: 4.5, reviews: 1567 },
    { id: 'es3', name: 'Baby Wet Wipes Pack', price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'essentials', badge: 'Alcohol Free', rating: 4.4, reviews: 890 },
    { id: 'es4', name: 'Himalaya Baby Lotion', price: 179, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'essentials', badge: 'Natural', rating: 4.3, reviews: 1234 },
    { id: 'es5', name: 'Feeding Bottle Set', price: 899, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1544642899-f2b5ca8a7b1a?w=300', category: 'essentials', badge: 'BPA Free', rating: 4.5, reviews: 567 },
    { id: 'es6', name: 'Baby Powder', price: 129, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'essentials', badge: 'Talc Free', rating: 4.2, reviews: 789 },
    { id: 'es7', name: 'Diaper Rash Cream', price: 299, originalPrice: 349, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'essentials', badge: 'Doctor Recommended', rating: 4.6, reviews: 432 },
    { id: 'es8', name: 'Baby Oil', price: 199, image: 'https://images.unsplash.com/photo-1544642899-f2b5ca8a7b1a?w=300', category: 'essentials', badge: 'Mineral Oil', rating: 4.4, reviews: 654 },
    { id: 'es9', name: 'Pacifier Set', price: 349, originalPrice: 449, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'essentials', badge: 'Orthodontic', rating: 4.3, reviews: 345 },
    { id: 'es10', name: 'Baby Nail Clipper', price: 149, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'essentials', badge: 'Safety First', rating: 4.5, reviews: 234 }
  ],
  'parents-favourites': [
    { id: 'pf1', name: 'Fisher-Price Rock-a-Stack', price: 799, originalPrice: 999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'parents-favourites', badge: 'Educational', rating: 4.7, reviews: 1456 },
    { id: 'pf2', name: 'VTech Baby Walker', price: 2999, image: 'https://images.unsplash.com/photo-1601570200449-77b5ba0b5e04?w=300', category: 'parents-favourites', badge: 'Most Loved', rating: 4.8, reviews: 567 },
    { id: 'pf3', name: 'Soft Plush Teddy Bear', price: 599, originalPrice: 799, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300', category: 'parents-favourites', badge: 'Huggable', rating: 4.6, reviews: 2340 },
    { id: 'pf4', name: 'Musical Mobile', price: 1299, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'parents-favourites', badge: 'Soothing', rating: 4.5, reviews: 789 },
    { id: 'pf5', name: 'Baby Swing Chair', price: 3999, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1601570200449-77b5ba0b5e04?w=300', category: 'parents-favourites', badge: 'Comfort Plus', rating: 4.7, reviews: 234 },
    { id: 'pf6', name: 'Activity Play Mat', price: 1599, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300', category: 'parents-favourites', badge: 'Development', rating: 4.4, reviews: 1123 },
    { id: 'pf7', name: 'Rocking Horse', price: 2499, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'parents-favourites', badge: 'Classic', rating: 4.6, reviews: 456 },
    { id: 'pf8', name: 'Building Blocks Set', price: 899, image: 'https://images.unsplash.com/photo-1601570200449-77b5ba0b5e04?w=300', category: 'parents-favourites', badge: 'Creative', rating: 4.5, reviews: 789 },
    { id: 'pf9', name: 'Baby Monitor', price: 4999, originalPrice: 5999, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300', category: 'parents-favourites', badge: 'Peace of Mind', rating: 4.8, reviews: 345 },
    { id: 'pf10', name: 'Stroller Premium', price: 8999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'parents-favourites', badge: 'Travel Ready', rating: 4.9, reviews: 123 }
  ],
  'top-offers': [
    { id: 'to1', name: 'Baby Care Combo Pack', price: 1999, originalPrice: 3999, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', category: 'top-offers', badge: '50% OFF', rating: 4.5, reviews: 1234 },
    { id: 'to2', name: 'Clothing Bundle - 5 Piece', price: 1499, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'top-offers', badge: 'Bundle Deal', rating: 4.4, reviews: 567 },
    { id: 'to3', name: 'Toy Set Mega Pack', price: 2999, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'top-offers', badge: '40% OFF', rating: 4.6, reviews: 890 },
    { id: 'to4', name: 'Feeding Essentials Kit', price: 1799, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1544642899-f2b5ca8a7b1a?w=300', category: 'top-offers', badge: 'Save ₹1200', rating: 4.5, reviews: 432 },
    { id: 'to5', name: 'Bath Time Bundle', price: 999, originalPrice: 1799, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'top-offers', badge: '45% OFF', rating: 4.3, reviews: 789 },
    { id: 'to6', name: 'Diaper Value Pack', price: 2499, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'top-offers', badge: 'Bulk Save', rating: 4.7, reviews: 1567 },
    { id: 'to7', name: 'Newborn Starter Kit', price: 3999, originalPrice: 5999, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', category: 'top-offers', badge: 'New Parent', rating: 4.8, reviews: 234 },
    { id: 'to8', name: 'Educational Toy Bundle', price: 1999, originalPrice: 3299, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'top-offers', badge: 'Learning Fun', rating: 4.5, reviews: 678 },
    { id: 'to9', name: 'Skincare Complete Set', price: 1299, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'top-offers', badge: '41% OFF', rating: 4.4, reviews: 345 },
    { id: 'to10', name: 'Travel Gear Bundle', price: 4999, originalPrice: 7999, image: 'https://images.unsplash.com/photo-1601570200449-77b5ba0b5e04?w=300', category: 'top-offers', badge: 'Travel Ready', rating: 4.6, reviews: 456 }
  ]
};

export const getAllProducts = (): Product[] => {
  return Object.values(demoProducts).flat();
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return demoProducts[categoryId] || [];
};

export const searchProducts = (query: string): Product[] => {
  const allProducts = getAllProducts();
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.badge?.toLowerCase().includes(lowerQuery)
  );
};