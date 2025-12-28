import { HeadComponent } from "./HeadComponent";

interface Question {
  type: "text";
  question: string;
  answer: string;
}

export default function QuestionBlock({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div>
      <HeadComponent>Questions</HeadComponent>
      <div className="flex flex-col gap-4">
        {questions.map((question) => (
          <QnA
            key={question.question}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </div>
    </div>
  );
}

function QnA({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-lg">{question}</div>
      <div className="text-gray-500 text-sm">{answer}</div>
    </div>
  );
}
