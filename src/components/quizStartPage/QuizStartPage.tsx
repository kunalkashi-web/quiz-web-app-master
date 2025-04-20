import Image from "next/image";
import React from "react";
import Button from "../button/Button";
import clsx from "clsx";
import { poppins } from "@/app/layout";

interface QuizStartPageProps {
  setShowQuestionPage: (show: boolean) => void;
  isLoading: boolean;
}

const QuizStartPage = ({setShowQuestionPage, isLoading}: QuizStartPageProps) => {
  return (
    <div className="quiz-start-wrapper flex flex-col items-center justify-between h-full min-h-screen w-full p-8 bg-gradient-to-t from-secondaryAccent to-white">
      <Image src={"/icons/logo.svg"} height={70} width={180} alt="logo" />
      <div className="w-[320px] h-[320px] bg-white rounded-full flex flex-col items-center justify-center shadow-md">
        <p className={clsx(poppins.className, "text-6xl font-bold text-primaryAccent")}>Quiz</p>
      </div>
      <Button classes="w-full" onClick={() => setShowQuestionPage(true)} disabled={isLoading}>{isLoading ? "Loading..." : "Start"}</Button>
    </div>
  );
};

export default QuizStartPage;
