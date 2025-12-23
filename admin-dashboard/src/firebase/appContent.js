import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firestore.js";

const contentRef = doc(db, "appContent", "main");

export const getAppContent = async () => {
  const snap = await getDoc(contentRef);
  return snap.exists() ? snap.data() : null;
};

export const saveAppContent = async (data) => {
  await setDoc(contentRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};
