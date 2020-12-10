import React, { useState } from "react";
import { fetchQ, Level, QuestionState } from "./API";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnsObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TotalQ = 10;

interface list {
  id: string;
  text: string;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [num, setNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnsObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQ(TotalQ, Level.EASY);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNum(0);
    setLoading(false);
  };
  const checkAns = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //user answers
      const answer = e.currentTarget.value;
      //compare answer with correct answer
      const correct = questions[num].correct_answer === answer;
      //add score if the answer is correct
      correct && setScore((prev) => prev + 1);
      //save answer in the array for user answers
      const answerObj = {
        question: questions[num].question,
        answer,
        correct,
        correctAnswer: questions[num].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQ = num + 1;
    nextQ === TotalQ ? setGameOver(true) : setNum(nextQ);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT Quiz</h1>
        {gameOver || userAnswers.length === TotalQ ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score:{score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={num + 1}
            totalQuestions={TotalQ}
            question={questions[num].question}
            answers={questions[num].answers}
            userAnswer={userAnswers ? userAnswers[num] : undefined}
            callback={checkAns}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === num + 1 &&
        num !== TotalQ - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};
export default App;
