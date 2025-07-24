import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GROWTH_JOURNEY } from "@/constants/about";

export default function GrowthJourney() {
  return (
    <Accordion type="single" collapsible defaultValue="growthJourney">
      <AccordionItem value="growthJourney">
        <AccordionTrigger className="text-2xl font-bold text-gray-900 dark:text-white">
          Growth Journey
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {GROWTH_JOURNEY.map((journey) => (
            <p key={journey}>{journey}</p>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
