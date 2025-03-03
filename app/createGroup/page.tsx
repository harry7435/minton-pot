'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import inputItem from '@/constants/createGroup/inputItem';
import { schema } from '@/constants/yup/createGroupSchema';
import Link from 'next/link';
import Image from 'next/image';
import { Group } from '@/types/group';
import { createGroup } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function CreateGroup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (newGroupData: Group) => {
    const { data } = await createGroup(newGroupData);

    if (data) {
      alert(`모임 생성 완료! 코드 : ${data.code}`);
      router.push(`/group/join/${data.code}`);
    }
  };

  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-[#4686e0] p-4 text-white">
      <h1 className="mb-4 text-center text-2xl">모임 정보 입력</h1>
      <Link
        href="/"
        className="absolute left-6 top-6 mb-4 rounded-md border border-white p-2"
      >
        <Image
          src="/assets/icon-home.svg"
          alt="icon-home"
          width={24}
          height={24}
        />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 overflow-y-auto p-2"
      >
        {inputItem.map(({ id, name, placeholder, type, maxLength }) => (
          <div key={id}>
            <input
              {...register(name)}
              placeholder={placeholder}
              className="w-full rounded p-2 px-3 text-black focus:outline-[#4686e0]"
              type={type}
              maxLength={maxLength}
            />
            {errors[name] && (
              <p className="font-semibold text-warn">{errors[name].message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="rounded bg-blue-600 py-2 text-gray-50 disabled:bg-slate-400"
          disabled={!isValid}
        >
          완료
        </button>
      </form>
    </main>
  );
}
