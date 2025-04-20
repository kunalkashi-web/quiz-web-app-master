import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../button/Button";
import "./questions.scss";
import { Quiz, Submission } from "@/utils/types";
import QuestionContainer from "./QuestionContainer";
import ScorePage from "./ScorePage";
import { saveUserSubmission } from "@/app/actions/quizActions";

interface QuestionPageProps {
  quiz: Quiz | null;
  submissions: Submission[];
  saveSubmission: (submission: Submission) => void;
  resetSubmissions: () => void;
}

const QuestionPage = ({
  quiz,
  submissions = [],
  saveSubmission,
  resetSubmissions,
}: QuestionPageProps) => {
  const questions = quiz?.questions || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [show_score_page, setShowScorePage] = useState(false);
  const [savingSubmission, setSavingSubmission] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1); // Increment timer every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount or question change
  }, [currentQuestion]);

  const currQuestion = useMemo(
    () => questions?.[currentQuestion],
    [currentQuestion, questions]
  );

  const currSubmission = useMemo(
    () =>
      submissions?.find(
        (submission) => submission.question_id === currQuestion?.id
      ),
    [currQuestion?.id, JSON.stringify(submissions)]
  );

  let is_last_question = useMemo(
    () => currentQuestion === questions?.length - 1,
    [currentQuestion, questions?.length]
  );

  const onUpdateUserSubmission = async (submission: Submission | undefined) => {
    if (!quiz || !submission) return;
    setSavingSubmission(true);
    const response = await saveUserSubmission(quiz.id, submission);
    if (response?.status === 200) {
      if (!is_last_question) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScorePage(true);
      }
    }
    setSavingSubmission(false);
  };

  const onNextClick = () => {
    if(!currSubmission?.question_id) return;

    let submission = {
      ...(currSubmission || {}),
      submission_time: timer,
    };
    saveSubmission(submission);

    // Reset the timer
    setTimer(0);

    onUpdateUserSubmission(submission);
  };

  const resetQuiz = () => {
    resetSubmissions();
    setCurrentQuestion(0);
    setShowScorePage(false);
  };

  return (
    <div className="bg-secondaryAccent">
      <Image
        src={"/icons/confetti.svg"}
        height={70}
        width={180}
        className="w-full h-[120px] object-cover"
        alt="logo"
      />
      <div className="bg-white  rounded-t-3xl relative">
        {show_score_page ? (
          <ScorePage quiz={quiz} submissions={submissions} />
        ) : (
          <QuestionContainer
            currentQuestion={currentQuestion}
            questions={questions}
            currSubmission={currSubmission}
            currQuestion={currQuestion}
            saveSubmission={saveSubmission}
          />
        )}
        <Button
          classes="fixed bottom-5 left-5 right-5"
          onClick={show_score_page ? resetQuiz : onNextClick}
          disabled={
            !currSubmission?.answer ||
            (currQuestion.has_multiple_answers &&
              !currSubmission?.answer?.length) ||
            savingSubmission
          }
        >
          <div className="flex gap-4 items-center">
            <p className="w-full">{show_score_page ? "Start Again" : "Next"}</p>
            {!show_score_page ? (
              <Image
                width={16}
                height={16}
                src={"/icons/arrow_right.svg"}
                alt="arrow_right"
                className="self-stretch"
              />
            ) : null}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default QuestionPage;
