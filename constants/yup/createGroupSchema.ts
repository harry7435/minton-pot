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
    .integer()
    .max(100, '운동 최대 인원은 100명까지 입력 가능합니다'),
  totalCourts: yup
    .number()
    .required('배드민턴 코트 갯수를 입력해주세요')
    .typeError('배드민턴 코트 갯수를 입력해주세요')
    .positive()
    .integer()
    .max(100, '코트 갯수는 최대 100개까지 입력 가능합니다'),
  password: yup
    .number()
    .typeError('비밀번호는 숫자로 입력해주세요')
    .required('모임 비밀번호를 입력해주세요')
    .test(
      'len',
      '비밀번호는 최소 4자리 이상입니다',
      (pw) => pw.toString().length > 3
    ),
});
