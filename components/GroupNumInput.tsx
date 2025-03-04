'use client';

import { useRouter } from 'next/navigation';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useMemo,
  useState,
} from 'react';
import { checkGroupCodeExists } from '@/lib/actions';

const regex = /^[0-9]*$/;

export default function GroupNumInput() {
  const [groupNum, setGroupNum] = useState('');
  const isValidCode = useMemo(
    () => regex.test(groupNum) && groupNum.length >= 4 && groupNum.length <= 6,
    [groupNum]
  );
  const router = useRouter();

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGroupNum(e.target.value);
  };

  const handleJoinGroup = async () => {
    const canJoin = await checkGroupCodeExists(Number(groupNum));
    if (canJoin) {
      router.push(`/group/join/${groupNum}`);
    } else {
      alert('존재하지 않는 모임 코드입니다.');
    }
  };

  const handleKeyDownInput: KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === 'Enter' && isValidCode) await handleJoinGroup();
  };

  return (
    <>
      <input
        className="h-10 rounded-md px-4 text-center text-black focus:outline-[#4686e0]"
        type="text"
        placeholder="모임 숫자 코드를 입력하세요"
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownInput}
        maxLength={6}
      />
      {isValidCode ? (
        <button
          onClick={handleJoinGroup}
          className="rounded-lg bg-white px-4 py-2 text-center text-[#4686e0] shadow transition hover:bg-gray-200"
        >
          모임 참여하기
        </button>
      ) : (
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-gray-300 px-4 py-2 text-center text-gray-500 shadow"
        >
          모임 참여하기
        </button>
      )}
    </>
  );
}
