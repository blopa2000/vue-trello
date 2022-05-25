import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import settings from "./settings";

const app = initializeApp(settings);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };
