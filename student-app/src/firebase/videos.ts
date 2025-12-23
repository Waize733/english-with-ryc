// src/firebase/videos.ts
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

/* ✅ SINGLE SOURCE OF TRUTH */
export type VideoItem = {
  id: string;
  title: string;
  videoUrl?: string;
  duration?: string;
  isFree: boolean;
  courseId: string;
  order: number;
};

export async function getVideosByCourse(
  courseId: string
): Promise<VideoItem[]> {
  const q = query(
    collection(db, "videos"),
    where("courseId", "==", courseId),
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<VideoItem, "id">)
  }));
}
