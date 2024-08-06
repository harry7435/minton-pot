'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

export default function GroupNumInput() {
  const [groupNum, setGroupNum] = useState('');
  const router = useRouter();

  const regex = /^[0-9]*$/;

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGroupNum(e.target.value);
  };

  const handleKeyDownInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && groupNum && regex.test(groupNum)) {
      router.push(`/group/${groupNum}`);
    }
  };

  return (
    <>
      <input
        className="h-10 rounded-md px-4 text-center text-black focus:outline-[#4686e0]"
        type="text"
        placeholder="모임 숫자 코드를 입력하세요"
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
      />
      {groupNum && regex.test(groupNum) ? (
        <Link
          href={`/group/${groupNum}`}
          className="rounded-lg bg-white px-4 py-2 text-[#4686e0] shadow transition hover:bg-gray-200"
        >
          모임 참여하기
        </Link>
      ) : (
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-gray-500 shadow"
        >
          모임 참여하기
        </button>
      )}
    </>
  );
}
