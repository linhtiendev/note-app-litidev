// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGVw6VQS9VqD5cqgMU6Lt1An_be5uHmCY",
    authDomain: "note-app-litidev.firebaseapp.com",
    projectId: "note-app-litidev",
    storageBucket: "note-app-litidev.appspot.com",
    messagingSenderId: "974214723892",
    appId: "1:974214723892:web:3f658f5ff08daedce68d61",
    measurementId: "G-4V0JQZY08W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
