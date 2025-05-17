import { db } from "@/app/utils/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
  console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
  console.log(
    "FIREBASE_PRIVATE_KEY:",
    process.env.FIREBASE_PRIVATE_KEY ? "exists" : "missing"
  );

  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
        message: error.message || "Unknown error",
        stack: error.stack || null,
      },
      { status: 500 }
    );
  }
}
