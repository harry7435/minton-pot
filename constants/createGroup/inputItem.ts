interface InputItem {
  id: number;
  name:
    | 'meetingName'
    | 'stadiumName'
    | 'location'
    | 'exerciseTime'
    | 'maxPeople'
    | 'totalCourts'
    | 'password';
  placeholder: string;
  type?: string;
  maxLength?: number;
  pattern?: string;
}

const inputItem: InputItem[] = [
  {
    id: 0,
    name: 'meetingName',
    placeholder: '모임 이름',
    maxLength: 20,
  },
  {
    id: 1,
    name: 'stadiumName',
    placeholder: '체육관 이름',
    maxLength: 20,
  },
  {
    id: 2,
    name: 'location',
    placeholder: '모임 지역',
    maxLength: 20,
  },
  {
    id: 3,
    name: 'exerciseTime',
    placeholder: '운동 날짜',
    type: 'date',
  },
  {
    id: 4,
    name: 'maxPeople',
    placeholder: '운동 최대 인원',
    type: 'number',
  },
  {
    id: 5,
    name: 'totalCourts',
    placeholder: '코트 갯수',
    type: 'number',
  },
  {
    id: 6,
    name: 'password',
    placeholder: '모임 비밀번호 (4 ~ 10자리)',
    type: 'password',
    maxLength: 10,
  },
];

export default inputItem;
