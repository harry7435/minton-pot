import GroupNumInput from '@/components/GroupNumInput';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>홈페이지</h1>
      <GroupNumInput />

      <p>모임에 참석하고 싶다면?</p>
      <Link href={'/createGroup'}>모임 만들기</Link>
    </>
  );
}
