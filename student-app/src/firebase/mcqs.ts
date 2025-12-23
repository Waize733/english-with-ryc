import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "./firebase";

export type McqItem = {
  id: string;
  courseId: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export async function getMcqsByCourse(
  courseId: string
): Promise<McqItem[]> {
  const q = query(
    collection(db, "aiMcqs"),
    where("courseId", "==", courseId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<McqItem, "id">)
  }));
}
