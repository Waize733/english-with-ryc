import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firestore.js";

/* ======================
   CREATE MCQ
====================== */
export async function createMcq(mcq) {
  await addDoc(collection(db, "mcqs"), {
    ...mcq,
    createdAt: serverTimestamp()
  });
}

/* ======================
   GET ALL MCQS
====================== */
export async function getAllMcqs() {
  const snapshot = await getDocs(collection(db, "mcqs"));
  return snapshot.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

/* ======================
   DELETE MCQ
====================== */
export async function deleteMcq(id) {
  await deleteDoc(doc(db, "mcqs", id));
}
