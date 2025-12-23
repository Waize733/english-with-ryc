import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  getDocs
} from "firebase/firestore";
import { db } from "./firestore.js";

const coursesRef = collection(db, "courses");

/* =========================
   REALTIME LISTENER (Admin)
========================= */
export const listenToCourses = (callback) => {
  return onSnapshot(coursesRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(data);
  });
};

/* =========================
   GET COURSES (MCQs / Student)
========================= */
export const getCourses = async () => {
  const snapshot = await getDocs(coursesRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

/* =========================
   CREATE COURSE
========================= */
export const addCourse = async (course) => {
  await addDoc(coursesRef, {
    ...course,
    createdAt: serverTimestamp()
  });
};

/* =========================
   UPDATE COURSE
========================= */
export const updateCourse = async (id, course) => {
  await updateDoc(doc(db, "courses", id), course);
};

/* =========================
   DELETE COURSE
========================= */
export const deleteCourse = async (id) => {
  await deleteDoc(doc(db, "courses", id));
};
