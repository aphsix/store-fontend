import Link from 'next/link';
import { mockProducts } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';

export default function Home() {
  // แสดงสินค้าแนะนำ (8 รายการแรก)
  const featuredProducts = mockProducts.slice(0, 8);

  // สินค้าลดราคา
  const saleProducts = mockProducts.filter(p => p.originalPrice).slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            FASHION STORE
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            คอลเล็คชั่นใหม่ล่าสุด ลดราคาสูงสุด 50%
          </p>
          <Link href="/products">
            <Button size="lg">
              เลือกซื้อสินค้า
            </Button>
          </Link>
        </div>
      </section>

      {/* Sale Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">🔥 ลดราคาพิเศษ</h2>
          <Link href="/products" className="text-gray-600 hover:text-black">
            ดูทั้งหมด →
          </Link>
        </div>
        <ProductGrid products={saleProducts} />
      </section>

      {/* Featured Products */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">สินค้าแนะนำ</h2>
            <Link href="/products" className="text-gray-600 hover:text-black">
              ดูทั้งหมด →
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          เลือกช้อปตามหมวดหมู่
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'เสื้อ', href: '/categories/เสื้อ', emoji: '👕' },
            { name: 'กางเกง', href: '/categories/กางเกง', emoji: '👖' },
            { name: 'เดรส', href: '/categories/เดรส', emoji: '👗' },
            { name: 'กระโปรง', href: '/categories/กระโปรง', emoji: '🩱' },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {category.emoji}
              </div>
              <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-semibold text-lg mb-2">จัดส่งฟรี</h3>
              <p className="text-gray-600">สั่งซื้อครบ 1,000 บาท</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">↩️</div>
              <h3 className="font-semibold text-lg mb-2">คืนสินค้าง่าย</h3>
              <p className="text-gray-600">ภายใน 7 วัน</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="font-semibold text-lg mb-2">ชำระเงินปลอดภัย</h3>
              <p className="text-gray-600">รองรับหลายช่องทาง</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
