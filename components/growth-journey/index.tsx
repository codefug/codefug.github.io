import type { ComponentPropsWithoutRef } from "react";
import { GROWTH_JOURNEY } from "@/constants/about";
import { HeadComponent } from "../portfolio/HeadComponent";

interface Props {
  className?: ComponentPropsWithoutRef<"section">["className"];
}

export default function GrowthJourney({ className }: Props) {
  return (
    <section className={className}>
      <HeadComponent>Growth Journey</HeadComponent>
      <div className="flex flex-col gap-2 whitespace-pre-line">
        {GROWTH_JOURNEY}
      </div>
    </section>
  );
}
