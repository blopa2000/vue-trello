import { auth, db } from "@/api/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const exit = async () => {
  return await signOut(auth);
};

export const signUp = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  return await setDoc(doc(db, "users", user.uid), { email });
};
