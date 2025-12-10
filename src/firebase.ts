import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC43dV-6bidMoPl1KOhNYdiJX2Jfbb11CI",
    authDomain: "nancymusic-82e7e.firebaseapp.com",
    projectId: "nancymusic-82e7e",
    storageBucket: "nancymusic-82e7e.firebasestorage.app",
    messagingSenderId: "560070559601",
    appId: "1:560070559601:web:639a3b2925a9ec2de258d0",
    measurementId: "G-QBD9BLH3E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
