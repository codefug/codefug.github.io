"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  CATEGORY_SECTION_ORDER,
  type CategoryGroupId,
  type CategorySectionId,
  getGroupIdByTag,
  getGroupIdsBySection,
} from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { CollapsiblePostList } from "./CollapsiblePostList";

function groupPostsByFirstCategory(
  posts: FrontMatter[],
): Record<string, FrontMatter[]> {
  return posts.reduce<Record<string, FrontMatter[]>>((acc, post) => {
    const category = post.categories[0];
    if (!acc[category]) acc[category] = [];
    acc[category].push(post);
    return acc;
  }, {});
}

type PostsByCategory = Record<string, FrontMatter[]>;

/** 그룹 하나 — 대분류 안에서 다시 접히는 단위 */
function GroupNode({
  groupId,
  postsByCategory,
  isCurrentPath,
}: {
  groupId: CategoryGroupId;
  postsByCategory: PostsByCategory;
  isCurrentPath: (post: FrontMatter) => boolean;
}) {
  const t = useTranslations("categories");

  // 어느 그룹에도 속하지 않는 태그는 fallback 그룹으로 모여 누락되지 않는다.
  const categories = Object.keys(postsByCategory).filter(
    (category) => getGroupIdByTag(category) === groupId,
  );
  if (categories.length === 0) return null;

  const hasCurrentPost = categories.some((category) =>
    postsByCategory[category].some(isCurrentPath),
  );

  return (
    <Collapsible defaultOpen={hasCurrentPost} className="group/group" asChild>
      <div>
        <CollapsibleTrigger className="w-full cursor-pointer select-none rounded-md px-3 py-1 text-left transition-colors hover:bg-sidebar-accent">
          <div className="flex items-baseline gap-1.5">
            <ChevronRight
              className="h-3 w-3 shrink-0 self-center text-sidebar-foreground/40 transition-transform duration-200 group-data-[state=open]/group:rotate-90"
              aria-hidden="true"
            />
            <h3 className="font-medium text-[11px] text-sidebar-foreground/60">
              {t(`${groupId}.label`)}
            </h3>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent className="pl-2">
            {categories.map((category) => (
              <CollapsiblePostList key={category} category={category} />
            ))}
          </SidebarGroupContent>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

/**
 * 대분류 → 그룹 → 글의 3단 목록.
 * 전부 펼치면 너무 길어지므로 기본은 접어두고,
 * 지금 보고 있는 글이 속한 가지만 펼친 채로 시작한다.
 */
export function PostGroupContent({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const t = useTranslations("sections");
  const pathname = usePathname();
  const postsByCategory = useMemo(
    () => groupPostsByFirstCategory(frontMatterList),
    [frontMatterList],
  );

  const isCurrentPath = (post: FrontMatter) =>
    pathname.includes(`${PATH.POSTS}/${post.id}`);

  return (
    <SidebarGroup className="gap-3 py-2">
      {CATEGORY_SECTION_ORDER.map((sectionId: CategorySectionId) => {
        const groupIds = getGroupIdsBySection(sectionId);
        const categories = Object.keys(postsByCategory).filter((category) =>
          groupIds.includes(getGroupIdByTag(category)),
        );
        if (categories.length === 0) return null;

        const hasCurrentPost = categories.some((category) =>
          postsByCategory[category].some(isCurrentPath),
        );

        return (
          <Collapsible
            key={sectionId}
            defaultOpen={hasCurrentPost}
            className="group/section"
            asChild
          >
            <section>
              {/* 이름만으로는 무슨 글인지 알기 어려워 설명을 함께 보여준다. */}
              <CollapsibleTrigger className="w-full cursor-pointer select-none rounded-md px-3 py-1.5 text-left transition-colors hover:bg-sidebar-accent">
                <div className="flex items-baseline gap-1.5">
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 self-center text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]/section:rotate-90"
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-[11px] text-sidebar-foreground/70 uppercase tracking-widest">
                    {t(`${sectionId}.label`)}
                  </h2>
                </div>
                <p className="mt-0.5 pl-5 text-[11px] text-sidebar-foreground/40 leading-snug">
                  {t(`${sectionId}.description`)}
                </p>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-1 space-y-0.5 pl-2">
                  {/*
                    그룹이 하나뿐이면 "시리즈 > 시리즈"처럼 같은 이름이 겹친다.
                    그럴 때는 중간 단계를 건너뛰고 태그를 바로 보여준다.
                  */}
                  {groupIds.length === 1
                    ? categories.map((category) => (
                        <CollapsiblePostList
                          key={category}
                          category={category}
                        />
                      ))
                    : groupIds.map((groupId) => (
                        <GroupNode
                          key={groupId}
                          groupId={groupId}
                          postsByCategory={postsByCategory}
                          isCurrentPath={isCurrentPath}
                        />
                      ))}
                </div>
              </CollapsibleContent>
            </section>
          </Collapsible>
        );
      })}
    </SidebarGroup>
  );
}
