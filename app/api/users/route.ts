import { db } from "@/app/utils/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch users" },
      { status: 500 }
    );
  }
}
