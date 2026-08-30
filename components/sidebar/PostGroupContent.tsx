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
  hasGroupPage,
  shouldFlattenGroups,
  toGroupSlug,
} from "@/constants/categories";
import type { FrontMatter } from "@/constants/mdx";
import { PATH } from "@/constants/path";
import { useTranslations } from "@/lib/messages";
import { cn } from "@/lib/utils";
import { resolveTagLabel } from "@/util/tag-label";
import { CollapsiblePostList } from "./CollapsiblePostList";
import { SidebarAnchorButton } from "./SidebarAnchorButton";

/**
 * 글이 가진 카테고리 전부를 기준으로 묶는다. 한 글이 여러 태그를 가지면
 * (예: async-js + javascript) 두 태그 모두의 사이드바 목록에 나타난다.
 */
function groupPostsByCategory(
  posts: FrontMatter[],
): Record<string, FrontMatter[]> {
  return posts.reduce<Record<string, FrontMatter[]>>((acc, post) => {
    for (const category of post.categories) {
      if (!acc[category]) acc[category] = [];
      acc[category].push(post);
    }
    return acc;
  }, {});
}

type PostsByCategory = Record<string, FrontMatter[]>;

/**
 * 전용 목록 페이지로 하단 내비게이션에 이미 노출되는 대분류.
 * 카테고리 트리에서는 중복으로 보이지 않도록 뺀다.
 */
const SECTIONS_WITH_OWN_NAV_ENTRY: readonly CategorySectionId[] = ["series"];

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
  const pathname = usePathname();

  // 어느 그룹에도 속하지 않는 태그는 fallback 그룹으로 모여 누락되지 않는다.
  const categories = Object.keys(postsByCategory).filter(
    (category) => getGroupIdByTag(category) === groupId,
  );
  if (categories.length === 0) return null;

  /*
    태그가 하나뿐이고 그 이름이 그룹 이름과 같으면(Web > Web) 한 단계가 군더더기다.
    그럴 때는 그룹 토글을 접고 태그만 보여준다.
    이 태그가 그룹 자리를 대신하므로 형제 그룹과 같은 크기로 둔다.
  */
  if (
    categories.length === 1 &&
    resolveTagLabel(categories[0]) === t(`${groupId}.label`)
  ) {
    return <CollapsiblePostList category={categories[0]} asGroupLabel />;
  }

  const groupHref = `${PATH.GROUPS}/${toGroupSlug(groupId)}`;
  const isGroupPage = pathname.startsWith(groupHref);

  /*
    전용 페이지가 있는 그룹은 토글 없이 이동만 남긴다.
    글 목록은 그 페이지가 보여주므로, 사이드바에서 또 펼치면 같은 목록이 두 곳에 생긴다.
  */
  if (hasGroupPage(groupId)) {
    return (
      <SidebarAnchorButton
        href={groupHref}
        aria-current={isGroupPage ? "page" : undefined}
        className={cn(
          // 화살표가 없으니 형제 그룹의 화살표 자리만큼 왼쪽을 채워
          // 그룹 이름끼리 글자를 맞춘다. asGroupLabel과 같은 값을 쓴다.
          "block w-full rounded-md py-1 pr-3 pl-7.5 text-left font-medium text-[11px] transition-colors hover:bg-sidebar-accent",
          isGroupPage
            ? "text-sidebar-foreground"
            : "text-sidebar-foreground/60",
        )}
      >
        {t(`${groupId}.label`)}
      </SidebarAnchorButton>
    );
  }

  const hasCurrentPost = categories.some((category) =>
    postsByCategory[category].some(isCurrentPath),
  );

  return (
    <Collapsible defaultOpen={hasCurrentPost} className="group/group" asChild>
      <div>
        <CollapsibleTrigger
          className="flex w-full cursor-pointer select-none items-center rounded-md transition-colors hover:bg-sidebar-accent"
          aria-label={t(`${groupId}.label`)}
        >
          <div className="flex items-center gap-1 py-1 pr-1 pl-3">
            <ChevronRight
              className="h-3 w-3 shrink-0 text-sidebar-foreground/40 transition-transform duration-200 group-data-[state=open]/group:rotate-90"
              aria-hidden="true"
            />
            <h3 className="flex-1 py-1 pr-3 font-medium text-[11px] text-sidebar-foreground/60">
              {t(`${groupId}.label`)}
            </h3>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* 그룹 이름의 화살표만큼 더 들여써서 한 단계 아래임을 보인다. */}
          <SidebarGroupContent className="pl-4">
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
    () => groupPostsByCategory(frontMatterList),
    [frontMatterList],
  );

  const isCurrentPath = (post: FrontMatter) =>
    pathname.includes(`${PATH.POSTS}/${post.id}`);

  return (
    <SidebarGroup className="gap-3 py-2">
      {CATEGORY_SECTION_ORDER.filter(
        (sectionId) => !SECTIONS_WITH_OWN_NAV_ENTRY.includes(sectionId),
      ).map((sectionId: CategorySectionId) => {
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
                    그룹이 하나뿐이면 대분류·그룹 이름이 겹쳐 보이고,
                    기록처럼 그룹 이름이 곧 태그 이름인 대분류도 마찬가지다.
                    그럴 때는 중간 단계를 건너뛰고 태그를 바로 보여준다.
                    이 태그가 그룹 자리를 대신하므로 그룹과 같은 들여쓰기·크기를 준다.
                  */}
                  {groupIds.length === 1 || shouldFlattenGroups(sectionId)
                    ? categories.map((category) => (
                        <CollapsiblePostList
                          key={category}
                          category={category}
                          asGroupLabel
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
