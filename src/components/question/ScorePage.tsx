import { Quiz, Submission } from "@/utils/types";
import { calculateUserScore } from "@/utils/utils";
import React, { useEffect, useMemo, useState } from "react";
import { useReward } from "react-rewards";
import ProgressBar from "../ProgressBar";
import { getUserFinalScore } from "@/app/actions/quizActions";

interface ScorePageProps {
  quiz: Quiz | null;
  submissions: Submission[];
}

const ScorePage = ({ quiz, submissions }: ScorePageProps) => {
  const [has_rewarded, setHasRewarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({
    correct_answers: 0,
    incorrect_answers: 0,
  });

  const percentage = useMemo(() => {
    return Math.ceil(
      (result?.correct_answers /
        (result?.correct_answers + result?.incorrect_answers)) *
        100
    );
  }, [result]);

  useEffect(() => {
    const fetchData = async () => {
      if(!quiz) return;
      setLoading(true);
      const response = await getUserFinalScore(quiz.id);
      if (response?.status === 200) {
        setResult(calculateUserScore(quiz, submissions));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const { reward } = useReward("rewardId", "confetti", {
    lifetime: 1000,
    spread: 70,
  });

  useEffect(() => {
    if (percentage === 100 && !has_rewarded) {
      reward();
      setHasRewarded(true);
    }
  }, [percentage]);

  const renderProgress = () => {
    return (
      <ProgressBar percentage={percentage}>
        <div className="flex justify-center items-center w-[300px] h-[300px] rounded-full">
          <p
            id="rewardId"
            className="font-extrabold text-6xl"
          >{`${percentage}%`}</p>
        </div>
      </ProgressBar>
    );
  };

  return (
    <div className="px-4 pt-8 pb-24 flex flex-col gap-4 items-center">
      <p className="font-extrabold text-4xl">Your Result</p>
      {loading ? (
        <p className="font-extrabold text-4xl mt-20">Loading...</p>
      ) : (
        <>
          {renderProgress()}
          <div className="bg-successSecondary px-4 py-8 w-full rounded-lg flex gap-4 items-center mt-8">
            <div className="rounded-full w-[16px] h-[16px] bg-successPrimary"></div>
            <p className="font-extrabold">{result?.correct_answers}</p>
            <p className="text-textTertairy font-bold">Correct</p>
          </div>
          <div className="bg-errorSecondary px-4 py-8 w-full rounded-lg flex gap-4 items-center">
            <div className="rounded-full w-[16px] h-[16px] bg-errorPrimary"></div>
            <p className="font-extrabold">{result?.incorrect_answers}</p>
            <p className="text-textTertairy font-bold">Incorrect</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ScorePage;
