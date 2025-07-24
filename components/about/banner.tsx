import Image from "next/image";

export default function AboutHeading() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg">
      <Image
        loading="eager"
        priority
        src="/images/about/banner.jpg"
        alt="발표하는 멋진 나의 모습"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
      />
      <h1 className="absolute bottom-0 left-0 right-0 mb-0 flex justify-center text-center text-3xl font-bold text-gray-900 dark:text-white">
        <div className="mb-0 w-fit rounded-t-lg bg-white px-6 pt-2 dark:bg-black">
          About Me
        </div>
      </h1>
    </div>
  );
}
