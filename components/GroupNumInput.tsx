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
        className="text-black"
        type="text"
        placeholder="모임 숫자 코드를 입력하세요"
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
      />
      {groupNum && regex.test(groupNum) ? (
        <Link href={`/group/${groupNum}`}>모임 참여하기</Link>
      ) : (
        <button disabled className="cursor-not-allowed">
          모임 참여하기
        </button>
      )}
    </>
  );
}
