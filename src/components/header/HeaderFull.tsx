import Image from 'next/image';
import Link from 'next/link';

// 데스크탑용 헤더 (1024px+)
export default function HeaderFull() {
  return (
    <header className="w-full bg-white px-6 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/img/logo_full.png"
            alt="Logo Full"
            width={140}
            height={36}
            className="h-auto"
          />
        </Link>
      </div>
    </header>
  );
}