import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8ejk2D3CqZ5rBjH7-gc19aTzSTvWr-wY",
    authDomain: "study-nook-cf0a0.firebaseapp.com",
    projectId: "study-nook-cf0a0",
    storageBucket: "study-nook-cf0a0.firebasestorage.app",
    messagingSenderId: "738753630043",
    appId: "1:738753630043:web:984587baf10a147398947e",
    measurementId: "G-BT6TQ9826L"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;