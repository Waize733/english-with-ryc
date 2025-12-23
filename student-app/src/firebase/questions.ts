import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

export async function askQuestion(
  question: string,
  courseId?: string
) {
  if (!question.trim()) {
    throw new Error("Question cannot be empty");
  }

  await addDoc(collection(db, "questions"), {
    question,
    courseId: courseId || null,
    studentName: "Anonymous",
    answer: "",
    answered: false,
    createdAt: serverTimestamp()
  });
}
