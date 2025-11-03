import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

  return (
    <div
      className={`bg-white rounded-lg shadow-md ${paddings[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
