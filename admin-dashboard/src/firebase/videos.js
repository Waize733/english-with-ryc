import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firestore.js";

const videosRef = collection(db, "videos");

export const listenToVideos = (callback) => {
  const q = query(videosRef, orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(data);
  });
};

export const addVideo = async (video) => {
  await addDoc(videosRef, {
    ...video,
    createdAt: serverTimestamp()
  });
};

export const updateVideo = async (id, video) => {
  await updateDoc(doc(db, "videos", id), video);
};

export const deleteVideo = async (id) => {
  await deleteDoc(doc(db, "videos", id));
};
