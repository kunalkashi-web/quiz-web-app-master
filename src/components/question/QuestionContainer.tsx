import Image from "next/image";
import React from "react";
import Checkbox from "../checkbox/Checkbox";
import Radio from "../radio/Radio";
import { Option, Question, Submission } from "@/utils/types";
import clsx from "clsx";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "../ProgressBar";

interface QuestionContainerProps {
  currentQuestion: number;
  questions: Question[];
  currQuestion: Question | null;
  currSubmission: Submission | null;
  saveSubmission: (submission: Submission) => void;
}

const QuestionContainer = ({
  currentQuestion,
  questions,
  currQuestion,
  currSubmission,
  saveSubmission,
}: QuestionContainerProps) => {
  const getOptionClasses = (is_checked: boolean) => {
    return clsx(
      "px-4 py-8 rounded-lg",
      `${
        is_checked
          ? "border-2 border-successPrimary"
          : "bg-slate-100 border-2 border-transparent"
      }`
    );
  };
  const renderOptions = () => {
    if (!currQuestion || currQuestion?.options.length === 0) return [];
    let options: React.ReactNode[] = [];
    let isMultiselect = currQuestion?.has_multiple_answers;
    currQuestion.options.forEach((option) => {
      let element;

      if (isMultiselect) {
        let answer = currSubmission?.answer || [];
        let is_checked = answer?.includes(option.id);
        let classes = getOptionClasses(is_checked);
        element = (
          <Checkbox
            key={option.id}
            label={option.text}
            classes={classes}
            checked={is_checked}
            onCheckboxClick={onCheckboxClick.bind(null, answer, option)}
          />
        );
      } else {
        let answer = currSubmission?.answer;
        let is_checked = answer === option.id;
        let classes = getOptionClasses(is_checked);
        element = (
          <Radio
            key={option.id}
            label={option.text}
            name={`${currQuestion.id}`}
            classes={classes}
            checked={is_checked}
            onChange={onRadioClick.bind(null, option)}
          />
        );
      }
      options.push(element);
    });
    return options;
  };

  const onCheckboxClick = (
    answer: number[],
    option: Option,
    checked: boolean
  ) => {
    if (!currQuestion) return;
    if (checked) {
      saveSubmission({
        question_id: currQuestion.id,
        answer: !answer?.includes(option.id)
          ? [...(answer || []), option.id]
          : answer,
        submission_time: Date.now(),
      });
    } else {
      saveSubmission({
        question_id: currQuestion.id,
        answer: [...(answer?.filter((id) => id !== option.id) || [])],
        submission_time: Date.now(),
      });
    }
  };

  const onRadioClick = (option: Option) => {
    if (!currQuestion) return;
    saveSubmission({
      question_id: currQuestion.id,
      answer: option.id,
      submission_time: Date.now(),
    });
  };

  const renderProgress = () => {
    let percentage = Math.ceil(
      ((currentQuestion + 1) / questions?.length) * 100
    );
    return (
      <ProgressBar percentage={percentage}>
        <div className="flex items-baseline gap-1">
          <div className="font-extrabold text-5xl italic">
            {currentQuestion + 1}
          </div>
          <div className="font-extrabold text-textSecondary">
            /{questions?.length}
          </div>
        </div>
      </ProgressBar>
    );
  };

  return (
    <>
      <div className="question-counter absolute w-[120px] h-[120px] bg-white rounded-full flex flex-col items-center justify-center ">
        {renderProgress()}
      </div>
      <div className="question-content-wrapper px-6 pt-24 pb-24 h-[calc(100vh-120px)]">
        <p className="text-lg font-extrabold">{currQuestion?.question}</p>
        {currQuestion?.image ? (
          <Image
            src={currQuestion.image}
            height={70}
            width={180}
            className="object-cover mx-auto w-[300px] h-[300px] mt-4 rounded-md"
            alt=""
          />
        ) : null}
        <div className="mt-4 flex flex-col gap-3">{renderOptions()}</div>
      </div>
    </>
  );
};

export default QuestionContainer;
