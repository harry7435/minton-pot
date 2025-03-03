export function formatDateToKorean(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
}
