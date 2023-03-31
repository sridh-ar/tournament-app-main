// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSPHo1Zb40O9-ZRVE_MBTQA3_n0LkvaG4",
  authDomain: "tournament-47f92.firebaseapp.com",
  projectId: "tournament-47f92",
  storageBucket: "tournament-47f92.appspot.com",
  messagingSenderId: "692783668651",
  appId: "1:692783668651:web:2c6859fc38fbdd290e46ee",
  measurementId: "G-8YQFS8REN6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebaseApp };
