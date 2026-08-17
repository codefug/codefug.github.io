import { describe, expect, it } from "vitest";
import { moveActiveIndex } from "./postSearchGallery";

/** 화살표를 여러 번 누른 결과를 순서대로 모은다. */
function press(delta: 1 | -1, size: number, times: number): number[] {
  const path: number[] = [];
  let current = -1;
  for (let i = 0; i < times; i += 1) {
    current = moveActiveIndex(current, delta, size);
    path.push(current);
  }
  return path;
}

describe("moveActiveIndex", () => {
  it("아래 화살표는 첫 항목부터 차례로 내려간다", () => {
    expect(press(1, 3, 3)).toEqual([0, 1, 2]);
  });

  it("위 화살표는 마지막 항목부터 차례로 올라간다", () => {
    expect(press(-1, 3, 3)).toEqual([2, 1, 0]);
  });

  it("목록 끝을 지나면 선택 없음(-1)으로 돌아와 순환한다", () => {
    // 아무것도 고르지 않은 상태로 돌아와야 입력한 값 그대로 검색할 수 있다.
    expect(press(1, 3, 5)).toEqual([0, 1, 2, -1, 0]);
    expect(press(-1, 3, 5)).toEqual([2, 1, 0, -1, 2]);
  });

  it("항목이 하나뿐이면 선택과 해제를 번갈아 한다", () => {
    expect(press(1, 1, 4)).toEqual([0, -1, 0, -1]);
  });

  it("목록이 비면 언제나 선택 없음이다", () => {
    expect(moveActiveIndex(-1, 1, 0)).toBe(-1);
    expect(moveActiveIndex(2, -1, 0)).toBe(-1);
  });
});
