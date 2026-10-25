const BIRTHDAY_MONTH = 0; // 0 = 1월 (getMonth는 0부터 센다)

export function shouldShowBirthdayBanner(): boolean {
  const today = new Date();
  return today.getMonth() === BIRTHDAY_MONTH;
}
