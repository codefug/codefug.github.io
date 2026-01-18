/**
 * 생일 배너 표시 여부를 결정하는 유틸리티 함수
 * 매년 1월 전체 기간 동안 표시됩니다.
 */

const BIRTHDAY_MONTH = 0; // 0 = 1월 (JavaScript Date는 0부터 시작)

/**
 * 현재 날짜가 생일 배너를 표시해야 하는 기간인지 확인합니다.
 * 매년 1월 전체 기간 동안 표시됩니다.
 * @returns 생일 배너를 표시해야 하면 true, 아니면 false
 */
export function shouldShowBirthdayBanner(): boolean {
  const today = new Date();
  // 현재 월이 1월(0)인지 확인
  return today.getMonth() === BIRTHDAY_MONTH;
}
