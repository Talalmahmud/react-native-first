// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw7gqpg3QLonHd-ybZ-YHJdH2OHaHXgqQ",
  authDomain: "test-native-f9dcf.firebaseapp.com",
  projectId: "test-native-f9dcf",
  storageBucket: "test-native-f9dcf.appspot.com",
  messagingSenderId: "144786859782",
  appId: "1:144786859782:web:7fae32ce16984e0bec6087",
  measurementId: "G-1960RGKYW1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
