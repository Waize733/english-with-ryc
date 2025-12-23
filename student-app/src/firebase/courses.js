import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Fetch all courses
export async function getCourses() {
  const snapshot = await getDocs(collection(db, "courses"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// Fetch single course by ID
export async function getCourseById(courseId) {
  const ref = doc(db, "courses", courseId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
