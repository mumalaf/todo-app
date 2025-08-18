import Image from 'next/image';
import Link from 'next/link';

// 태블릿용 헤더 (768px ~ 1023px)
export default function HeaderLogo() {
  return (
    <header className="w-full bg-white px-4 py-3">
      <div className="max-w-screen-xl mx-auto flex justify-start">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/img/logo_full.png"
            alt="Logo Full"
            width={100}
            height={28}
            className="h-auto"
          />
        </Link>
      </div>
    </header>
  );
}