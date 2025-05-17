// import { NextApiRequest, NextApiResponse } from "next";
// import { db } from "@/app/utils/firebase-admin"; // Your Firestore admin import

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (req.method !== "PUT") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const updatedUserData = req.body;

//     if (!id || typeof id !== "string") {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     // Update user document in Firestore
//     await db.collection("users").doc(id).update(updatedUserData);

//     return res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ error: "Failed to update user" });
//   }
// }

// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const updatedData = await req.json();

    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updatedData);

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
