import { NextResponse } from "next/server";
import { uploadUsers } from "@/app/utils/uploadUsers"; // assuming function is here

export async function GET() {
  await uploadUsers();
  return NextResponse.json({ message: "Users uploaded!" });
}
