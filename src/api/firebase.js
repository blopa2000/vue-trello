import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import settings from "./settings";

const app = initializeApp(settings);
const db = getDatabase();
const auth = getAuth();
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
