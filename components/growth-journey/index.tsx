import { GROWTH_JOURNEY } from "@/constants/about";
import { HeadComponent } from "../portfolio/HeadComponent";

export default function GrowthJourney() {
  return (
    <section>
      <HeadComponent>Growth Journey</HeadComponent>
      <div className="flex flex-col gap-2 whitespace-pre-line">
        {GROWTH_JOURNEY}
      </div>
    </section>
  );
}
