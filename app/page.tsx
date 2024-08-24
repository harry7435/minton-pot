import GroupNumInput from '@/components/GroupNumInput';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-[#4686e0] p-4 text-white">
      {/* Header Section */}
      <header className="mb-8 flex flex-col items-center">
        <h1 className="mb-2 text-4xl font-bold">Minton Pot</h1>
        <p className="text-lg">배드민턴 번개를 쉽고 빠르게</p>
      </header>

      {/* Input Section */}
      <div className="flex min-w-[240px] flex-col gap-10">
        <div className="flex flex-col gap-3">
          <GroupNumInput />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-left">번개에 참여하고 싶다면?</p>
          <Link
            href="/createGroup"
            className="rounded-lg bg-white px-4 py-2 text-center text-[#4686e0] shadow transition hover:bg-gray-200"
          >
            번개 생성
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-sm">
        <p>© 2024 Minton Pot. All rights reserved.</p>
      </footer>
    </main>
  );
}
