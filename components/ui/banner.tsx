import { POSTS } from "@/constants/path";
import { Button } from "./button";

export default function Banner() {
  return (
    <figure className="relative mb-12 mt-4 overflow-hidden rounded-xl">
      <div className="flex h-[300px] w-full justify-end rounded-2xl bg-gradient-to-r from-[#1f1d80] to-[#000000]">
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <div className="p-8 text-center text-white">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Codefug Blog에 오신 것을 환영합니다!
            </h2>
            <p className="mb-6 break-words text-center font-semibold text-white/80">
              제가 모르는 누군가가 이 블로그를 보고 지식을 얻고 문제를 해결하고
              더 나은 개발자가 되기를 바랍니다.
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
