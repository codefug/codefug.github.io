"use client";

import { RotateCw } from "lucide-react";
import { StatusLink, StatusMessage } from "@/components/layout/status-message";
import { PATH } from "@/constants/path";

/** 루트 레이아웃 안에서 렌더링되므로 html과 body를 다시 그리지 않는다. 레이아웃 자체의 오류는 global-error가 맡는다. */
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <StatusMessage
      illustration="/images/status/error.svg"
      code="Error"
      title="페이지를 보여 드리지 못했습니다"
      description={
        <>
          <p>
            화면을 그리는 중에 문제가 생겼습니다. 다시 시도해도 같다면 잠시 뒤에
            다시 들러 주세요.
          </p>
          {error.digest && (
            <p className="mt-3 font-mono text-muted-foreground text-xs">
              오류 코드 {error.digest}
            </p>
          )}
        </>
      }
    >
      <button
        type="button"
        onClick={retry}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
        다시 시도
      </button>
      <StatusLink href={PATH.HOME}>홈으로</StatusLink>
    </StatusMessage>
  );
}
