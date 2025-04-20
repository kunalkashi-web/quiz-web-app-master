import { NextResponse } from "next/server";

export async function GET(request: Request,  { params }: { params: { id: string } }) {
  let id = params.id
  //Logic to fetch quiz with id
  
  return NextResponse.json({
    id: 1,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: [
          { id: 1, text: "Paris" },
          { id: 2, text: "London" },
          { id: 3, text: "Berlin" },
          { id: 4, text: "Rome" },
        ],
        has_multiple_answers: false,
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What is the capital of India?",
        options: [
          { id: 1, text: "Goa" },
          { id: 2, text: "New Delhi" },
          { id: 3, text: "Karnataka" },
          { id: 4, text: "Mumbai" },
        ],
        has_multiple_answers: false,
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "Which of the following states share a border with Nepal?",
        options: [
          { id: 1, text: "Bihar" },
          { id: 2, text: "Madhya Pradesh" },
          { id: 3, text: "Uttar Pradesh" },
          { id: 4, text: "Sikkim" },
        ],
        has_multiple_answers: true,
        correctAnswer: [1, 3, 4],
      },
      {
        id: 4,
        question: "Can you identify the country based on the image below?",
        image: "https://imgur.com/YB0l3zq.png",
        has_multiple_answers: false,
        options: [
          { id: 1, text: "United States" },
          { id: 2, text: "Spain" },
          { id: 3, text: "Brazil" },
          { id: 4, text: "Germany" },
        ],
        correctAnswer: 3,
      },
    ],
  });
}
