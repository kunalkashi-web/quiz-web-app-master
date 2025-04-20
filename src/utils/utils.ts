import { Question, Quiz, Submission } from "./types";

export function areArraysEqual(arr1: number[], arr2: number[]) {
  // Check if arrays have the same length
  if (arr1.length !== arr2.length) return false;

  // Sort both arrays and compare
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

export function calculateUserScore(quiz: Quiz, submissions: Submission[]) {
  let correct_answers = 0;
  let incorrect_answers = 0;

  quiz?.questions?.forEach((question: Question) => {
    const submission = submissions.find(
      (sub) => sub.question_id === question.id
    );

    let is_multiselect = question.has_multiple_answers;

    if (
      (is_multiselect &&
        areArraysEqual(submission!.answer, question.correctAnswer)) ||
      (!is_multiselect && submission!.answer === question.correctAnswer)
    ) {
      correct_answers++;
    } else {
      incorrect_answers++;
    }
  });

  return {
    correct_answers,
    incorrect_answers,
  };
}
