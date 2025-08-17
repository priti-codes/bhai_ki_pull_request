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
  emoji?: string;
  ageRange?: string; // e.g., "0-6m", "6-12m", "1-2y", "2-5y", "5-8y"
  isPopular?: boolean;
}

export const categories = [
  { id: 'baby-food', name: 'Baby Food', color: 'bg-mint-green', tagline: 'Trusted by 1M+ parents' },
  { id: 'baby-casuals', name: 'Baby Casuals', color: 'bg-baby-blue', tagline: 'Comfort meets style' },
  { id: 'baby-traditionals', name: 'Baby Traditionals', color: 'bg-baby-pink', tagline: 'Cultural heritage' },
  { id: 'diapers-essentials', name: 'Diapers & Essentials', color: 'bg-soft-purple', tagline: 'Subscribe & Save' },
  { id: 'top-offers', name: 'Top Offers', color: 'bg-soft-yellow', tagline: 'Save up to 50%' },
  { id: 'parents-favourites', name: "Parents' Favourites", color: 'bg-gradient-playful', tagline: 'Most loved items' },
  { id: 'essentials', name: 'Essentials', color: 'bg-gradient-soft', tagline: 'Daily care must-haves' },
  { id: 'doctor-recommended', name: 'Doctor Recommended', color: 'bg-primary/10', tagline: 'Pediatrician approved' },
  { id: 'first-year', name: 'Best for First-Year', color: 'bg-accent', tagline: 'Perfect for newborns' }
];

