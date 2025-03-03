import { getGroupByCode } from '@/lib/actions';
import { formatDateToKorean } from '@/lib/utils';
import { isGroup } from '@/types/group';
import Image from 'next/image';
import Link from 'next/link';

export default async function GroupPage({
  params,
}: {
  params: { slug: string };
}) {
  const groupData = await getGroupByCode(Number(params.slug));

  if (!isGroup(groupData)) {
    throw new Error('Invalid group data');
  }

  return (
    <main className="relative flex h-screen flex-col items-center justify-center bg-[#4686e0] p-4 text-white">
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

      <div className="flex flex-col gap-4">
        <p>모임 코드 : {params.slug}</p>
        <p>번개 모임명 : {groupData.meetingName}</p>
        <p>
          운동장소 및 지역 : {groupData.stadiumName} / {groupData.location}
        </p>
        <p>운동 날짜 : {formatDateToKorean(groupData.exerciseTime)}</p>
        <p>운동 최대 인원 : {groupData.maxPeople}명</p>
        <p>코트 갯수 : {groupData.totalCourts}코트</p>
      </div>
    </main>
  );
}
