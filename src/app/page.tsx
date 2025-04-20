"use client";
import QuestionPage from "@/components/question/QuestionPage";
import QuizStartPage from "@/components/quizStartPage/QuizStartPage";
import { useEffect, useState } from "react";
import { fetchQuizData } from "./actions/quizActions";
import { Quiz, Submission } from "@/utils/types";

export default function Home() {
  const [show_question_page, setShowQuestionPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchQuizData(1);
      if (response?.status === 200) {
        setQuiz(response?.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const saveSubmission = (submission: Submission) => {
    const new_submissions = JSON.parse(JSON.stringify(submissions));
    let was_found = false;
    for (let i = 0; i < new_submissions.length; i++) {
      if (new_submissions[i].question_id === submission.question_id) {
        new_submissions[i].answer = submission.answer;
        new_submissions[i].submission_time = submission.submission_time;
        was_found = true;
        break;
      }
    }
    if (!was_found) {
      new_submissions.push(submission);
    }
    setSubmissions(new_submissions);
  };

  const resetSubmissions = () => {
    setSubmissions([]);
  };

  return (
    <section>
      {show_question_page ? (
        <QuestionPage
          quiz={quiz}
          submissions={submissions}
          saveSubmission={saveSubmission}
          resetSubmissions={resetSubmissions}
        />
      ) : (
        <QuizStartPage setShowQuestionPage={setShowQuestionPage} isLoading={isLoading}/>
      )}
    </section>
  );
}
