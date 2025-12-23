import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "./firebase";

/* ✅ PDF type */
export type PdfItem = {
  id: string;
  title: string;
  pdfUrl: string;
  isFree: boolean;
  courseId: string;
};

/* =========================
   Get PDFs by Course
========================= */
export async function getPdfsByCourse(
  courseId: string
): Promise<PdfItem[]> {
  const q = query(
    collection(db, "pdfs"),
    where("courseId", "==", courseId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<PdfItem, "id">)
  }));
}

/* =========================
   ✅ Get PDF by ID (FIX)
========================= */
export async function getPdfById(
  pdfId: string
): Promise<PdfItem | null> {
  const ref = doc(db, "pdfs", pdfId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as Omit<PdfItem, "id">)
  };
}
