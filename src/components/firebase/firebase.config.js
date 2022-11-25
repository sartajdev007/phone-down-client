// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMPMPvso3j2zNfuEsbI64biV5TIXwIipc",
    authDomain: "phone-down-shop.firebaseapp.com",
    projectId: "phone-down-shop",
    storageBucket: "phone-down-shop.appspot.com",
    messagingSenderId: "32594870597",
    appId: "1:32594870597:web:8faad028028d19c0443e2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app