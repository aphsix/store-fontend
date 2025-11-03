'use client';

import Link from 'next/link';
import SearchBar from '../common/SearchBar';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
            FASHION STORE
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <SearchBar />
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-gray-700 hover:text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden sm:inline">บัญชี</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="flex items-center gap-2 text-gray-700 hover:text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-black relative"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline">ตะกร้า</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
