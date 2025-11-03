'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockProducts } from '@/lib/data/products';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = mockProducts.find(p => p.id === params.id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">ไม่พบสินค้า</h1>
        <Button onClick={() => router.push('/products')}>
          กลับไปหน้าสินค้า
        </Button>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('กรุณาเลือกไซส์');
      return;
    }
    if (!selectedColor) {
      alert('กรุณาเลือกสี');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    alert('เพิ่มสินค้าลงตะกร้าเรียบร้อย');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                -{discountPercent}%
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-black' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} รีวิว)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold">฿{product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-xl text-gray-400 line-through">
                ฿{product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">เลือกไซส์:</h3>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">เลือกสี:</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">จำนวน:</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
              <span className="text-gray-500 ml-2">
                (เหลือ {product.stock} ชิ้น)
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              fullWidth
              size="lg"
            >
              {product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}
            </Button>
          </div>

          {/* Product Details */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-3">รายละเอียดสินค้า</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• หมวดหมู่: {product.category}</li>
              <li>• รหัสสินค้า: {product.id}</li>
              <li>• สถานะ: {product.inStock ? 'มีสินค้า' : 'สินค้าหมด'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
