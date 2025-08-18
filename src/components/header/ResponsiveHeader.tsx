import React from 'react';
import Header from './Header';

/**
 * 반응형 헤더 컴포넌트
 * - 디바이스 크기에 따라 적절한 헤더 변형을 표시
 */
const ResponsiveHeader = React.memo(function ResponsiveHeader() {
  return (
    <>
      {/* 데스크탑용 헤더 (1024px+) */}
      <div className="hidden lg:block">
        <Header variant="desktop" />
      </div>
      
      {/* 태블릿용 헤더 (768px ~ 1023px) */}
      <div className="hidden md:block lg:hidden">
        <Header variant="tablet" />
      </div>
      
      {/* 모바일용 헤더 (375px ~ 767px) */}
      <div className="block md:hidden">
        <Header variant="mobile" />
      </div>
    </>
  );
});

export default ResponsiveHeader;