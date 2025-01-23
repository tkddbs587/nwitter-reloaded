import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBR4TdLKZBRD4vC3j5cn1Fgt0M1jOOah2s",
  authDomain: "nwitter-reloaded-5f6d6.firebaseapp.com",
  projectId: "nwitter-reloaded-5f6d6",
  storageBucket: "nwitter-reloaded-5f6d6.firebasestorage.app",
  messagingSenderId: "1068063807987",
  appId: "1:1068063807987:web:245b2e8010bdcdd45e5a86",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
