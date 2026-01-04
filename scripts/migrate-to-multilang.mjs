/**
 * 기존 마크다운 구조를 다국어 구조로 마이그레이션
 *
 * Before:
 * markdown/
 *   2024-05-18/
 *     content.mdx
 *     frontmatter.mdx
 *
 * After:
 * markdown/
 *   2024-05-18/
 *     ko/
 *       content.mdx
 *       frontmatter.mdx
 */

import fs from 'node:fs';
import path from 'node:path';

const markdownDir = path.join(process.cwd(), 'markdown');

// 모든 포스트 디렉토리 가져오기
const postDirs = fs.readdirSync(markdownDir).filter(file => {
  const fullPath = path.join(markdownDir, file);
  return fs.statSync(fullPath).isDirectory();
});

console.log(`Found ${postDirs.length} posts to migrate`);

postDirs.forEach(postId => {
  const postPath = path.join(markdownDir, postId);
  const contentPath = path.join(postPath, 'content.mdx');
  const frontmatterPath = path.join(postPath, 'frontmatter.mdx');

  // 이미 ko 폴더가 있으면 스킵
  const koPath = path.join(postPath, 'ko');
  if (fs.existsSync(koPath)) {
    console.log(`⏭️  Skipping ${postId} (already migrated)`);
    return;
  }

  // content.mdx와 frontmatter.mdx가 모두 있는지 확인
  if (!fs.existsSync(contentPath) || !fs.existsSync(frontmatterPath)) {
    console.log(`⚠️  Skipping ${postId} (missing files)`);
    return;
  }

  try {
    // ko 폴더 생성
    fs.mkdirSync(koPath, { recursive: true });

    // 파일 이동
    fs.renameSync(contentPath, path.join(koPath, 'content.mdx'));
    fs.renameSync(frontmatterPath, path.join(koPath, 'frontmatter.mdx'));

    console.log(`✅ Migrated ${postId}`);
  } catch (error) {
    console.error(`❌ Error migrating ${postId}:`, error.message);
  }
});

console.log('\n✨ Migration complete!');
console.log('Next steps:');
console.log('1. Run your build to verify everything works');
console.log('2. Use the translate-post command to create en/ and ja/ versions');
