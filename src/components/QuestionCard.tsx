import React from "react";
import { AnsObj } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnsObj | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<props> = (props) => (
  <Wrapper>
    <p className="number">
      Questions: {props.questionNr}/{props.totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: props.question }} />
    <div>
      {props.answers.map((answer, idx) => (
        <ButtonWrapper
          key={answer}
          correct={props.userAnswer?.correctAnswer === answer}
          userClicked={props.userAnswer?.answer === answer}
        >
          <button
            disabled={!!props.userAnswer} //props.userAnswer ? true: false
            value={answer}
            onClick={props.callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
