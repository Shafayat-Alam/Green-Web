// import firebase from "firebase/compat/app"
// import "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmZ1CbwWp9_kozzVVNgVWiLt-PewLfzlM",
    authDomain: "green-web-433a5.firebaseapp.com",
    projectId: "green-web-433a5",
    storageBucket: "green-web-433a5.appspot.com",
    messagingSenderId: "15102112217",
    appId: "1:15102112217:web:6f555484aa13672b9a69c8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore()