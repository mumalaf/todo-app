import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  variant: 'mobile' | 'tablet' | 'desktop';
}

/**
 * 통합된 헤더 컴포넌트
 * - mobile: 작은 로고 (375px ~ 767px)
 * - tablet: 풀 로고 좌측 정렬 (768px ~ 1023px) 
 * - desktop: 풀 로고 중앙 정렬 (1024px+)
 */
const Header = React.memo(function Header({ variant }: HeaderProps) {
  const getImageConfig = () => {
    switch (variant) {
      case 'mobile':
        return {
          src: '/img/logo.png',
          alt: 'Logo',
          width: 28,
          height: 28,
        };
      case 'tablet':
        return {
          src: '/img/logo_full.png',
          alt: 'Logo Full',
          width: 100,
          height: 28,
        };
      case 'desktop':
        return {
          src: '/img/logo_full.png',
          alt: 'Logo Full',
          width: 140,
          height: 36,
        };
    }
  };

  const getContainerClass = () => {
    const baseClass = 'max-w-screen-xl mx-auto flex';
    switch (variant) {
      case 'mobile':
      case 'tablet':
        return `${baseClass} justify-start`;
      case 'desktop':
        return `${baseClass} justify-center`;
    }
  };

  const getPaddingClass = () => {
    switch (variant) {
      case 'mobile':
      case 'tablet':
        return 'px-4 py-3';
      case 'desktop':
        return 'px-6 py-4';
    }
  };

  const imageConfig = getImageConfig();

  return (
    <header className={`w-full bg-white ${getPaddingClass()}`}>
      <div className={getContainerClass()}>
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src={imageConfig.src}
            alt={imageConfig.alt}
            width={imageConfig.width}
            height={imageConfig.height}
            className="h-auto"
          />
        </Link>
      </div>
    </header>
  );
});

export default Header;