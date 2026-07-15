// ===============================
// Firebase
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyBINo-Nc19JLfK1k08vng6H-iuQGesxbXY",

    authDomain: "asma-gutschein-1c508.firebaseapp.com",

    projectId: "asma-gutschein-1c508",

    storageBucket: "asma-gutschein-1c508.firebasestorage.app",

    messagingSenderId: "185842816017",

    appId: "1:185842816017:web:1f4b99b079d067ba274db0"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);