'use client';

import { memo } from 'react';
import NextImage from 'next/image';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  className?: string;
  width?: number;
  height?: number;
}

const SearchInput = memo(function SearchInput({ 
  value = '', 
  onChange,
  onEnter,
  placeholder = "검색어를 입력하세요",
  className = '',
  width = 400,
  height = 60
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`} style={{ height: `${height}px`, minHeight: `${height}px` }}>
      <NextImage
        src="/img/search/search.png"
        alt="search input"
        width={width}
        height={height}
        className="w-full h-full object-contain"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter?.();
          }
        }}
        placeholder={placeholder}
        className="absolute inset-0 w-full h-full bg-transparent text-gray-800 placeholder:text-gray-500 outline-none px-6 flex items-center text-base"
      />
    </div>
  );
});

export default SearchInput;