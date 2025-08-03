export function FloatingShapesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 떠다니는 도형들 */}
      <div className="animate-float-slow absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-blue-500/5" />
      <div className="animate-float-medium absolute right-1/4 top-3/4 h-24 w-24 rounded-full bg-purple-500/5" />
      <div className="animate-float-fast absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-cyan-500/5" />
      <div className="animate-float-medium top-1/6 absolute right-1/2 h-20 w-20 rounded-full bg-indigo-500/5" />
      <div className="animate-float-slow absolute bottom-1/4 left-1/3 h-28 w-28 rounded-full bg-teal-500/5" />

      {/* 그라디언트 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10" />

      {/* 점선 패턴 */}
      <div
        className="animate-drift absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
}
