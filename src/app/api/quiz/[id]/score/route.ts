import { NextResponse } from "next/server";

export async function GET(request: Request,  { params }: { params: { id: string } }) {
    let id = params.id
    //Logic to calculate the quiz score for user
    
    return NextResponse.json({
        correct_answers: 1,
        incorrect_answers: 2,
    });
  }