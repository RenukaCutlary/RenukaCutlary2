// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtWPGZedQ2gwGYGDyJNc4-rM3LbWUsMtY",
  authDomain: "renukacutlary.firebaseapp.com",
  projectId: "renukacutlary",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);