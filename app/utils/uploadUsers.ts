import { collection, setDoc, doc } from "firebase/firestore";
import users from "@/app/utils/mock_users.json"; // adjust path as needed
import { db } from "@/app/utils/firebase";

// Uploading users
export async function uploadUsers() {
  try {
    for (const user of users.users) {
      // Make sure user.id exists and convert to string for doc ID
      if (!user.id) {
        console.warn("User missing id:", user);
        continue;
      }
      const userRef = doc(collection(db, "users"), user.id.toString());
      await setDoc(userRef, user);
    }
    console.log("All users uploaded successfully!");
  } catch (error) {
    console.error("Error uploading users:", error);
  }
}
