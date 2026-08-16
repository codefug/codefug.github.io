import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MARKDOWN_DIR = join(process.cwd(), "markdown");
const LIB_DIR = join(process.cwd(), "lib");
const OUTPUT_PATH = join(LIB_DIR, "mdxMap.ts");
const LOCALE = "ko";

function generateMdxMap() {
  // lib 폴더 없으면 생성
  if (!existsSync(LIB_DIR)) mkdirSync(LIB_DIR, { recursive: true });

  // markdown 디렉토리에서 모든 폴더 가져오기
  const folders = readdirSync(MARKDOWN_DIR);

  // 각 폴더에 대한 dynamic import 코드 생성
  let code = `// 자동 생성된 파일입니다. 직접 수정하지 마세요.\n\n`;

  code += `import type { MDXModule } from "mdx/types";\n`;

  // 글이 없는 폴더도 있을 수 있으므로 실제로 파일이 있는 것만 import한다.
  const hasContent = (folder) =>
    existsSync(join(MARKDOWN_DIR, folder, LOCALE, "content.mdx"));

  folders.forEach((folder) => {
    if (!hasContent(folder)) return;
    const importName = `MDX_${folder.replace(/[^a-zA-Z0-9]/g, "_")}`;
    code += `import * as ${importName} from "@/markdown/${folder}/${LOCALE}/content.mdx";\n`;
  });

  code += `\nexport const mdxMap: Record<string, MDXModule> = {\n`;

  folders.forEach((folder) => {
    if (!hasContent(folder)) return;
    const importName = `MDX_${folder.replace(/[^a-zA-Z0-9]/g, "_")}`;
    code += `  "${folder}": ${importName},\n`;
  });

  code += `};\n`;

  // 결과 파일 작성
  writeFileSync(OUTPUT_PATH, code);
  console.log(`✅ MDX 매핑 파일이 생성되었습니다: ${OUTPUT_PATH}`);
}

generateMdxMap();