export const demoProducts: Record<string, Product[]> = {
  'baby-food': [
    { id: 'bf1', name: 'Nestlé Cerelac Wheat Apple', price: 299, originalPrice: 349, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300', category: 'baby-food', badge: 'Best Seller', rating: 4.5, reviews: 1240, emoji: '🍎', ageRange: '6-12m', isPopular: true },
    { id: 'bf2', name: 'Gerber Puffs Banana', price: 199, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300', category: 'baby-food', badge: 'Organic', rating: 4.3, reviews: 890, emoji: '🍌', ageRange: '8-18m' },
    { id: 'bf3', name: 'Horlicks Growth+ Vanilla', price: 459, originalPrice: 520, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300', category: 'baby-food', badge: 'Doctor Recommended', rating: 4.6, reviews: 2100, emoji: '🥛', ageRange: '2-5y', isPopular: true },
    { id: 'bf4', name: 'Similac Gold Formula', price: 1299, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300', category: 'baby-food', badge: 'Premium', rating: 4.4, reviews: 567, emoji: '🍼', ageRange: '0-6m' },
    { id: 'bf5', name: 'Heinz Baby Rice Cereal', price: 245, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=300', category: 'baby-food', rating: 4.2, reviews: 432, emoji: '🍚', ageRange: '4-12m' },
    { id: 'bf6', name: 'Aptamil Pronutra Stage 1', price: 890, originalPrice: 950, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300', category: 'baby-food', badge: 'Trending', rating: 4.5, reviews: 789, emoji: '🍼', ageRange: '0-6m' },
    { id: 'bf7', name: 'Farex Baby Food Mix Fruit', price: 320, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300', category: 'baby-food', rating: 4.1, reviews: 623, emoji: '🍓', ageRange: '6-18m' },
    { id: 'bf8', name: 'Nestum 3 Fruits Cereal', price: 275, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300', category: 'baby-food', badge: 'New', rating: 4.3, reviews: 345, emoji: '🥣', ageRange: '8-24m' },
    { id: 'bf9', name: 'Lactogen 1 Infant Formula', price: 679, originalPrice: 720, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300', category: 'baby-food', badge: 'Best Seller', rating: 4.4, reviews: 1120, emoji: '🍼', ageRange: '0-6m', isPopular: true },
    { id: 'bf10', name: 'Pediasure Vanilla Delight', price: 1050, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=300', category: 'baby-food', badge: 'Doctor Recommended', rating: 4.7, reviews: 890, emoji: '🥛', ageRange: '2-8y', isPopular: true }
  ],
  'baby-casuals': [
    { id: 'bc1', name: 'Cotton Romper - Blue Stars', price: 499, originalPrice: 699, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'baby-casuals', badge: 'Best Seller', rating: 4.6, reviews: 834, emoji: '👕', ageRange: '0-12m', isPopular: true },
    { id: 'bc2', name: 'Cartoon T-shirt Mickey', price: 299, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', category: 'baby-casuals', badge: 'Trending', rating: 4.4, reviews: 567, emoji: '👕', ageRange: '2-5y' },
    { id: 'bc3', name: 'Denim Dungaree Set', price: 899, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300', category: 'baby-casuals', badge: 'New Arrival', rating: 4.5, reviews: 423, emoji: '👖', ageRange: '1-3y' },
    { id: 'bc4', name: 'Striped Polo Shirt', price: 399, image: 'https://images.unsplash.com/photo-1520096515318-9df1b6ea5f45?w=300', category: 'baby-casuals', rating: 4.2, reviews: 234, emoji: '👕', ageRange: '3-6y' },
    { id: 'bc5', name: 'Cute Animal Onesie', price: 549, originalPrice: 649, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'baby-casuals', badge: 'Organic Cotton', rating: 4.7, reviews: 789, emoji: '👶', ageRange: '0-18m', isPopular: true },
    { id: 'bc6', name: 'Rainbow Dress', price: 699, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', category: 'baby-casuals', badge: 'Party Wear', rating: 4.3, reviews: 456, emoji: '👗', ageRange: '2-6y' },
    { id: 'bc7', name: 'Superhero Cape Set', price: 799, image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=300', category: 'baby-casuals', badge: 'Trending', rating: 4.6, reviews: 623, emoji: '🦸', ageRange: '3-8y' },
    { id: 'bc8', name: 'Floral Summer Shorts', price: 349, originalPrice: 449, image: 'https://images.unsplash.com/photo-1520096515318-9df1b6ea5f45?w=300', category: 'baby-casuals', rating: 4.1, reviews: 345, emoji: '🩳', ageRange: '2-5y' },
    { id: 'bc9', name: 'Space Print Pajama Set', price: 599, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'baby-casuals', badge: 'Night Wear', rating: 4.4, reviews: 567, emoji: '🌙', ageRange: '1-4y' },
    { id: 'bc10', name: 'Bunny Ear Hoodie', price: 799, originalPrice: 899, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300', category: 'baby-casuals', badge: 'Winter Special', rating: 4.5, reviews: 678, emoji: '🐰', ageRange: '1-5y' }
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
  'diapers-essentials': [
    { id: 'de1', name: 'Premium Diapers - Newborn', price: 899, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Soft & Dry', rating: 4.8, reviews: 2341, emoji: '👶', ageRange: '0-6 months', isPopular: true },
    { id: 'de2', name: 'Ultra Absorbent Diapers - S', price: 999, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: '12 Hour Dry', rating: 4.7, reviews: 1987, emoji: '👶', ageRange: '3-8 months', isPopular: true },
    { id: 'de3', name: 'Premium Diapers - Medium', price: 1099, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Extra Comfort', rating: 4.9, reviews: 3421, emoji: '👶', ageRange: '6-12 months', isPopular: true },
    { id: 'de4', name: 'Premium Diapers - Large', price: 1199, originalPrice: 1399, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Active Baby', rating: 4.8, reviews: 2876, emoji: '👶', ageRange: '10-16 months', isPopular: true },
    { id: 'de5', name: 'Organic Cotton Diapers', price: 1399, originalPrice: 1699, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Natural & Safe', rating: 4.9, reviews: 1543, emoji: '🌿', ageRange: '0-2 years', isPopular: false },
    { id: 'de6', name: 'Night Time Diapers - XL', price: 1299, originalPrice: 1499, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'All Night Protection', rating: 4.7, reviews: 987, emoji: '🌙', ageRange: '1-3 years', isPopular: true },
    { id: 'de7', name: 'Swim Diapers Pack', price: 699, originalPrice: 899, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Water Ready', rating: 4.5, reviews: 432, emoji: '🏊', ageRange: '6 months-3 years', isPopular: false },
    { id: 'de8', name: 'Diaper Bulk Pack - 120 Count', price: 2799, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Best Value', rating: 4.8, reviews: 4567, emoji: '📦', ageRange: '0-2 years', isPopular: true },
    { id: 'de9', name: 'Sensitive Skin Diapers', price: 1199, originalPrice: 1399, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Hypoallergenic', rating: 4.9, reviews: 2134, emoji: '💝', ageRange: '0-18 months', isPopular: true },
    { id: 'de10', name: 'Eco-Friendly Diapers', price: 1599, originalPrice: 1899, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'diapers-essentials', badge: 'Biodegradable', rating: 4.6, reviews: 876, emoji: '♻️', ageRange: '0-3 years', isPopular: false }
  ],
  'top-offers': [
    { id: 'to1', name: 'Baby Care Combo Pack', price: 1999, originalPrice: 3999, image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300', category: 'top-offers', badge: '50% OFF', rating: 4.5, reviews: 1234 },
    { id: 'to2', name: 'Clothing Bundle - 5 Piece', price: 1499, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300', category: 'top-offers', badge: 'Bundle Deal', rating: 4.4, reviews: 567 },
    { id: 'to3', name: 'Toy Set Mega Pack', price: 2999, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', category: 'top-offers', badge: '40% OFF', rating: 4.6, reviews: 890 },
    { id: 'to4', name: 'Feeding Essentials Kit', price: 1799, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1544642899-f2b5ca8a7b1a?w=300', category: 'top-offers', badge: 'Save ₹1200', rating: 4.5, reviews: 432 },
    { id: 'to5', name: 'Bath Time Bundle', price: 999, originalPrice: 1799, image: 'https://images.unsplash.com/photo-1556909114-4f78d435d878?w=300', category: 'top-offers', badge: '45% OFF', rating: 4.3, reviews: 789 },
    { id: 'to6', name: 'Diaper Value Pack', price: 2499, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1628462747178-d2d7ca4a9b4c?w=300', category: 'top-offers', badge: 'Bulk Save', rating: 4.7, reviews: 1567, emoji: '👶', ageRange: '0-2 years', isPopular: true },
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

export const getRecommendations = (product: Product, limit: number = 4): Product[] => {
  const allProducts = getAllProducts();
  
  // Filter out the current product
  const otherProducts = allProducts.filter(p => p.id !== product.id);
  
  // Score products based on relevance
  const scoredProducts = otherProducts.map(p => {
    let score = 0;
    
    // Same category gets highest score
    if (p.category === product.category) score += 10;
    
    // Same age range gets high score
    if (p.ageRange === product.ageRange) score += 8;
    
    // Popular products get bonus
    if (p.isPopular) score += 3;
    
    // High rating gets bonus
    if (p.rating && p.rating >= 4.5) score += 2;
    
    // Similar price range (within 50% difference)
    if (p.price && product.price) {
      const priceDiff = Math.abs(p.price - product.price) / product.price;
      if (priceDiff <= 0.5) score += 5;
      else if (priceDiff <= 1.0) score += 2;
    }
    
    // Complementary products based on keywords
    const productKeywords = product.name.toLowerCase().split(' ');
    const candidateKeywords = p.name.toLowerCase().split(' ');
    
    // Baby food recommendations
    if (productKeywords.some(k => ['food', 'cerelac', 'formula'].includes(k))) {
      if (candidateKeywords.some(k => ['bottle', 'bib', 'bowl', 'spoon', 'feeding'].includes(k))) {
        score += 6;
      }
    }
    
    // Diaper recommendations
    if (productKeywords.some(k => ['diaper', 'nappy'].includes(k))) {
      if (candidateKeywords.some(k => ['wipes', 'cream', 'powder', 'lotion', 'rash'].includes(k))) {
        score += 6;
      }
    }
    
    // Clothing recommendations
    if (productKeywords.some(k => ['dress', 'shirt', 'onesie', 'romper', 'clothing'].includes(k))) {
      if (candidateKeywords.some(k => ['socks', 'hat', 'bib', 'shoes', 'mittens'].includes(k))) {
        score += 6;
      }
    }
    
    // Toy recommendations
    if (productKeywords.some(k => ['toy', 'bear', 'blocks', 'rattle'].includes(k))) {
      if (candidateKeywords.some(k => ['toy', 'play', 'educational', 'activity', 'book'].includes(k))) {
        score += 4;
      }
    }
    
    return { product: p, score };
  });
  
  // Sort by score and return top recommendations
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
};