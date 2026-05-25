import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYjF7fbS25ahVj17058BT7a9CsoykKYgY",
  authDomain: "femine.firebaseapp.com",
  projectId: "femine",
  storageBucket: "femine.firebasestorage.app",
  messagingSenderId: "491910512193",
  appId: "1:491910512193:web:d830ae6463390e1131d0c0",
  measurementId: "G-5R1C8XKYQ7"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);