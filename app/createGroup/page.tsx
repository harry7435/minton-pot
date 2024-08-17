// pages/create-group.tsx
'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import inputItem from '@/constants/createGroup/inputItem';
import { schema } from '@/constants/yup/createGroupSchema';

interface Group {
  meetingName: string;
  stadiumName: string;
  location: string;
  exerciseTime: Date;
  maxPeople: number;
  totalCourts: number;
  password: string;
}

export default function CreateGroup() {
  const [meetingCode, setMeetingCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Group) => {
    // 랜덤 숫자 4~8자리 생성
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setMeetingCode(code);

    // TODO: 서버로 데이터 전송 코드 추가
    console.log(data);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#4686e0] p-4 text-white">
      <h1 className="mb-4 text-2xl">모임 정보 입력</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 overflow-y-auto p-2"
      >
        {inputItem.map(({ id, name, placeholder, type }) => (
          <div key={id}>
            <input
              {...register(name)}
              placeholder={placeholder}
              className="w-full rounded p-2 px-3 text-black focus:outline-[#4686e0]"
              type={type}
            />
            {errors[name] && (
              <p className="font-semibold text-warn">{errors[name].message}</p>
            )}
          </div>
        ))}

        <button type="submit" className="rounded bg-blue-600 p-2">
          완료
        </button>
      </form>

      {meetingCode && (
        <p className="mt-4 text-lg">
          모임 코드 : <strong>{meetingCode}</strong>
        </p>
      )}
    </main>
  );
}
