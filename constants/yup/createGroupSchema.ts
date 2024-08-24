import * as yup from 'yup';

export const schema = yup.object().shape({
  meetingName: yup.string().required('모임 이름을 입력해주세요'),
  stadiumName: yup.string().required('체육관 이름을 입력해주세요'),
  location: yup.string().required('모임 지역을 입력해주세요'),
  exerciseTime: yup
    .date()
    .required('번개 운동 날짜를 선택해주세요')
    .typeError('날짜 형태(yyyy. mm. dd.)이 아닙니다'),
  maxPeople: yup
    .number()
    .required('운동 최대 인원을 설정해주세요')
    .typeError('운동 최대 인원을 설정해주세요')
    .positive()
    .integer(),
  totalCourts: yup
    .number()
    .required('배드민턴 코트 갯수를 입력해주세요')
    .typeError('배드민턴 코트 갯수를 입력해주세요')
    .positive()
    .integer(),
  password: yup
    .number()
    .required('모임 비밀번호를 입력해주세요')
    .min(4, '비밀번호는 최소 4자리 이상입니다'),
});
