import { type } from "os";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Level {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQ = async (amount: number, dificulty: Level) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${dificulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: [...question.incorrect_answers, question.correct_answer],
  }));
};
