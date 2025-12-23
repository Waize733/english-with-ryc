import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { db } from "./firestore.js";

const pdfsRef = collection(db, "pdfs");
const storage = getStorage();

export const listenToPdfs = (callback) => {
  return onSnapshot(pdfsRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(data);
  });
};

export const uploadPdfFile = async (file) => {
  const fileRef = ref(storage, `pdfs/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export const addPdf = async (pdf) => {
  await addDoc(pdfsRef, {
    ...pdf,
    createdAt: serverTimestamp()
  });
};

export const updatePdf = async (id, pdf) => {
  await updateDoc(doc(db, "pdfs", id), pdf);
};

export const deletePdf = async (id, pdfUrl) => {
  if (pdfUrl) {
    const fileRef = ref(storage, pdfUrl);
    await deleteObject(fileRef);
  }
  await deleteDoc(doc(db, "pdfs", id));
};
