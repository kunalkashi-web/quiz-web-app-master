export interface Option {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  image?: string;
  options: Option[];
  correctAnswer: number;
  has_multiple_answers?: boolean;
}

export interface Quiz {
  id: number;
  questions: Question[];
}
export interface Submission {
  question_id: number;
  answer: number | number[];
  submission_time: number;
}

export interface QuizState {
  quiz: Quiz | null;
  submissions: Submission[];
  setQuiz: (quiz: Quiz) => void;
  saveSubmission: (submission: Submission) => void;
}
