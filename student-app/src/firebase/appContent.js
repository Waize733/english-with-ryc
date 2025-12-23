import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getAppContent() {
  const ref = doc(db, "appContent", "main");
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
