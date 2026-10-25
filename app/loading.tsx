/** 정적 페이지라 길게 보일 일이 거의 없다. 잠깐 스쳐도 눈에 걸리지 않게 글자 한 줄로 둔다. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-350 px-4 pt-14 md:pt-20">
      <p
        role="status"
        className="animate-pulse text-muted-foreground text-sm motion-reduce:animate-none"
      >
        불러오는 중입니다
      </p>
    </div>
  );
}
