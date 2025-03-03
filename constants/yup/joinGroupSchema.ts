import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('이름 또는 닉네임을 입력하세요.').trim(),
  level: yup
    .string()
    .oneOf(['A', 'B', 'C', 'D', 'S', '초심'], '배드민턴 급수를 선택하세요.')
    .required('배드민턴 급수를 선택하세요.'),
  ageGroup: yup
    .string()
    .oneOf(
      ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
      '연령대를 선택하세요.'
    )
    .required('연령대를 선택하세요.'),
  gender: yup
    .string()
    .oneOf(['남', '여'], '성별을 선택하세요.')
    .required('성별을 선택하세요.'),
  lastPhoneNumber: yup
    .number()
    .required('휴대폰 끝 4자리를 입력하세요.')
    .typeError('숫자만 입력하세요.')
    .test('len', '4자리를 입력하세요.', (v) => v.toString().length === 4),
});
