export function FloatingShapesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 대각선 그리드 */}
      <div
        className="absolute inset-0 animate-drift opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, currentColor 1px, transparent 1px),
            linear-gradient(-45deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 코드 심볼들 - 떠다니는 효과 */}
      <div className="absolute top-[20%] left-[15%] animate-float-slow font-mono text-6xl text-blue-500/5 dark:text-blue-400/10">
        {"{}"}
      </div>
      <div className="absolute top-[15%] right-[20%] animate-float-medium font-mono text-5xl text-cyan-500/5 dark:text-cyan-400/10">
        {"<>"}
      </div>
      <div className="absolute top-[60%] left-[70%] animate-float-fast font-mono text-7xl text-purple-500/5 dark:text-purple-400/10">
        {"()"}
      </div>
      <div className="absolute bottom-[25%] left-[25%] animate-float-medium font-mono text-5xl text-indigo-500/5 dark:text-indigo-400/10">
        {"[]"}
      </div>
      <div className="absolute right-[15%] bottom-[20%] animate-float-slow font-mono text-6xl text-teal-500/5 dark:text-teal-400/10">
        {"</>"}
      </div>

      {/* 글로잉 원형 - 블러 효과 */}
      <div className="absolute top-[30%] left-[10%] h-64 w-64 animate-float-slow rounded-full bg-blue-500/5 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute top-[50%] right-[15%] h-80 w-80 animate-float-medium rounded-full bg-purple-500/5 blur-3xl dark:bg-purple-500/10" />
      <div className="absolute bottom-[20%] left-[60%] h-72 w-72 animate-float-fast rounded-full bg-cyan-500/5 blur-3xl dark:bg-cyan-500/10" />

      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

      {/* 바이너리 숫자들 */}
      <div className="absolute top-[10%] left-[40%] animate-float-medium font-mono text-gray-400/20 text-sm dark:text-gray-600/30">
        01010011
      </div>
      <div className="absolute right-[30%] bottom-[30%] animate-float-slow font-mono text-gray-400/20 text-xs dark:text-gray-600/30">
        11001010
      </div>
      <div className="absolute bottom-[30%] left-[30%] animate-float-slow font-mono text-gray-400/20 text-xs dark:text-gray-600/30">
        codefug
      </div>
    </div>
  );
}
