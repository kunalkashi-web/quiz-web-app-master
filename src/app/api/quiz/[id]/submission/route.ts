import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  //Logic to store the submissions in the database
  return NextResponse.json({
    message: "success",
  });
}
