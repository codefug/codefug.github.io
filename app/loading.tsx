import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="scale-[1.15] animate-pulse transition-transform">
          <Image
            src="/images/main-logo.png"
            alt="로딩 중..."
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>
        <p className="mt-6 animate-pulse text-lg font-bold text-gray-600">
          Codefug Blog
        </p>
      </div>
    </div>
  );
}
