import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import settings from "./settings";

const app = initializeApp(settings);
const db = getFirestore();
const auth = getAuth();
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
