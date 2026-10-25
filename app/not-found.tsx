import { StatusLink, StatusMessage } from "@/components/layout/status-message";
import { PATH } from "@/constants/path";

export default function NotFound() {
  return (
    <StatusMessage
      illustration="/images/status/not-found.svg"
      code="404"
      title="페이지를 찾을 수 없습니다"
      description="주소가 바뀌었거나 내린 글일 수 있습니다. 전체 글 목록이나 검색에서 찾아보세요."
    >
      <StatusLink href={PATH.HOME}>홈으로</StatusLink>
      <StatusLink href={PATH.POSTS}>전체 글</StatusLink>
      <StatusLink href={PATH.SEARCH}>검색</StatusLink>
    </StatusMessage>
  );
}
