import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMz6GXmjNIJtkq7pYinSHax6Ce7dLw3hM",
    authDomain: "productivity-app-c0f38.firebaseapp.com",
    projectId: "productivity-app-c0f38",
    storageBucket: "productivity-app-c0f38.appspot.com",
    messagingSenderId: "567693927679",
    appId: "1:567693927679:web:051b23f2c84266e4ecd8ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);