import getHeadings from "@/util/getHeadings";
import { readFile } from "fs/promises";
import { join } from "path";
import MenuList from "./menu-list";

export default async function MenuBar({ id }: { id: string }) {
  const content = await readFile(
    join(process.cwd(), "markdown/", id, `content.mdx`),
    "utf-8",
  );
  const headings = getHeadings(content);

  return <MenuList headings={headings} />;
}
