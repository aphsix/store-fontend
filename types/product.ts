export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // ราคาเดิม (ก่อนลด)
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stock: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}
