const BIRTHDAY_MONTH = 0; // 0 = 1월 (JavaScript Date는 0부터 시작)

/** 생일 배너는 매년 1월 내내 보여준다. */
export function shouldShowBirthdayBanner(): boolean {
  const today = new Date();
  return today.getMonth() === BIRTHDAY_MONTH;
}
