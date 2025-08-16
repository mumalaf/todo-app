import Image from 'next/image';

// 모바일용 헤더 (375px ~ 767px)
export default function HeaderCombined() {
  return (
    <header className="w-full bg-white px-4 py-3">
      <div className="max-w-screen-xl mx-auto flex justify-start">
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={28}
          height={28}
          className="h-auto"
        />
      </div>
    </header>
  );
}