'use client';

import { useState } from 'react';
import { mockProducts, categories } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [sortBy, setSortBy] = useState('newest');

  // Filter products by category
  const filteredProducts = selectedCategory === 'ทั้งหมด'
    ? mockProducts
    : mockProducts.filter(p => p.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'popular':
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">สินค้าทั้งหมด</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="newest">ใหม่ล่าสุด</option>
          <option value="popular">ยอดนิยม</option>
          <option value="price-asc">ราคา: ต่ำ → สูง</option>
          <option value="price-desc">ราคา: สูง → ต่ำ</option>
        </select>
      </div>

      {/* Products Count */}
      <p className="text-gray-600 mb-4">
        พบสินค้า {sortedProducts.length} รายการ
      </p>

      {/* Products Grid */}
      <ProductGrid products={sortedProducts} />
    </div>
  );
}
