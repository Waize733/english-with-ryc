import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "../../../src/firebase/firebase";


/* SINGLE SOURCE OF TRUTH */
export type VideoItem = {
  id: string;
  title: string;
  videoUrl?: string;
  duration?: string;
  isFree: boolean;
  courseId: string;
  order: number;
};

/* =========================
   Get videos by course
========================= */
export async function getVideosByCourse(
  courseId: string
): Promise<VideoItem[]> {
  const q = query(
    collection(db, "videos"),
    where("courseId", "==", courseId),
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<VideoItem, "id">)
  }));
}

/* =========================
   ✅ Get video by ID (FIX)
========================= */
export async function getVideoById(
  videoId: string
): Promise<VideoItem | null> {
  const ref = doc(db, "videos", videoId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<VideoItem, "id">)
  };
}
