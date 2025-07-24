"use client";

import { TypeAnimation } from "react-type-animation";

export default function AboutHeading() {
  return (
    <div className="mb-8">
      <h1 className="mb-0 flex text-start text-3xl font-bold text-gray-900 dark:text-white">
        <div className="mb-0 h-24 w-fit whitespace-pre-line break-keep rounded-t-lg bg-white pt-2 dark:bg-black">
          {"이승현\nLee Seoung Hyun"}
        </div>
      </h1>
      <div className="h-5">
        <TypeAnimation
          sequence={["Detail-obsessed frontend engineer", 1000]}
          wrapper="span"
          cursor={false}
          className="text-lg font-bold"
        />
      </div>
    </div>
  );
}
