export default function Description() {
  return (
    <div className="prose mx-auto mt-4 flex dark:prose-invert">
      <h2 className="mr-5 flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
        저는
      </h2>
      <div>
        <p>
          <strong>일과 생활을 철저히 분리하지 않습니다.</strong> 해결하지 못한
          문제가 있다면, 머릿속에서 끊임없이 비동기적으로 해결 방안을
          모색합니다.
        </p>
        <p>
          <strong>문서화는 저의 성장을 위한 핵심 도구라고 생각합니다.</strong>{" "}
          항상 학습한 내용을 개인 노트에 기록하고, 필요에 따라 블로그 포스트로
          공유합니다. 이러한 문서는 저뿐만 아니라, 비슷한 상황에 처한 동료
          개발자들에게도 유용한 이정표가 될 것이라고 확신합니다.
          <br />{" "}
          <i className="text-gray-400">
            (프론트엔드 개발을 시작한 2023년부터 블로그 활동과 개인 노트 작성을
            시작하여 현재까지 꾸준하게 진행 중)
          </i>{" "}
        </p>
        <p>
          <strong>항상 배우려고 노력하는 개발자</strong>입니다. 수많은
          스터디들을 진행하였고 주로 스터디를 이끌고 진행하는 역할을 해왔습니다.
          <br />{" "}
          <i className="text-gray-400">
            (모던 리액트 딥다이브, 코어 자바스크립트, 코딩테스트, CS 스터디,
            리액트 디자인 패턴, 테스팅 스터디 등)
          </i>
        </p>
      </div>
    </div>
  );
}
