import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATcUqyx62Mcm3Zpo9uOmfcK3c_t8YZphE",
  authDomain: "nancy-music-bf689.firebaseapp.com",
  projectId: "nancy-music-bf689",
  storageBucket: "nancy-music-bf689.firebasestorage.app",
  messagingSenderId: "795931567645",
  appId: "1:795931567645:web:e696ae8ca27392001188f4",
  measurementId: "G-XQC79YGFKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

