import HeaderFull from './HeaderFull';
import HeaderLogo from './HeaderLogo';
import HeaderCombined from './HeaderCombined';

export default function ResponsiveHeader() {
  return (
    <>
      {/* 데스크탑용 헤더 (1024px+) */}
      <div className="hidden lg:block">
        <HeaderFull />
      </div>
      
      {/* 태블릿용 헤더 (768px ~ 1023px) */}
      <div className="hidden md:block lg:hidden">
        <HeaderLogo />
      </div>
      
      {/* 모바일용 헤더 (375px ~ 767px) */}
      <div className="block md:hidden">
        <HeaderCombined />
      </div>
    </>
  );
}