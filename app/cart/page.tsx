'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">ตะกร้าสินค้าของคุณว่างเปล่า</h1>
        <p className="text-gray-600 mb-8">เริ่มช้อปปิ้งเลย!</p>
        <Link href="/products">
          <Button>เลือกซื้อสินค้า</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ตะกร้าสินค้า ({getItemCount()} รายการ)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="bg-white rounded-lg shadow-md p-4 flex gap-4"
            >
              {/* Product Image */}
              <div className="relative w-24 h-32 flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <Link
                  href={`/products/${item.product.id}`}
                  className="font-semibold text-lg hover:text-gray-700"
                >
                  {item.product.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">
                  ไซส์: {item.selectedSize} | สี: {item.selectedColor}
                </p>
                <p className="text-lg font-bold mt-2">
                  ฿{item.product.price.toLocaleString()}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2 border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ลบ
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  ฿{(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">ยอดรวมสินค้า</span>
                <span>฿{getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ค่าจัดส่ง</span>
                <span>{getTotal() >= 1000 ? 'ฟรี' : '฿50'}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>ยอดรวมทั้งหมด</span>
                <span>
                  ฿{(getTotal() + (getTotal() >= 1000 ? 0 : 50)).toLocaleString()}
                </span>
              </div>
            </div>

            {getTotal() < 1000 && (
              <p className="text-sm text-gray-600 mb-4">
                ซื้อเพิ่มอีก ฿{(1000 - getTotal()).toLocaleString()} เพื่อรับส่งฟรี!
              </p>
            )}

            <Link href="/checkout">
              <Button fullWidth size="lg">
                ดำเนินการชำระเงิน
              </Button>
            </Link>

            <Link href="/products">
              <Button fullWidth variant="outline" className="mt-3">
                เลือกซื้อสินค้าต่อ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
