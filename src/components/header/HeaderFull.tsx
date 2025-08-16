import Image from 'next/image';

// 데스크탑용 헤더 (1024px+)
export default function HeaderFull() {
  return (
    <header className="w-full bg-white px-6 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center">
        <Image
          src="/img/logo_full.png"
          alt="Logo Full"
          width={140}
          height={36}
          className="h-auto"
        />
      </div>
    </header>
  );
}