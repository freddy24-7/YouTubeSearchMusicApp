import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: () => void;
};

export function Card({ children, className = '', style, onTouchStart, onTouchMove, onTouchEnd }: CardProps) {
  return (
    <div
      className={`bg-gray-200 rounded-2xl shadow-2xl p-10 max-w-2xl text-gray-900 ${className}`}
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}
