"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function AboutHeading() {
  return (
    <div className="mb-8">
      <figure className="flex gap-4">
        <div className="relative h-52 w-52 shrink-0">
          <Image
            loading="eager"
            src="/images/about/profile.svg"
            alt="About Banner"
            fill
            className="mb-4 h-auto rounded-lg object-contain"
          />
        </div>
        <section>
          <h1 className="mb-0 flex text-start text-3xl font-bold text-gray-900 dark:text-white">
            <div className="mb-0 w-fit whitespace-pre-line break-keep rounded-t-lg pt-2">
              이승현 Lee Seoung Hyun
            </div>
          </h1>
          <TypeAnimation
            sequence={["Efficiency-driven developer"]}
            wrapper="div"
            speed={80}
            cursor={false}
            className="mb-4 text-lg font-bold text-primary"
          />
          <TypeAnimation
            sequence={[
              1000,
              "저는 효율을 위해 고민하는 개발자입니다. 반복되는 작업은 자동화하고, 복잡한 구조는 단순화합니다. 문제를 해결하지 못한 채 하루를 마무리할 수 없어, 퇴근 후에도 머릿속에서 비동기적으로 해결책을 계산합니다.",
              1000,
            ]}
            wrapper="div"
            speed={90}
            cursor={false}
            className="text-md mt-2 w-full break-keep"
          />
        </section>
      </figure>
    </div>
  );
}
