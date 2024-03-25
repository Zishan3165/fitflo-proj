// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCThOTWxbustW0kG2Ddb20bhyTPIBBULmk",
    authDomain: "fitfloprod.firebaseapp.com",
    databaseURL: "https://fitfloprod-default-rtdb.firebaseio.com",
    projectId: "fitfloprod",
    storageBucket: "fitfloprod.appspot.com",
    messagingSenderId: "434578471503",
    appId: "1:434578471503:web:4ff0a30ae0aaeffbbe083a",
    measurementId: "G-SFY1FESKP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);