import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SKILLS } from "@/constants/about";
import Image from "next/image";
import { ReactNode } from "react";

const Shield = ({ alt, src }: { alt: string; src: string }) => (
  <Image
    src={src}
    alt={alt}
    width={140}
    height={32}
    className="mb-0 mt-0 h-8 w-auto"
    style={{ height: "auto" }}
  />
);

function SkillItem({
  title,
  itemList,
  value,
}: {
  title: string;
  itemList: {
    subtitle: string;
    list: ReactNode[];
  }[];
  value: string;
}) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-gray-700 dark:text-gray-300">
        <div className="flex flex-col">
          {itemList.map((item) => (
            <section key={item.subtitle} className="mb-4 flex flex-col gap-2">
              <h4 className="mt-0 text-lg font-bold text-primary dark:text-white">
                {item.subtitle}
              </h4>
              <ul className="flex flex-wrap gap-2">{item.list}</ul>
            </section>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function Skills() {
  return (
    <div className="prose mx-auto mt-4 dark:prose-invert">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Skills
      </h2>
      <Accordion
        type="multiple"
        defaultValue={["strong", "knowledgeable"]}
        className="w-full"
      >
        <SkillItem
          title="Strong"
          value="strong"
          itemList={SKILLS.strong.map(({ subtitle, list: skillList }) => ({
            subtitle,
            list: skillList.map((skill) => (
              <Shield key={skill.alt} alt={skill.alt} src={skill.src} />
            )),
          }))}
        />
        <SkillItem
          title="Knowledgeable"
          value="knowledgeable"
          itemList={SKILLS.knowledgeable.map(
            ({ subtitle, list: skillList }) => ({
              subtitle,
              list: skillList.map((skill) => (
                <Shield key={skill.alt} alt={skill.alt} src={skill.src} />
              )),
            }),
          )}
        />
      </Accordion>
    </div>
  );
}
