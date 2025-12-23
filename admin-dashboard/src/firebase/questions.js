import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firestore.js";

const questionsRef = collection(db, "questions");

export const listenToQuestions = (callback) => {
  const q = query(questionsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(data);
  });
};

export const replyToQuestion = async (id, answer) => {
  await updateDoc(doc(db, "questions", id), {
    answer,
    answered: true,
    answeredAt: serverTimestamp()
  });
};
