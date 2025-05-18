import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSY9qZ78PzVT8QlXHSXtwVKp686K-d6dI",
  authDomain: "tibal-users.firebaseapp.com",
  projectId: "tibal-users",
  storageBucket: "tibal-users.appspot.com", // <-- corrected this
  messagingSenderId: "984676224227", // <-- just the number part (no 'web:' prefix)
  appId: "1:984676224227:web:f73a090cac9a9da35709d6",
  measurementId: "G-C91M79J6MT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
