import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              -{discountPercent}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">สินค้าหมด</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">฿{product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ฿{product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: getColorCode(color) }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center text-xs">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Helper function to convert Thai color names to color codes
function getColorCode(colorName: string): string {
  const colorMap: { [key: string]: string } = {
    'ขาว': '#FFFFFF',
    'ดำ': '#000000',
    'เทา': '#808080',
    'แดง': '#DC2626',
    'น้ำเงิน': '#2563EB',
    'เหลือง': '#EAB308',
    'เขียว': '#16A34A',
    'ชมพู': '#EC4899',
    'ม่วง': '#9333EA',
    'น้ำตาล': '#92400E',
    'กากี': '#A8A29E',
    'กรมท่า': '#1E3A8A',
    'ครีม': '#FEF3C7',
    'ฟ้า': '#38BDF8',
  };

  for (const [thai, code] of Object.entries(colorMap)) {
    if (colorName.includes(thai)) {
      return code;
    }
  }
  return '#CCCCCC';
}
