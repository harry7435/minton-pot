import { getGroupByCode } from '@/lib/actions';
import { formatDateToKorean } from '@/lib/utils';
import { isGroup } from '@/types/group';

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
    <>
      <h1>모임 코드</h1>
      <p>{params.slug}</p>
      <h2>번개 모임명</h2>
      <p>{groupData.meetingName}</p>
      <h5>운동장소 및 지역</h5>
      <p>
        {groupData.stadiumName} / {groupData.location}
      </p>
      <h5>운동일시</h5>
      <p>{formatDateToKorean(groupData.exerciseTime)}</p>
      <h5>운동 최대 인원</h5>
      <p>{groupData.maxPeople}명</p>
    </>
  );
}
