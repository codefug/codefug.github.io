import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="scale-[1.15] animate-[bounce_1s_ease-in-out_infinite] transition-transform hover:scale-125">
          <Image
            src="/images/main-logo.png"
            alt="로딩 중..."
            width={120}
            height={120}
            className="rotate-[5deg] drop-shadow-lg"
          />
        </div>
        <p className="mt-6 animate-pulse text-lg font-medium text-gray-600">
          로딩 중<span className="animate-[bounce_0.4s_infinite]">.</span>
          <span className="animate-[bounce_0.4s_0.1s_infinite]">.</span>
          <span className="animate-[bounce_0.4s_0.2s_infinite]">.</span>
        </p>
      </div>
    </div>
  );
}
