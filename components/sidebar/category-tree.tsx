"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import {
  CATEGORY_SECTION_ORDER,
  type CategoryGroupId,
  type CategorySectionId,
  getGroup,
  getGroupIdByTag,
  getSection,
  resolveTagLabel,
  toGroupSlug,
} from "@/constants/categories";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import type { FrontMatter } from "@/types/post";
import { SidebarLink } from "./sidebar-link";
import { TagLink } from "./tag-link";

type PostsByCategory = Record<string, FrontMatter[]>;

function groupPostsByCategory(posts: FrontMatter[]): PostsByCategory {
  const postsByCategory: PostsByCategory = {};
  for (const post of posts) {
    for (const category of post.categories) {
      if (!postsByCategory[category]) postsByCategory[category] = [];
      postsByCategory[category].push(post);
    }
  }
  return postsByCategory;
}

/** 하단 내비게이션에 전용 페이지로 이미 있는 대분류라 카테고리 트리에서 뺀다. */
const SECTIONS_WITH_OWN_NAV_ENTRY: readonly CategorySectionId[] = ["series"];

function GroupNode({
  groupId,
  postsByCategory,
  isCurrentPath,
}: {
  groupId: CategoryGroupId;
  postsByCategory: PostsByCategory;
  isCurrentPath: (post: FrontMatter) => boolean;
}) {
  const group = getGroup(groupId);
  const pathname = usePathname();

  const categories = Object.keys(postsByCategory).filter(
    (category) => getGroupIdByTag(category) === groupId,
  );
  if (categories.length === 0) return null;

  // 태그 하나가 그룹과 같은 이름이면(Web > Web) 그룹 단계를 건너뛰고 태그를 그룹 자리에 둔다.
  if (
    categories.length === 1 &&
    resolveTagLabel(categories[0]) === group.label
  ) {
    return <TagLink tag={categories[0]} asGroupLabel />;
  }

  const groupHref = `${PATH.GROUPS}/${toGroupSlug(groupId)}`;
  const isGroupPage = pathname.startsWith(groupHref);

  // 전용 페이지가 있는 그룹은 펼치지 않는다. 같은 목록이 두 곳에 생긴다.
  if (group.hasPage) {
    return (
      <SidebarLink
        href={groupHref}
        aria-current={isGroupPage ? "page" : undefined}
        className={cn(
          // 형제 그룹의 화살표 자리만큼 들여써 이름을 맞춘다. asGroupLabel과 같은 값이다.
          "block w-full rounded-md py-1 pr-3 pl-7.5 text-left font-medium text-[11px] transition-colors hover:bg-sidebar-accent",
          isGroupPage
            ? "text-sidebar-foreground"
            : "text-sidebar-foreground/60",
        )}
      >
        {group.label}
      </SidebarLink>
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
          aria-label={group.label}
        >
          <div className="flex items-center gap-1 py-1 pr-1 pl-3">
            <ChevronRight
              className="h-3 w-3 shrink-0 text-sidebar-foreground/40 transition-transform duration-200 group-data-[state=open]/group:rotate-90"
              aria-hidden="true"
            />
            <h3 className="flex-1 py-1 pr-3 font-medium text-[11px] text-sidebar-foreground/60">
              {group.label}
            </h3>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent className="pl-4">
            {categories.map((category) => (
              <TagLink key={category} tag={category} />
            ))}
          </SidebarGroupContent>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function SectionNode({
  sectionId,
  postsByCategory,
  isCurrentPath,
}: {
  sectionId: CategorySectionId;
  postsByCategory: PostsByCategory;
  isCurrentPath: (post: FrontMatter) => boolean;
}) {
  const section = getSection(sectionId);
  const pathname = usePathname();

  const groupIds = section.groups.map((g) => g.id);
  const categories = Object.keys(postsByCategory).filter((category) =>
    groupIds.includes(getGroupIdByTag(category)),
  );
  if (categories.length === 0) return null;

  // 태그가 하나뿐이면(Me) 펼쳐 봐야 같은 이름 하나라, 대분류 자체를 링크로 둔다.
  if (categories.length === 1 && groupIds.length === 1) {
    const href = `${PATH.CATEGORIES}/${categories[0]}`;
    return (
      <SidebarLink
        href={href}
        aria-current={pathname.startsWith(href) ? "page" : undefined}
        className="block w-full rounded-md px-3 py-1.5 text-left transition-colors hover:bg-sidebar-accent"
      >
        {/* 형제 대분류의 화살표 자리만큼 띄워 이름끼리 글자를 맞춘다. */}
        <h2 className="pl-5 font-semibold text-[11px] text-sidebar-foreground/70 uppercase tracking-widest">
          {section.label}
        </h2>
        <p className="mt-0.5 pl-5 text-[11px] text-muted-foreground leading-snug">
          {section.description}
        </p>
      </SidebarLink>
    );
  }

  const hasCurrentPost = categories.some((category) =>
    postsByCategory[category].some(isCurrentPath),
  );

  return (
    <Collapsible defaultOpen={hasCurrentPost} className="group/section" asChild>
      <section>
        {/* 이름만으로는 무슨 글인지 알기 어려워 설명을 함께 보여준다. */}
        <CollapsibleTrigger className="w-full cursor-pointer select-none rounded-md px-3 py-1.5 text-left transition-colors hover:bg-sidebar-accent">
          <div className="flex items-baseline gap-1.5">
            <ChevronRight
              className="h-3.5 w-3.5 shrink-0 self-center text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]/section:rotate-90"
              aria-hidden="true"
            />
            <h2 className="font-semibold text-[11px] text-sidebar-foreground/70 uppercase tracking-widest">
              {section.label}
            </h2>
          </div>
          <p className="mt-0.5 pl-5 text-[11px] text-muted-foreground leading-snug">
            {section.description}
          </p>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-1 space-y-0.5 pl-2">
            {/* 그룹이 하나뿐이면 대분류와 이름이 겹치므로 그룹 단계를 건너뛰고 태그를 그룹 자리에 둔다. */}
            {groupIds.length === 1
              ? categories.map((category) => (
                  <TagLink key={category} tag={category} asGroupLabel />
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
}

/** 전부 펼치면 너무 길어 기본은 접고, 지금 보는 글이 속한 가지만 펼쳐 시작한다. */
export function CategoryTree({
  frontMatterList,
}: {
  frontMatterList: FrontMatter[];
}) {
  const pathname = usePathname();
  const postsByCategory = groupPostsByCategory(frontMatterList);

  const isCurrentPath = (post: FrontMatter) =>
    pathname.includes(`${PATH.POSTS}/${post.id}`);

  return (
    <SidebarGroup className="gap-3 py-2">
      {CATEGORY_SECTION_ORDER.filter(
        (sectionId) => !SECTIONS_WITH_OWN_NAV_ENTRY.includes(sectionId),
      ).map((sectionId) => (
        <SectionNode
          key={sectionId}
          sectionId={sectionId}
          postsByCategory={postsByCategory}
          isCurrentPath={isCurrentPath}
        />
      ))}
    </SidebarGroup>
  );
}
