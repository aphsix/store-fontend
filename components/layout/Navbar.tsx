'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'สินค้าทั้งหมด', href: '/products' },
    { name: 'เสื้อ', href: '/categories/เสื้อ' },
    { name: 'กางเกง', href: '/categories/กางเกง' },
    { name: 'เดรส', href: '/categories/เดรส' },
    { name: 'กระโปรง', href: '/categories/กระโปรง' },
  ];

  return (
    <nav className="bg-gray-100 border-b">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
