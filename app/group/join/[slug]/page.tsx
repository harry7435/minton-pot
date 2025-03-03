'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addMemberToGroup } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { schema } from '@/constants/yup/joinGroupSchema';

type FormData = {
  name: string;
  level: 'A' | 'B' | 'C' | 'D' | '초심' | 'S';
  ageGroup: '10대' | '20대' | '30대' | '40대' | '50대' | '60대 이상';
  gender: '남' | '여';
  lastPhoneNumber: number;
};

export default function GroupJoinPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      level: undefined,
      ageGroup: undefined,
      gender: undefined,
      lastPhoneNumber: undefined,
    },
  });

  const onSubmit = async (data: {
    name: string;
    level: string;
    ageGroup: string;
    gender: string;
    lastPhoneNumber: number;
  }) => {
    const result = await addMemberToGroup(Number(params.slug), data);
    if (result.success) {
      alert('모임에 성공적으로 참여했습니다!');
      router.push(`/group/${params.slug}`);
    } else {
      alert('모임 참여에 실패했습니다.');
    }
  };

  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-[#4686e0] p-4 text-white">
      <h1 className="mb-4 text-center text-2xl">모임 참여</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 p-2"
      >
        <div>
          <label>이름 또는 닉네임</label>
          <input
            type="text"
            {...register('name')}
            className="w-full rounded p-2 px-3 text-black"
          />
          {errors.name && (
            <p className="font-semibold text-warn">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label>배드민턴 급수</label>
          <select
            {...register('level')}
            className="w-full rounded p-2 px-3 text-black"
          >
            <option value="">선택하세요</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="s">S</option>
          </select>
          {errors.level && (
            <p className="font-semibold text-warn">{errors.level.message}</p>
          )}
        </div>
        <div>
          <label>연령대</label>
          <select
            {...register('ageGroup')}
            className="w-full rounded p-2 px-3 text-black"
          >
            <option value="">선택하세요</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대">40대</option>
            <option value="50대">50대</option>
            <option value="60대">60대</option>
          </select>
          {errors.ageGroup && (
            <p className="font-semibold text-warn">{errors.ageGroup.message}</p>
          )}
        </div>
        <div>
          <label>성별</label>
          <select
            {...register('gender')}
            className="w-full rounded p-2 px-3 text-black"
          >
            <option value="">선택하세요</option>
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
          {errors.gender && (
            <p className="font-semibold text-warn">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label>휴대폰 끝 4자리</label>
          <input
            type="number"
            {...register('lastPhoneNumber')}
            className="w-full rounded p-2 px-3 text-black"
          />
          {errors.lastPhoneNumber && (
            <p className="font-semibold text-warn">
              {errors.lastPhoneNumber.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 py-2 text-gray-50 disabled:bg-slate-400"
          disabled={!isValid}
        >
          참여하기
        </button>
      </form>
    </main>
  );
}
