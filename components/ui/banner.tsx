import { POSTS } from "@/constants/path";
import { Button } from "./button";

export default function Banner() {
  return (
    <figure className="relative mb-12 overflow-hidden rounded-xl">
      <div className="flex h-[300px] w-full justify-end rounded-2xl bg-gradient-to-r from-[#1f1d80] to-[#000000]">
        <div className="absolute inset-0 z-[2] flex items-center">
          <div className="max-w-2xl p-8 text-white">
            <h2 className="mb-4 text-3xl font-bold">
              Codefug Blog에 오신 것을 환영합니다!
            </h2>
            <p className="mb-6 font-semibold text-white/80">
              Codefug Blog는 개발과 관련된 다양한 주제를 다루고 있습니다. <br />
              최신 기술 트렌드, 프로그래밍 언어, 프레임워크, 도구 및 팁을
              공유합니다.
            </p>
            <Button className="cursor-pointer whitespace-nowrap bg-black text-white hover:bg-[#2b2b2b]">
              <a href={POSTS} className="hover:opacity-95">
                블로그 글 보기
              </a>
            </Button>
          </div>
        </div>
      </div>
    </figure>
  );
}
